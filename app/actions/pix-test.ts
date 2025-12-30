"use server"

// Server action de teste para debug
export async function testServerAction() {
  try {
    console.log("Server action de teste executada!")
    
    // Testar ambiente
    const envInfo = {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
    
    console.log("Environment info:", envInfo)
    
    return {
      success: true,
      message: "Server action de teste executada com sucesso!",
      envInfo
    }
  } catch (error: any) {
    console.error("Erro na server action de teste:", error)
    return {
      success: false,
      error: error.message || "Erro desconhecido na server action de teste",
      stack: error.stack
    }
  }
}
