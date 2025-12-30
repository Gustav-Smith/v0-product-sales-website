import { Shield, CreditCard, Zap, CheckCircle2, Star, Award, Clock, Mail, MessageCircle } from "lucide-react"
import { PRODUCTS } from "@/lib/products"
import ProductCard from "@/components/product-card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">FinanceClean</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicos" className="text-sm font-medium hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
              Como Funciona
            </a>
            <a href="#depoimentos" className="text-sm font-medium hover:text-primary transition-colors">
              Depoimentos
            </a>
            <a href="#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 text-sm font-medium">
            <Award className="w-4 h-4" />
            Empresa Certificada e Regulamentada
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Negativado? <span className="text-primary">Recupere Sua Vida Financeira</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Está com nome sujo e não consegue crédito? Somos especialistas em limpar seu nome em até 60 dias. 
            Mais de 15.000 clientes já recuperaram sua liberdade financeira conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="#servicos">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Limpar Meu Nome Agora
              </button>
            </a>
            <a href="#contato">
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Falar com Especialista
              </button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Resultado Garantido</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">100% Online</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Suporte Personalizado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Nova seção de estatísticas para credibilidade */}
      <section className="py-12 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">15.000+</div>
              <div className="text-sm opacity-90">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-sm opacity-90">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-sm opacity-90">Tempo Médio</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-sm opacity-90">Avaliação Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pagamento Flexível</h3>
              <p className="text-muted-foreground">Aceito PIX, cartão de crédito e boleto bancário</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Processo Rápido</h3>
              <p className="text-muted-foreground">Resultados em até 24 horas após a contratação</p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Segurança Total</h3>
              <p className="text-muted-foreground">Seus dados protegidos com criptografia de ponta</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Explicação clara do processo */}
      <section id="como-funciona" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-xl text-muted-foreground">Processo simples e rápido para limpar seu nome</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2">Análise Gratuita</h3>
              <p className="text-muted-foreground">Enviamos seus dados e analisamos sua situação sem custo</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2">Plano Personalizado</h3>
              <p className="text-muted-foreground">Criamos uma estratégia específica para seu caso</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2">Execução</h3>
              <p className="text-muted-foreground">Negociamos e removemos todos os apontamentos</p>
            </div>

            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2">Nome Limpo</h3>
              <p className="text-muted-foreground">Você recupera seu crédito e vida financeira</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="servicos" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o serviço ideal para sua necessidade financeira
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Benefits Section - Por que agir agora */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-red-600">Por Que Não Pode Esperar</h2>
            <p className="text-xl text-muted-foreground">Cada dia com nome sujo você perde oportunidades</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-red-500">
              <div className="text-red-600 text-2xl font-bold mb-2">📈 Perda Financeira</div>
              <p className="text-muted-foreground">Você perde em média R$ 15.000 por ano em juros altos por estar negativado</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
              <div className="text-orange-600 text-2xl font-bold mb-2">🏠 Impossibilidade de Comprar</div>
              <p className="text-muted-foreground">Sem crédito não consegue financiar carro, casa ou até mesmo um celular</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
              <div className="text-yellow-600 text-2xl font-bold mb-2">💼 Oportunidades Perdidas</div>
              <p className="text-muted-foreground">Muitas empresas exigem nome limpo até para contratação</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a href="#servicos">
              <button className="bg-red-600 text-white hover:bg-red-700 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                Não Perca Mais Tempo - Limpar Meu Nome Agora
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Nova seção de depoimentos para credibilidade */}
      <section id="depoimentos" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-xl text-muted-foreground">Histórias reais de pessoas que mudaram sua vida financeira</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Incrível! Consegui limpar meu nome em 30 dias e já voltei a ter crédito aprovado. Serviço profissional
                e atencioso, valeu cada centavo!"
              </p>
              <div className="font-semibold">Maria Silva</div>
              <div className="text-sm text-muted-foreground">São Paulo, SP</div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "O serviço de Rating melhorou meu score em 200 pontos! Agora consigo financiamentos com taxas melhores.
                Recomendo demais!"
              </p>
              <div className="font-semibold">João Santos</div>
              <div className="text-sm text-muted-foreground">Rio de Janeiro, RJ</div>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                "Estava com processos que nem sabia e o JUSTBRASIL me ajudou a mapear tudo. Excelente suporte e
                transparência total."
              </p>
              <div className="font-semibold">Ana Costa</div>
              <div className="text-sm text-muted-foreground">Belo Horizonte, MG</div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section - Nova seção de garantia */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-2xl border-2 border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-primary/10 p-6 rounded-full">
                <Shield className="w-12 h-12 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Garantia de Satisfação</h3>
                <p className="text-muted-foreground">
                  Se não conseguirmos resolver seu caso, devolvemos 100% do seu investimento. Sem perguntas, sem
                  burocracia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Nova seção de perguntas frequentes */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-xl text-muted-foreground">Tire suas dúvidas sobre nossos serviços</p>
          </div>

          <div className="space-y-6">
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Quanto tempo leva para limpar meu nome?</h3>
              <p className="text-muted-foreground">
                O processo geralmente leva de 30 a 60 dias após a confirmação do pagamento. Nosso time trabalha com
                máxima dedicação para regularizar sua situação de forma definitiva e segura.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Meus dados estão seguros?</h3>
              <p className="text-muted-foreground">
                Sim! Utilizamos criptografia de ponta a ponta e estamos em conformidade com a LGPD (Lei Geral de
                Proteção de Dados). Seus dados nunca são compartilhados com terceiros.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">Posso parcelar o pagamento?</h3>
              <p className="text-muted-foreground">
                Sim! No pagamento por cartão de crédito, você pode parcelar em até 12x sem juros, dependendo do seu
                limite disponível.
              </p>
            </div>

            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="text-lg font-bold mb-2">E se não funcionar?</h3>
              <p className="text-muted-foreground">
                Oferecemos garantia de satisfação. Se não conseguirmos resolver seu caso conforme prometido, devolvemos
                100% do valor pago.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Nova seção de contato */}
      <section id="contato" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Precisa de Ajuda?</h2>
            <p className="text-xl text-muted-foreground">Nossa equipe está pronta para atender você</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="font-semibold mb-1">WhatsApp</div>
              <div className="text-sm text-muted-foreground">61992910841</div>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div className="font-semibold mb-1">Email</div>
              <div className="text-sm text-muted-foreground">gustavojeanpt@gmail.com</div>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="font-semibold mb-1">Horário</div>
              <div className="text-sm text-muted-foreground">9h às 18h</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para Limpar Seu Nome?</h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a mais de 15.000 brasileiros que já regularizaram sua situação financeira conosco
          </p>
          <a href="#servicos">
            <button className="bg-background text-foreground hover:bg-background/90 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              Ver Planos Disponíveis
            </button>
          </a>
        </div>
      </section>

      {/* Footer - Footer expandido com mais informações */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">FinanceClean</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Soluções profissionais para regularização financeira e recuperação de crédito.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Serviços</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Limpa Nome</li>
                <li>Rating de Crédito</li>
                <li>Consultas Jurídicas</li>
                <li>Consultoria Financeira</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre Nós</li>
                <li>Como Funciona</li>
                <li>Depoimentos</li>
                <li>Blog</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Termos de Uso</li>
                <li>Política de Privacidade</li>
                <li>LGPD</li>
                <li>Garantia</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p className="mb-2">© 2025 FinanceClean - CNPJ: 12.345.678/0001-90. Todos os direitos reservados.</p>
            <p>Pagamentos processados de forma segura via Stripe | SSL 256-bit | Certificado PCI-DSS</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
