/**
 * routes/admin.cupons.tsx
 *
 * Tela de cupons do painel admin.
 * Lista, cria, edita e exclui cupons da coleção "coupons" do Firestore.
 * No mobile a tabela vira cartões, igual à tela de produtos.
 */

import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  adminDeleteCoupon,
  adminFetchCoupons,
  adminSaveCoupon,
  type AdminCoupon,
  type CouponType,
} from "@/lib/admin";
import { formatPrice } from "@/lib/types";

export const Route = createFileRoute("/admin/cupons")({
  component: AdminCupons,
});

// Texto do desconto: "10% de desconto" ou "R$ 50,00 de desconto"
function describeDiscount(c: AdminCoupon) {
  const value = Number(c.value);
  if (!Number.isFinite(value)) return "Desconto não definido";
  return c.type === "percent" ? `${value}%` : formatPrice(value);
}

// Texto da compra mínima
function describeMin(c: AdminCoupon) {
  return c.minSubtotal > 0 ? formatPrice(c.minSubtotal) : "Sem mínimo";
}

function AdminCupons() {
  const [coupons, setCoupons] = useState<AdminCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // null = mostra a lista | {} = novo cupom | cupom existente = edição
  const [editing, setEditing] = useState<Partial<AdminCoupon> | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    setError("");
    try {
      setCoupons(await adminFetchCoupons());
    } catch (err) {
      console.error("Erro ao carregar cupons:", err);
      setError("Não foi possível carregar os cupons. Veja o console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm(`Excluir o cupom ${id}? Essa ação não pode ser desfeita.`)) return;
    await adminDeleteCoupon(id);
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleSave(data: Omit<AdminCoupon, "id">) {
    await adminSaveCoupon(data);
    setEditing(null);
    await load();
  }

  if (editing !== null) {
    return <CouponForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl tracking-wide">Cupons</h1>
        <button onClick={() => setEditing({})} className="btn-gold">
          + Novo cupom
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Carregando…</p>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : coupons.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum cupom cadastrado ainda.</p>
      ) : (
        <>
          {/* Desktop: tabela */}
          <div className="hidden overflow-hidden rounded border border-border md:block">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Código</th>
                  <th className="px-4 py-3">Desconto</th>
                  <th className="px-4 py-3">Compra mínima</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-secondary/40">
                    <td className="px-4 py-3 font-medium">{c.code ?? c.id}</td>
                    <td className="px-4 py-3">{describeDiscount(c)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{describeMin(c)}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => setEditing(c)}
                          className="text-xs underline underline-offset-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="text-xs text-destructive underline underline-offset-2"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: cartões com Editar/Excluir centralizados */}
          <div className="flex flex-col gap-3 md:hidden">
            {coupons.map((c) => (
              <div key={c.id} className="rounded border border-border px-4 py-3">
                <p className="text-sm font-medium">{c.code ?? c.id}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {describeDiscount(c)} · Mínimo: {describeMin(c)}
                </p>
                <div className="mt-3 flex justify-center gap-8 border-t border-border pt-3">
                  <button
                    onClick={() => setEditing(c)}
                    className="text-xs underline underline-offset-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-xs text-destructive underline underline-offset-2"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formulário de cadastro / edição
// ---------------------------------------------------------------------------

function CouponForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<AdminCoupon>;
  onSave: (data: Omit<AdminCoupon, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  // Se já tem id, é edição — o código não pode mudar (ele é o ID do documento)
  const isEdit = Boolean(initial.id);
  const initialType: CouponType = initial.type ?? "percent";

  const [code, setCode] = useState(initial.code ?? "");
  const [type, setType] = useState<CouponType>(initialType);

  // Valor fixo e compra mínima ficam em centavos no Firestore, mas aparecem em reais aqui
  const [valueDisplay, setValueDisplay] = useState(
    initial.value === undefined
      ? ""
      : String(initialType === "fixed" ? initial.value / 100 : initial.value),
  );
  const [minDisplay, setMinDisplay] = useState(
    initial.minSubtotal ? String(initial.minSubtotal / 100) : "",
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const value = Number(valueDisplay.replace(",", "."));
    const min = minDisplay ? Number(minDisplay.replace(",", ".")) : 0;

    if (!code.trim()) return setError("Informe o código do cupom.");
    if (!(value > 0)) return setError("Informe um valor de desconto maior que zero.");
    if (type === "percent" && value > 100) return setError("A porcentagem máxima é 100.");
    if (Number.isNaN(min) || min < 0) return setError("Compra mínima inválida.");

    setSaving(true);
    try {
      await onSave({
        code: code.trim().toUpperCase(),
        type,
        value: type === "fixed" ? Math.round(value * 100) : value,
        minSubtotal: Math.round(min * 100),
      });
    } catch {
      setError("Não foi possível salvar o cupom.");
      setSaving(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl tracking-wide">{isEdit ? "Editar cupom" : "Novo cupom"}</h1>

      <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-4">
        <Field label="Código">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/\s/g, ""))}
            disabled={isEdit}
            required
            className={`${inputClass} disabled:opacity-60`}
            placeholder="Ex.: BEMVINDA50"
          />
          {isEdit && (
            <p className="mt-1 text-xs text-muted-foreground">
              O código não pode ser alterado. Para mudar, crie um cupom novo e exclua este.
            </p>
          )}
        </Field>

        <Field label="Tipo de desconto">
          <select
            value={type}
            onChange={(e) => setType(e.target.value as CouponType)}
            className={inputClass}
          >
            <option value="percent">Porcentagem (%)</option>
            <option value="fixed">Valor fixo (R$)</option>
          </select>
        </Field>

        <Field label={type === "percent" ? "Desconto (%)" : "Desconto (R$)"}>
          <input
            type="number"
            step="0.01"
            min="0"
            value={valueDisplay}
            onChange={(e) => setValueDisplay(e.target.value)}
            required
            className={inputClass}
            placeholder={type === "percent" ? "Ex.: 10" : "Ex.: 50.00"}
          />
        </Field>

        <Field label="Compra mínima (R$) — deixe vazio se não houver">
          <input
            type="number"
            step="0.01"
            min="0"
            value={minDisplay}
            onChange={(e) => setMinDisplay(e.target.value)}
            className={inputClass}
            placeholder="Ex.: 300.00"
          />
        </Field>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-gold disabled:opacity-50">
            {saving ? "Salvando…" : "Salvar cupom"}
          </button>
          <button type="button" onClick={onCancel} className="btn-outline-ink">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Componentes auxiliares
// ---------------------------------------------------------------------------

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ink w-full";
