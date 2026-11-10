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
      <h1 className="mt-2 text-4xl">Sobre nossa loja</h1>
      <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
        <p>
          A Use D&apos;lua é uma loja de roupas íntimas femininas criada para valorizar o conforto,
          a delicadeza e a confiança de cada mulher. Nosso nome vem da lua, que muda de fase e
          continua linda em todas elas. Assim somos nós: cheias de fases, e a Use D&apos;lua quer
          estar com você em cada uma.
        </p>
        <h2 className="pt-4 text-xl text-foreground">O que você encontra aqui</h2>
        <p>
          <strong>Pijamas:</strong> peças macias e confortáveis para noites tranquilas, para você
          descansar com estilo.
        </p>
        <p>
          <strong>Calcinhas:</strong> conforto para o dia a dia, com modelos pensados para você se
          sentir bem do começo ao fim do dia.
        </p>
        <p>
          <strong>Corsets:</strong> peças que realçam a sua forma e a sua autoestima, para os
          momentos em que você quer se arrumar e se sentir poderosa.
        </p>
      </div>
    </article>
  ),
});
