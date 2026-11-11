import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Use D'lua" },
      { name: "description", content: "Conheça a história e os valores da Use D'lua." },
      { property: "og:title", content: "Sobre a Use D'lua" },
      { property: "og:description", content: "Conheça a história e os valores da Use D'lua." },
    ],
  }),
  component: () => (
    <article className="mx-auto max-w-2xl px-4 py-20">
      <p className="eyebrow">Institucional</p>
      <h1 className="mt-2 text-4xl">Sobre a Use D&apos;lua</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <h2 className="text-xl text-foreground">Bem-vinda à Use D&apos;lua!</h2>
        <p>
          A Use D&apos;lua nasceu com o propósito de unir conforto, autoestima e elegância em cada
          detalhe. Acreditamos que a moda íntima e o vestuário de descanso vão muito além do uso
          diário: são formas de cuidado, expressão e bem-estar para todos os momentos do seu dia a
          dia.
        </p>
        <p>
          Nossa curadoria conta com peças selecionadas para destacar a sua melhor versão — desde
          pijamas confortáveis para noites de descanso perfeitas, calcinhas com ajuste impecável,
          até corsets marcantes projetados para valorizar a sua silhueta com sofisticação.
        </p>
        <h2 className="pt-4 text-xl text-foreground">Nossa missão e propósito</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <strong className="text-foreground">Conforto sem abrir mão do estilo:</strong>{" "}
            Selecionamos tecidos e modelagens que proporcionam toque suave na pele e caimento
            perfeito.
          </li>
          <li>
            <strong className="text-foreground">Transparência e Respeito:</strong> Priorizamos uma
            experiência de compra segura, transparente e um atendimento próximo com cada cliente.
          </li>
          <li>
            <strong className="text-foreground">Qualidade em primeiro lugar:</strong> Cada peça
            enviada passa por uma conferência para garantir que você receba um produto impecável na
            sua casa.
          </li>
        </ul>
      </div>
    </article>
  ),
});
