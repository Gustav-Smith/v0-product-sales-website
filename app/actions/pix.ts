"use server"

import { createPixPayment, checkPixPaymentStatus } from "./stripe"

export async function generatePixPayment(formData: FormData) {
  try {
    const productId = formData.get("productId") as string
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const taxId = formData.get("taxId") as string

    if (!productId?.trim() || !name?.trim() || !email?.trim() || !taxId?.trim()) {
      return {
        success: false,
        error: "Todos os campos são obrigatórios"
      }
    }

    const result = await createPixPayment(productId, name, email, taxId)
    
    return {
      success: true,
      paymentIntentId: result.paymentIntentId,
      clientSecret: result.clientSecret
    }
  } catch (error: any) {
    console.error("Erro em generatePixPayment:", error)
    return {
      success: false,
      error: error.message || "Erro ao gerar pagamento PIX"
    }
  }
}

export async function getPixPaymentStatus(paymentIntentId: string) {
  try {
    if (!paymentIntentId?.trim()) {
      return {
        success: false,
        error: "ID do pagamento não fornecido"
      }
    }

    const status = await checkPixPaymentStatus(paymentIntentId)
    
    return {
      success: true,
      status: status.status,
      pixCode: status.pixCode,
      pixQrCode: status.pixQrCode
    }
  } catch (error: any) {
    console.error("Erro em getPixPaymentStatus:", error)
    return {
      success: false,
      error: error.message || "Erro ao verificar status do pagamento"
    }
  }
}
