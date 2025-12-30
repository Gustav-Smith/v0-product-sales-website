import { NextResponse } from 'next/server'
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    console.log("API de teste executada!")
    
    const envInfo = {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
    
    console.log("Environment info:", envInfo)
    
    return NextResponse.json({
      success: true,
      message: "API de teste executada com sucesso!",
      envInfo
    })
  } catch (error: any) {
    console.error("Erro na API de teste:", error)
    return NextResponse.json(
      { success: false, error: error.message || "Erro desconhecido na API de teste" },
      { status: 500 }
    )
  }
}
