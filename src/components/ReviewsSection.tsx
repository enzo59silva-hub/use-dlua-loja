import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Quote, Star } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { fetchReviews, submitReview, type Review } from "@/lib/reviews";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-gold" role="img" aria-label={`Nota ${value} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`h-4 w-4 ${n <= value ? "fill-current" : "text-ink/20"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-l-4 border-gold bg-card p-6">
      <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
      <div className="mt-3">
        <Stars value={review.rating} />
      </div>
      <p className="mt-3 wrap-break-words text-sm leading-relaxed text-ink/80">{review.text}</p>
      <p className="mt-4 text-sm">
        <span className="font-medium">{review.name}</span>
        <span className="text-muted-foreground"> · {formatDate(review.createdAt)}</span>
      </p>
    </article>
  );
}

export function ReviewsSection() {
  const { user, loading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const [showAll, setShowAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const alreadyReviewed = Boolean(user && reviews.some((r) => r.userId === user.uid));
  const visible = showAll ? reviews : reviews.slice(0, 3);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (rating < 1) {
      toast.error("Escolha de 1 a 5 estrelas.");
      return;
    }
    setBusy(true);
    try {
      await submitReview({
        userId: user.uid,
        name: user.displayName?.trim() || "Cliente",
        rating,
        text: text.trim(),
      });
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setText("");
      setRating(0);
      toast.success("Avaliação enviada. Obrigada!");
    } catch {
      toast.error("Não foi possível enviar a avaliação. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="eyebrow">Avaliações</p>
        <h2 className="mt-2 text-3xl">O que dizem nossas clientes</h2>
      </div>

      {isLoading ? (
        <div className="min-h-40" aria-hidden="true" />
      ) : reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">Ainda não há avaliações. Seja a primeira!</p>
      ) : (
        <>
          <div className="grid gap-5 md:grid-cols-3">
            {visible.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
          {reviews.length > 3 && (
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="btn-outline-ink"
              >
                {showAll ? "Ver menos" : `Ver todas as avaliações (${reviews.length})`}
              </button>
            </div>
          )}
        </>
      )}

      {!authLoading && (
        <div className="mx-auto mt-12 max-w-xl border border-border bg-card p-6">
          {!user ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Quer deixar sua avaliação? Entre na sua conta.
              </p>
              <Link to="/conta" className="btn-outline-ink mt-4 inline-block">
                Entrar para avaliar
              </Link>
            </div>
          ) : alreadyReviewed ? (
            <p className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.16em]">
              <Check className="h-4 w-4 text-gold" aria-hidden="true" />
              Avaliação enviada
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="eyebrow text-center">Deixe sua avaliação</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
                    className="text-gold"
                  >
                    <Star
                      className={`h-8 w-8 ${n <= (hover || rating) ? "fill-current" : "text-ink/25"}`}
                    />
                  </button>
                ))}
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                maxLength={500}
                required
                placeholder="Conte como foi sua experiência…"
                className="w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-gold"
              />
              <button type="submit" disabled={busy} className="btn-gold w-full disabled:opacity-50">
                {busy ? "Enviando…" : "Enviar avaliação"}
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
