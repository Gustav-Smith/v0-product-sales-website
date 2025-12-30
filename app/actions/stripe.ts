"use server"

import { stripe } from "@/lib/stripe"
import { PRODUCTS } from "@/lib/products"

export async function startCheckoutSession(productId: string) {
  try {
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
  } catch (error: any) {
    console.error("Erro em startCheckoutSession:", error)
    throw new Error("Erro ao criar sessão de pagamento")
  }
}

export async function createPixPayment(productId: string, name: string, email: string, taxId: string) {
  try {
    // Validar productId primeiro
    if (!productId?.trim()) {
      throw new Error("ID do produto não fornecido")
    }

    // Validar environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Chave secreta do Stripe não configurada")
    }

    const product = PRODUCTS.find((p) => p.id === productId)

    if (!product) {
      throw new Error(`Produto com id "${productId}" não encontrado`)
    }

    // Validar dados de entrada
    if (!name?.trim() || !email?.trim() || !taxId?.trim()) {
      throw new Error("Dados incompletos para pagamento PIX")
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.priceInCents,
      currency: "brl",
      payment_method_types: ["pix"],
      payment_method_data: {
        type: "pix",
        billing_details: {
          name: name.trim(),
          email: email.trim(),
          tax_id: taxId.replace(/\D/g, ""), // Limpar CPF/CNPJ
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
  } catch (error: any) {
    console.error("Erro em createPixPayment:", error)
    
    // Tratar erros específicos do Stripe
    if (error.type === 'StripeCardError') {
      throw new Error(`Erro no pagamento: ${error.message}`)
    } else if (error.type === 'StripeRateLimitError') {
      throw new Error("Muitas tentativas. Tente novamente em alguns minutos.")
    } else if (error.type === 'StripeInvalidRequestError') {
      throw new Error("Requisição inválida. Verifique os dados e tente novamente.")
    } else if (error.type === 'StripeAPIError') {
      throw new Error("Erro na comunicação com o serviço de pagamento.")
    } else if (error.type === 'StripeConnectionError') {
      throw new Error("Erro de conexão. Verifique sua internet e tente novamente.")
    } else if (error.type === 'StripeAuthenticationError') {
      throw new Error("Erro de autenticação. Contate o suporte.")
    }
    
    throw error
  }
}

export async function checkPixPaymentStatus(paymentIntentId: string) {
  try {
    // Validar environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Chave secreta do Stripe não configurada")
    }

    if (!paymentIntentId?.trim()) {
      throw new Error("ID do pagamento não fornecido")
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return {
      status: paymentIntent.status,
      pixQrCode: paymentIntent.next_action?.pix_display_qr_code?.data || null,
      pixCode: paymentIntent.next_action?.pix_display_qr_code?.data || null,
    }
  } catch (error: any) {
    console.error("Erro em checkPixPaymentStatus:", error)
    
    // Tratar erros específicos do Stripe
    if (error.type === 'StripeInvalidRequestError') {
      throw new Error("Pagamento não encontrado")
    } else if (error.type === 'StripeAPIError') {
      throw new Error("Erro ao verificar status do pagamento")
    } else if (error.type === 'StripeConnectionError') {
      throw new Error("Erro de conexão. Tente novamente.")
    }
    
    throw error
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
