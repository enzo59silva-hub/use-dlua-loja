/**
 * routes/admin.tsx
 *
 * Layout raiz do painel admin. Toda rota que começa com /admin
 * passa primeiro por aqui — é o "portão" de entrada.
 *
 * Responsabilidades:
 * 1. Verificar se o usuário está logado (guard de autenticação)
 * 2. Mostrar a tela de login se não estiver
 * 3. Renderizar o layout com a barra lateral se estiver logado
 */

import { useState } from "react";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useAuth } from "@/lib/auth";

// createFileRoute registra esta rota no TanStack Router
// O caminho "/admin" faz com que todas as subrotas (/admin/produtos, /admin/pedidos)
// passem por aqui antes de renderizar
export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

// ---------------------------------------------------------------------------
// Layout principal — só aparece se o usuário estiver logado
// ---------------------------------------------------------------------------

function AdminLayout() {
  // useAuth() retorna o usuário atual e as funções de login/logout
  // Definido em src/lib/auth.tsx
  const { user, loading, isAdmin } = useAuth();
  // Controla o menu hambúrguer no mobile (aberto/fechado)
  const [menuOpen, setMenuOpen] = useState(false);

  // Enquanto o Firebase verifica a sessão, mostra um loader simples
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando…
      </div>
    );
  }

  // Se não há usuário logado, mostra a tela de login
  if (!user) {
    return <LoginScreen />;
  }

  if (!isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Acesso não autorizado.
      </div>
    );
  }

  // Usuário logado: renderiza o painel
  return (
    <div className="flex min-h-screen">
      {/* Fundo escuro atrás do menu (só mobile, quando aberto). Clicou fora, fecha */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-55 bg-black/40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Barra lateral: gaveta no mobile, fixa no desktop */}
      <Sidebar open={menuOpen} onNavigate={() => setMenuOpen(false)} />

      {/* Outlet é onde as subrotas são renderizadas
          Quando o usuário acessa /admin/produtos, o conteúdo aparece aqui */}
      <main className="min-w-0 flex-1 overflow-auto p-4 md:p-8">
        {/* Botão hambúrguer (só aparece no mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu do admin"
          className="mb-4 flex items-center gap-2 rounded border border-border px-3 py-2 text-sm md:hidden"
        >
          <Menu size={18} />
          Menu
        </button>

        <Outlet />
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Barra lateral de navegação
// ---------------------------------------------------------------------------

function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { user, logout } = useAuth();
  // useLocation retorna a rota atual — usamos para destacar o link ativo
  const { pathname } = useLocation();

  // Links do menu admin
  const links = [
    { to: "/admin/produtos", label: "Produtos" },
    { to: "/admin/pedidos", label: "Pedidos" },
    { to: "/admin/usuarios", label: "Usuários" },
    { to: "/admin/cupons", label: "Cupons" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-60 flex w-52 flex-col border-r border-border bg-background px-4 py-8 transition-transform md:static md:z-auto md:translate-x-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Admin
      </p>

      <nav className="flex flex-col gap-1">
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={`rounded px-3 py-2 text-sm ${
              // pathname.startsWith(to) destaca o link da página atual
              pathname.startsWith(to)
                ? "bg-ink text-background"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Rodapé da sidebar: e-mail do usuário + botão de logout */}
      <div className="mt-auto">
        <p className="mb-2 truncate text-xs text-muted-foreground">{user?.email}</p>
        <button
          onClick={logout}
          className="w-full rounded border border-border px-3 py-2 text-xs text-muted-foreground hover:border-ink hover:text-foreground"
        >
          Sair
        </button>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Tela de login — aparece quando não há sessão ativa
// ---------------------------------------------------------------------------

function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    // preventDefault impede o comportamento padrão do formulário (recarregar a página)
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // signIn chama o Firebase Auth e armazena a sessão automaticamente
      await signIn(email, password);
    } catch {
      setError("E-mail ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl tracking-wide">Painel Admin</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ink"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ink"
              required
            />
          </div>

          {/* Mensagem de erro só aparece se houver falha no login */}
          {error && <p className="text-xs text-destructive">{error}</p>}

          <button type="submit" disabled={loading} className="btn-gold mt-2 disabled:opacity-50">
            {loading ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
