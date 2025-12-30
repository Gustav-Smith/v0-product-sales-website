import { NextRequest, NextResponse } from 'next/server'
import { createPixPayment, checkPixPaymentStatus } from '@/app/actions/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    if (action === 'generate') {
      const { productId, name, email, taxId } = data
      
      if (!productId?.trim() || !name?.trim() || !email?.trim() || !taxId?.trim()) {
        return NextResponse.json(
          { success: false, error: "Todos os campos são obrigatórios" },
          { status: 400 }
        )
      }

      const result = await createPixPayment(productId, name, email, taxId)
      
      // Tentar obter o status imediatamente após criar
      try {
        const status = await checkPixPaymentStatus(result.paymentIntentId)
        
        return NextResponse.json({
          success: true,
          paymentIntentId: result.paymentIntentId,
          clientSecret: result.clientSecret,
          status: status.status,
          pixCode: status.pixCode,
          pixQrCode: status.pixQrCode
        })
      } catch (statusError: any) {
        // Se não conseguir o status, retorna apenas o pagamento criado
        console.log("Não foi possível obter status imediatamente:", statusError.message)
        return NextResponse.json({
          success: true,
          paymentIntentId: result.paymentIntentId,
          clientSecret: result.clientSecret,
          status: "processing",
          pixCode: null,
          pixQrCode: null
        })
      }
    } else if (action === 'status') {
      const { paymentIntentId } = data
      
      if (!paymentIntentId?.trim()) {
        return NextResponse.json(
          { success: false, error: "ID do pagamento não fornecido" },
          { status: 400 }
        )
      }

      const status = await checkPixPaymentStatus(paymentIntentId)
      
      return NextResponse.json({
        success: true,
        status: status.status,
        pixCode: status.pixCode,
        pixQrCode: status.pixQrCode
      })
    }

    return NextResponse.json(
      { success: false, error: "Ação inválida" },
      { status: 400 }
    )
  } catch (error: any) {
    console.error("Erro na API PIX:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Erro ao processar requisição" },
      { status: 500 }
    )
  }
}
