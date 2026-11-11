import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de uso — Use D'lua" },
      { name: "description", content: "Condições de uso da loja virtual Use D'lua." },
      { property: "og:title", content: "Termos de uso — Use D'lua" },
      { property: "og:description", content: "Condições de uso da loja virtual Use D'lua." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-2xl px-4 py-20">
      <p className="eyebrow">Institucional</p>
      <h1 className="mt-2 text-4xl">Termos de uso</h1>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Bem-vindo(a) à Use D&apos;lua! Ao acessar e realizar compras no nosso site
          (https://use-dlua.vercel.app), você concorda com os termos e condições descritos a seguir.
          Recomendamos a leitura atenta deste documento antes de efetuar qualquer pedido.
        </p>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">1. Identificação da loja</h2>
          <p>
            A loja virtual Use D&apos;lua é mantida e operada por ANA JULIA SANTOS PEREIRA MAZETTO,
            pessoa física inscrita no CPF/MF sob o nº 510.262.038-05, com sede na cidade de Praia
            Grande/SP.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Site oficial: https://use-dlua.vercel.app</li>
            <li>
              E-mail de contato:{" "}
              <a href="mailto:use.dlua01@gmail.com" className="underline">
                use.dlua01@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">2. Condições de navegação e uso do site</h2>
          <p>Ao utilizar nossa plataforma, você se compromete a:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Fornecer dados cadastrais e de entrega verdadeiros, exatos e atualizados;</li>
            <li>
              Não utilizar o site para fins ilícitos, envio de spams ou tentativa de violação da
              segurança da plataforma;
            </li>
            <li>Manter o sigilo de seus dados de login, caso possua conta cadastrada.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">3. Produtos, preços e disponibilidade</h2>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-foreground">Catálogo:</strong> As peças exibidas no site
              (pijamas, lingerie, corsets, etc.) dependem da disponibilidade de estoque.
            </li>
            <li>
              <strong className="text-foreground">Alterações de Preço:</strong> Os preços,
              descrições e promoções exibidos podem ser alterados ou atualizados a qualquer momento,
              sem aviso prévio.
            </li>
            <li>
              <strong className="text-foreground">Indisponibilidade:</strong> Todos os pedidos estão
              sujeitos à confirmação de pagamento e disponibilidade em estoque. Caso um item
              comprado fique indisponível, nossa equipe entrará em contato para oferecer a troca por
              outro produto ou o reembolso integral do valor pago.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">4. Pagamentos e processamento</h2>
          <p>
            Os pagamentos são processados por plataformas parceiras seguras. O processamento do
            pedido terá início somente após a confirmação e aprovação do pagamento pela instituição
            financeira.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">
            5. Trocas e devoluções (direito de arrependimento)
          </h2>
          <p>Respeitamos integralmente o Código de Defesa do Consumidor (CDC):</p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-foreground">Prazo de Arrependimento:</strong> O cliente tem
              até 7 (sete) dias corridos, a contar da data de recebimento do produto, para solicitar
              a devolução ou troca da compra por arrependimento.
            </li>
            <li>
              <strong className="text-foreground">Condições das Peças:</strong> Por se tratar de
              peças de vestuário e moda íntima, as trocas ou devoluções só serão aceitas se os
              produtos estiverem sem uso, sem indícios de lavagem, sem odores e com a etiqueta
              original afixada.
            </li>
            <li>
              <strong className="text-foreground">Como Solicitar:</strong> Para solicitar a troca ou
              devolução, envie um e-mail para{" "}
              <a href="mailto:use.dlua01@gmail.com" className="underline">
                use.dlua01@gmail.com
              </a>{" "}
              informando o número do pedido e o motivo.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">6. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo exibido no site — incluindo marca, logotipo Use D&apos;lua, fotos dos
            produtos, textos, layouts e design — é de propriedade exclusiva de Ana Julia Santos
            Pereira Mazetto ou licenciado a ela. É proibida a cópia, reprodução ou distribuição não
            autorizada de qualquer elemento do site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">7. Limitação de responsabilidade</h2>
          <p>
            Trabalhamos continuamente para manter o site seguro e funcional, mas não nos
            responsabilizamos por eventuais indisponibilidades temporárias da plataforma decorrentes
            de falhas técnicas ou de servidores de terceiros.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">8. Foro e legislação aplicável</h2>
          <p>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Para a
            resolução de quaisquer dúvidas ou controvérsias decorrentes deste contrato, fica eleito
            o foro da Comarca de Praia Grande/SP.
          </p>
        </section>

        <p className="italic">Última atualização: Novembro de 2026.</p>
      </div>
    </article>
  ),
});
