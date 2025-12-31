import "server-only"

import Stripe from "stripe"

// Fallback para ambiente de build sem variáveis de ambiente
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder"

export const stripe = new Stripe(stripeKey)
