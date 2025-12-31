"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { startCheckoutSession } from "@/app/actions/stripe"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

if (typeof window !== 'undefined') {
  console.log("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10) + "...")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutModalProps {
  productId: string
  productName: string
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ productId, productName, isOpen, onClose }: CheckoutModalProps) {
  if (typeof window !== 'undefined') {
    console.log("CheckoutModal renderizado:", { productId, productName, isOpen })
  }
  
  const fetchClientSecret = useCallback(() => {
    if (typeof window !== 'undefined') {
      console.log("Buscando client secret para productId:", productId)
    }
    return startCheckoutSession(productId)
  }, [productId])

  if (!isOpen) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">Finalizar Compra - {productName}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}
