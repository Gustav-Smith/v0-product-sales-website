import "server-only"

import Stripe from "stripe"

// Debug: verificar se a chave está sendo carregada
console.log("Stripe key length:", process.env.STRIPE_SECRET_KEY?.length)
console.log("Stripe key starts with sk_test:", process.env.STRIPE_SECRET_KEY?.startsWith("sk_test"))

// Fallback para ambiente de build sem variáveis de ambiente
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"

export const stripe = new Stripe(stripeKey)
