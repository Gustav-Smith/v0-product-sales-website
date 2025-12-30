"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Check, Copy, QrCode } from "lucide-react"
import QRCode from "react-qr-code"

import { createPixPayment, checkPixPaymentStatus } from "@/app/actions/stripe"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PixPaymentModalProps {
  productId: string
  productName: string
  productPrice: string
  isOpen: boolean
  onClose: () => void
}

export default function PixPaymentModal({
  productId,
  productName,
  productPrice,
  isOpen,
  onClose,
}: PixPaymentModalProps) {
  const [step, setStep] = useState<"form" | "payment">("form")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [taxId, setTaxId] = useState("")
  const [loading, setLoading] = useState(false)
  const [pixCode, setPixCode] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<string>("processing")
  const [error, setError] = useState<string | null>(null)

  function formatTaxId(value: string) {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else {
      return numbers
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setStep("form")
      setName("")
      setEmail("")
      setTaxId("")
      setPixCode(null)
      setPaymentIntentId(null)
      setPaymentStatus("processing")
      setCopied(false)
      setError(null)
    }
  }, [isOpen])

  useEffect(() => {
    if (paymentIntentId && paymentStatus === "processing") {
      const interval = setInterval(async () => {
        try {
          const status = await checkPixPaymentStatus(paymentIntentId)
          setPaymentStatus(status.status)

          if (status.status === "succeeded") {
            clearInterval(interval)
          }
        } catch (err) {
          console.error("Erro ao verificar status:", err)
        }
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [paymentIntentId, paymentStatus])

  async function handleGeneratePix(e: React.FormEvent) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !taxId.trim()) {
      setError("Por favor, preencha todos os campos")
      return
    }

    const cleanTaxId = taxId.replace(/\D/g, "")
    if (cleanTaxId.length !== 11 && cleanTaxId.length !== 14) {
      setError("CPF/CNPJ inválido. Digite 11 dígitos (CPF) ou 14 dígitos (CNPJ)")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const result = await createPixPayment(productId, name.trim(), email.trim(), cleanTaxId)
      setPaymentIntentId(result.paymentIntentId)

      const status = await checkPixPaymentStatus(result.paymentIntentId)
      setPixCode(status.pixCode)
      setPaymentStatus(status.status)
      setStep("payment")
    } catch (err: any) {
      console.error("Erro ao criar pagamento PIX:", err)
      setError(err.message || "Erro ao gerar pagamento PIX")
    } finally {
      setLoading(false)
    }
  }

  function copyPixCode() {
    if (pixCode) {
      navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleClose() {
    setStep("form")
    setName("")
    setEmail("")
    setTaxId("")
    setPixCode(null)
    setPaymentIntentId(null)
    setPaymentStatus("processing")
    setCopied(false)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Pagamento via PIX</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === "form" ? (
            <>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{productName}</p>
                    <p className="text-sm text-muted-foreground">Valor a pagar</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{productPrice}</p>
                </div>
              </div>

              <form onSubmit={handleGeneratePix} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId">CPF ou CNPJ *</Label>
                  <Input
                    id="taxId"
                    type="text"
                    placeholder="000.000.000-00 ou 00.000.000/0000-00"
                    value={taxId}
                    onChange={(e) => setTaxId(formatTaxId(e.target.value))}
                    maxLength={18}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">Obrigatório para pagamentos PIX</p>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      Gerando PIX...
                    </>
                  ) : (
                    "Gerar Código PIX"
                  )}
                </Button>
              </form>
            </>
          ) : paymentStatus === "succeeded" ? (
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-green-600">Pagamento Confirmado!</h3>
                <p className="text-sm text-muted-foreground mt-2">Seu pagamento foi processado com sucesso.</p>
              </div>
              <Button onClick={handleClose} className="mt-4">
                Fechar
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{productName}</p>
                    <p className="text-sm text-muted-foreground">Valor a pagar</p>
                  </div>
                  <p className="text-2xl font-bold text-primary">{productPrice}</p>
                </div>
              </div>

              {pixCode && (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-border">
                      <QRCode value={pixCode} size={200} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <QrCode className="h-4 w-4" />
                      <span>Escaneie o QR Code com o app do seu banco</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Ou copie o código PIX:</p>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted rounded-lg p-3 text-xs font-mono break-all">{pixCode}</div>
                      <Button variant="outline" size="icon" onClick={copyPixCode} className="shrink-0 bg-transparent">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    {copied && <p className="text-xs text-green-600 font-medium">Código copiado!</p>}
                  </div>

                  <Alert>
                    <AlertDescription className="text-xs">
                      O pagamento será confirmado automaticamente após a aprovação do PIX. Este código expira em 30
                      minutos.
                    </AlertDescription>
                  </Alert>

                  {paymentStatus === "processing" && (
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Spinner className="h-4 w-4" />
                      <span>Aguardando pagamento...</span>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
