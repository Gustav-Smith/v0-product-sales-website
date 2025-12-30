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
    name: "Mapeamento Jurídico Completo",
    description: "Encontre processos que você nem sabia que existem e proteja seu patrimônio",
    priceInCents: 125000, // R$ 1.250,00
    deliveryTime: "30 a 45 dias úteis",
    features: [
      "Busca em todos os tribunais do Brasil",
      "Análise completa de processos judiciais",
      "Identificação de ações contra você",
      "Relatório detalhado de riscos",
      "Alertas de novas ações",
      "Proteção patrimonial garantida",
    ],
  },
  {
    id: "limpa-nome",
    name: "Limpeza de Nome Definitiva",
    description: "Remova todas as dívidas negativadas e recupere seu crédito imediatamente",
    priceInCents: 150000, // R$ 1.500,00
    deliveryTime: "45 a 60 dias úteis",
    features: [
      "Remoção 100% das dívidas negativadas",
      "Renegociação com todos os credores",
      "Baixa de protestos e restrições",
      "Atualização do score em tempo real",
      "Acompanhamento até o final",
      "Garantia de nome limpo ou dinheiro back",
    ],
    badge: "Mais Popular",
  },
  {
    id: "rating-credito",
    name: "Recuperação de Score Completa",
    description: "Aumente seu score para 900+ e tenha acesso aos melhores créditos do mercado",
    priceInCents: 250000, // R$ 2.500,00
    deliveryTime: "30 a 60 dias úteis",
    features: [
      "Aumento garantido do score para 900+",
      "Criação de renda presumida legal",
      "Perfil bancário positivo em todos os bancos",
      "Limite de crédito aumentado em 10x",
      "Acesso a financiamentos imobiliários",
      "Consultoria financeira vitalícia",
      "Monitoramento por 6 meses grátis",
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
