export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  features: string[]
  badge?: string
  deliveryTime: string
}

// Catálogo de serviços financeiros
export const PRODUCTS: Product[] = [
  {
    id: "justbrasil-escavador",
    name: "JUSTBRASIL + ESCAVADOR",
    description: "Mapeamento Jurídico Profundo – Proteção, Prevenção e Reputação",
    priceInCents: 125000, // R$ 1.250,00
    deliveryTime: "30 a 45 dias úteis",
    features: [
      "Busca completa de processos judiciais",
      "Análise de histórico jurídico",
      "Monitoramento de ações em andamento",
      "Relatório detalhado de reputação",
      "Consulta em bases JustBrasil e Escavador",
      "Prevenção e proteção jurídica",
    ],
  },
  {
    id: "limpa-nome",
    name: "Limpa Nome",
    description: "Remoção de apontamentos e reabilitação jurídica do CPF e CNPJ",
    priceInCents: 150000, // R$ 1.500,00
    deliveryTime: "45 a 60 dias úteis",
    features: [
      "Remoção de apontamentos negativos",
      "Reabilitação jurídica completa",
      "Regularização de CPF e CNPJ",
      "Análise completa de débitos",
      "Renegociação com credores",
      "Acompanhamento até conclusão",
      "Suporte prioritário",
    ],
    badge: "Mais Popular",
  },
  {
    id: "rating-credito",
    name: "Rating + Renda Presumida + Perfil Interno Bancário",
    description: "Rating Bancário + Atualização de Score + Renda Presumida + Reputação Interna",
    priceInCents: 250000, // R$ 2.500,00
    deliveryTime: "30 a 60 dias úteis",
    features: [
      "Análise completa de Rating Bancário",
      "Atualização e melhoria de Score",
      "Cálculo de Renda Presumida",
      "Perfil Interno Bancário detalhado",
      "Análise de Reputação Interna nos bancos",
      "Consultoria especializada",
      "Relatório completo personalizado",
      "Monitoramento por 90 dias",
    ],
    badge: "Premium",
  },
]

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceInCents / 100)
}
