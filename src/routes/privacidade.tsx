import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade — Use D'lua" },
      { name: "description", content: "Como a Use D'lua trata os seus dados pessoais." },
      { property: "og:title", content: "Política de privacidade — Use D'lua" },
      { property: "og:description", content: "Como a Use D'lua trata os seus dados pessoais." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-2xl px-4 py-20">
      <p className="eyebrow">Institucional</p>
      <h1 className="mt-2 text-4xl">Política de privacidade</h1>
      <div className="mt-8 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <p>
          Esta Política de Privacidade descreve como os seus dados pessoais são coletados, usados,
          armazenados e protegidos ao utilizar o site use-dlua (https://use-dlua.vercel.app).
        </p>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">1. Identificação do controlador dos dados</h2>
          <p>
            Este site (https://use-dlua.vercel.app) é mantido, operado e de propriedade de ANA JULIA
            SANTOS PEREIRA MAZETTO, pessoa física inscrita no CPF/MF sob o nº 510.262.038-05,
            residente e domiciliada na cidade de Praia Grande/SP.
          </p>
          <p>
            Nos termos da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), atuo como
            Controladora dos dados pessoais coletados e processados através desta plataforma.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">2. Dados pessoais coletados e finalidades</h2>
          <p>
            Podemos coletar e processar os seguintes dados pessoais fornecidos por você ou gerados
            pela sua navegação:
          </p>
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="text-foreground">Dados de Identificação e Contato:</strong> Nome,
              e-mail e outras informações enviadas espontaneamente por você através de formulários
              de contato ou cadastro no site.
              <br />
              <strong className="text-foreground">Finalidade:</strong> Identificar o usuário,
              responder a dúvidas, prestar suporte e enviar comunicações relacionadas ao serviço.
            </li>
            <li>
              <strong className="text-foreground">Dados de Navegação e Dispositivo:</strong>{" "}
              Endereço IP, tipo de navegador, sistema operacional, páginas visitadas e tempo de
              permanência no site.
              <br />
              <strong className="text-foreground">Finalidade:</strong> Garantir a segurança da
              aplicação, prevenir fraudes, otimizar o desempenho do site e melhorar a experiência de
              navegação.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">3. Base legal para o tratamento de dados</h2>
          <p>
            O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais
            previstas no Artigo 7º da LGPD:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Consentimento:</strong> Quando você fornece
              voluntariamente seus dados (ex: ao preencher um formulário de contato).
            </li>
            <li>
              <strong className="text-foreground">
                Execução de Contrato ou Procedimentos Preliminares:
              </strong>{" "}
              Necessário para prestar os serviços oferecidos na plataforma.
            </li>
            <li>
              <strong className="text-foreground">Legítimo Interesse:</strong> Para aprimorar nossos
              serviços e garantir a segurança da plataforma, respeitando os seus direitos
              fundamentais.
            </li>
            <li>
              <strong className="text-foreground">
                Cumprimento de Obrigação Legal ou Regulatória:
              </strong>{" "}
              Para guarda de registros de acesso conforme exigido pelo Marco Civil da Internet (Lei
              nº 12.965/2014).
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">
            4. Uso de cookies e tecnologias de rastreamento
          </h2>
          <p>O site use-dlua utiliza cookies e tecnologias semelhantes para:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Garantir o funcionamento adequado das funcionalidades básicas do site (cookies
              essenciais);
            </li>
            <li>
              Analisar como os usuários navegam no site para melhorar seu desempenho (cookies
              analíticos);
            </li>
            <li>Guardar preferências do usuário para futuras visitas.</li>
          </ul>
          <p>
            Você pode desativar ou configurar o bloqueio de cookies nas configurações do seu
            navegador a qualquer momento, embora isso possa afetar algumas funcionalidades da
            plataforma.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">5. Compartilhamento de dados com terceiros</h2>
          <p>
            Não vendemos nem comercializamos seus dados pessoais. Seus dados só poderão ser
            compartilhados nas seguintes situações:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Provedores de Serviços e Hospedagem:</strong>{" "}
              Empresas parceiras que fornecem infraestrutura técnica para o funcionamento do site
              (como serviços de hospedagem Vercel, banco de dados Firebase e ferramentas de
              análise), restritas ao estritamente necessário para prestar o serviço.
            </li>
            <li>
              <strong className="text-foreground">Requisição Judicial ou Legal:</strong> Para
              cumprir ordens judiciais, obrigações legais ou requisições de autoridades competentes.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">6. Segurança e armazenamento dos dados</h2>
          <p>
            Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais
            contra acessos não autorizados, destruição, perda, alteração ou qualquer forma de
            tratamento inadequado ou ilícito.
          </p>
          <p>
            Seus dados serão mantidos apenas pelo tempo necessário para cumprir as finalidades para
            as quais foram coletados ou para cumprimento de prazos legais e regulatórios.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">7. Direitos do titular dos dados</h2>
          <p>Conforme o Artigo 18 da LGPD, você tem o direito de solicitar a qualquer momento:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Confirmação da existência de tratamento de dados;</li>
            <li>Acesso aos dados mantidos sobre você;</li>
            <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>Eliminação dos dados pessoais tratados com o seu consentimento;</li>
            <li>Revogação do consentimento a qualquer momento.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">8. Canal de contato e encarregado (DPO)</h2>
          <p>
            Para exercer qualquer um dos seus direitos listados acima ou enviar dúvidas, sugestões e
            solicitações referentes a esta Política de Privacidade, entre em contato diretamente
            pelo e-mail:
          </p>
          <ul className="space-y-2">
            <li>
              📧 E-mail:{" "}
              <a href="mailto:use.dlua01@gmail.com" className="underline">
                use.dlua01@gmail.com
              </a>
            </li>
            <li>👤 Responsável pelo tratamento de dados: Ana Julia Santos Pereira Mazetto</li>
            <li>📍 Localização: Praia Grande/SP</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg text-foreground">9. Alterações nesta política de privacidade</h2>
          <p>
            Reservamo-nos o direito de atualizar esta Política de Privacidade periodicamente para
            refletir mudanças em nossas práticas ou atualizações na legislação. Recomendamos que
            você revise esta página regularmente.
          </p>
        </section>

        <p className="italic">Última atualização: Novembro de 2026.</p>
      </div>
    </article>
  ),
});
