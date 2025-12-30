"use client"

import { useState } from "react"
import { Check, Sparkles, CreditCard, FileText, Clock } from "lucide-react"
import { type Product, formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import CheckoutModal from "./checkout-modal"
import PixPaymentModal from "./pix-payment-modal"
import BoletoPaymentModal from "./boleto-payment-modal"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isPixOpen, setIsPixOpen] = useState(false)
  const [isBoletoOpen, setIsBoletoOpen] = useState(false)

  return (
    <>
      <Card className="relative flex flex-col hover:shadow-lg transition-shadow">
        {product.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-1">
              <Sparkles className="w-3 h-3 mr-1" />
              {product.badge}
            </Badge>
          </div>
        )}

        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
          <CardDescription className="text-base mt-2">{product.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-primary">{formatPrice(product.priceInCents)}</div>
            <div className="text-sm text-muted-foreground mt-1">Pagamento único</div>
            <div className="mt-3 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>Prazo: {product.deliveryTime}</span>
            </div>
          </div>

          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            className="w-full text-lg py-6 bg-[#32BCAD] hover:bg-[#2AA598]"
            size="lg"
            onClick={() => setIsPixOpen(true)}
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 512 512" fill="currentColor">
              <path d="M242.4 292.5C247.8 287.1 257.1 287.1 262.5 292.5L339.5 369.5C353.7 383.7 372.6 391.5 392.6 391.5H407.7L310.6 488.6C280.3 518.1 231.1 518.1 200.8 488.6L103.3 391.2H112.6C132.6 391.2 151.5 383.4 165.7 369.2L242.4 292.5zM262.5 218.9C257.1 224.3 247.8 224.3 242.4 218.9L165.7 142.2C151.5 127.1 132.6 120.2 112.6 120.2H103.3L200.7 22.8C231.1-7.6 280.3-7.6 310.6 22.8L407.8 119.9H392.6C372.6 119.9 353.7 127.7 339.5 141.9L262.5 218.9zM112.6 142.7C126.4 142.7 139.1 148.3 149.7 158.1L226.4 234.8C233.6 241.1 243 245.6 252.5 245.6C261.9 245.6 271.3 241.1 278.5 234.8L355.5 157.8C365.3 148.1 378.8 142.5 392.6 142.5H430.3L488.6 200.8C518.9 231.1 518.9 280.3 488.6 310.6L430.3 368.9H392.6C378.8 368.9 365.3 363.3 355.5 353.5L278.5 276.5C264.6 262.6 240.3 262.6 226.4 276.6L149.7 353.2C139.1 363 126.4 368.6 112.6 368.6H80.78L22.76 310.6C-7.586 280.3-7.586 231.1 22.76 200.8L80.78 142.7H112.6z" />
            </svg>
            Pagar com PIX
          </Button>

          <Button
            className="w-full text-lg py-6 bg-orange-600 hover:bg-orange-700"
            size="lg"
            onClick={() => setIsBoletoOpen(true)}
          >
            <FileText className="w-5 h-5 mr-2" />
            Pagar com Boleto
          </Button>

          <Button
            variant="outline"
            className="w-full text-lg py-6 bg-transparent"
            size="lg"
            onClick={() => setIsCheckoutOpen(true)}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Pagar com Cartão
          </Button>
        </CardFooter>
      </Card>

      <CheckoutModal
        productId={product.id}
        productName={product.name}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <PixPaymentModal
        productId={product.id}
        productName={product.name}
        productPrice={formatPrice(product.priceInCents)}
        isOpen={isPixOpen}
        onClose={() => setIsPixOpen(false)}
      />

      <BoletoPaymentModal
        productId={product.id}
        productName={product.name}
        productPrice={formatPrice(product.priceInCents)}
        isOpen={isBoletoOpen}
        onClose={() => setIsBoletoOpen(false)}
      />
    </>
  )
}
