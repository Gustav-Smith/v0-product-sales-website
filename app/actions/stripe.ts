"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Produto com id "${productId}" não encontrado`)
  }

  // Criar sessão de checkout do Stripe
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    payment_method_types: ["card"], // Usar apenas card que é universalmente suportado
  })

  return session.client_secret
}

export async function createPixPayment(productId: string, name: string, email: string, taxId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Produto com id "${productId}" não encontrado`)
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "brl",
    payment_method_types: ["pix"],
    payment_method_data: {
      type: "pix",
      billing_details: {
        name: name,
        email: email,
        tax_id: taxId, // CPF ou CNPJ obrigatório para PIX no Brasil
      },
    },
    confirm: true,
    metadata: {
      product_id: productId,
      product_name: product.name,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  }
}

export async function checkPixPaymentStatus(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  return {
    status: paymentIntent.status,
    pixQrCode: paymentIntent.next_action?.pix_display_qr_code?.data || null,
    pixCode: paymentIntent.next_action?.pix_display_qr_code?.data || null,
  }
}

export async function createBoletoPayment(productId: string, name: string, email: string, taxId: string) {
  const product = PRODUCTS.find((p) => p.id === productId)

  if (!product) {
    throw new Error(`Produto com id "${productId}" não encontrado`)
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.priceInCents,
    currency: "brl",
    payment_method_types: ["boleto"],
    payment_method_data: {
      type: "boleto",
      billing_details: {
        name: name,
        email: email,
        tax_id: taxId, // CPF ou CNPJ obrigatório para boleto no Brasil
        address: {
          line1: "Não informado",
          city: "Não informado",
          state: "SP",
          postal_code: "00000000",
          country: "BR",
        },
      },
    },
    confirm: true,
    metadata: {
      product_id: productId,
      product_name: product.name,
    },
  })

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  }
}

export async function checkBoletoPaymentStatus(paymentIntentId: string) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  return {
    status: paymentIntent.status,
    boletoUrl: paymentIntent.next_action?.boleto_display_details?.hosted_voucher_url || null,
    boletoNumber: paymentIntent.next_action?.boleto_display_details?.number || null,
    boletoExpiresAt: paymentIntent.next_action?.boleto_display_details?.expires_at || null,
  }
}
