"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { FileText, Download, Copy, Check, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBoletoPayment, checkBoletoPaymentStatus } from "@/app/actions/stripe"

interface BoletoPaymentModalProps {
  productId: string
  productName: string
  productPrice: string
  isOpen: boolean
  onClose: () => void
}

export default function BoletoPaymentModal({
  productId,
  productName,
  productPrice,
  isOpen,
  onClose,
}: BoletoPaymentModalProps) {
  const [step, setStep] = useState<"form" | "boleto" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [taxId, setTaxId] = useState("")
  const [copied, setCopied] = useState(false)

  const [boletoUrl, setBoletoUrl] = useState<string | null>(null)
  const [boletoNumber, setBoletoNumber] = useState<string | null>(null)
  const [boletoExpiresAt, setBoletoExpiresAt] = useState<number | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form")
        setName("")
        setEmail("")
        setTaxId("")
        setBoletoUrl(null)
        setBoletoNumber(null)
        setError("")
        setCopied(false)
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (step === "boleto" && paymentIntentId) {
      const interval = setInterval(async () => {
        const status = await checkBoletoPaymentStatus(paymentIntentId)
        if (status.status === "succeeded") {
          setStep("success")
          clearInterval(interval)
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [step, paymentIntentId])

  const formatTaxId = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
  }

  const handleTaxIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTaxId(e.target.value)
    setTaxId(formatted)
  }

  const handleGenerateBoleto = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const cleanTaxId = taxId.replace(/\D/g, "")
      const result = await createBoletoPayment(productId, name, email, cleanTaxId)

      setPaymentIntentId(result.paymentIntentId)

      const status = await checkBoletoPaymentStatus(result.paymentIntentId)
      setBoletoUrl(status.boletoUrl)
      setBoletoNumber(status.boletoNumber)
      setBoletoExpiresAt(status.boletoExpiresAt)

      setStep("boleto")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar boleto")
    } finally {
      setLoading(false)
    }
  }

  const copyBoletoNumber = () => {
    if (boletoNumber) {
      navigator.clipboard.writeText(boletoNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatExpirationDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-orange-600" />
            Pagamento via Boleto
          </DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={handleGenerateBoleto} className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-4">
                <strong>{productName}</strong> - {productPrice}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="taxId">CPF ou CNPJ</Label>
              <Input
                id="taxId"
                type="text"
                required
                value={taxId}
                onChange={handleTaxIdChange}
                placeholder="000.000.000-00"
                maxLength={18}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando Boleto...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Boleto
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground">O boleto será gerado e enviado para seu email</p>
          </form>
        )}

        {step === "boleto" && (
          <div className="space-y-4">
            <Alert className="bg-orange-50 border-orange-200">
              <FileText className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-900">
                Boleto gerado com sucesso! Pague até {boletoExpiresAt && formatExpirationDate(boletoExpiresAt)}
              </AlertDescription>
            </Alert>

            {boletoUrl && (
              <div className="space-y-3">
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={() => window.open(boletoUrl, "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Boleto PDF
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => window.open(boletoUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visualizar Boleto
                </Button>
              </div>
            )}

            {boletoNumber && (
              <div className="space-y-2">
                <Label>Código de Barras</Label>
                <div className="flex gap-2">
                  <Input value={boletoNumber} readOnly className="font-mono text-sm" />
                  <Button size="icon" variant="outline" onClick={copyBoletoNumber}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use este código para pagar em casas lotéricas, bancos ou aplicativos bancários
                </p>
              </div>
            )}

            <Alert>
              <AlertDescription className="text-sm">
                O pagamento será confirmado em até 3 dias úteis após o pagamento do boleto. Você receberá uma
                confirmação por email.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4 py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Pagamento Confirmado!</h3>
              <p className="text-muted-foreground">Seu pagamento foi processado com sucesso.</p>
            </div>
            <Button onClick={onClose} className="w-full">
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
