import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/70">
      <div className="container-wrap grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold">NOVA TRADE</p>
          <p className="mt-2 text-sm text-zinc-400">
            Помогаем компаниям увеличивать маржинальность за счет продуманного ассортимента, автоматизации и сильного сервиса.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Разделы</p>
          <div className="mt-3 grid gap-2 text-sm text-zinc-400">
            <Link href="/catalog">Каталог</Link>
            <Link href="/news">Новости</Link>
            <Link href="/promotions">Акции</Link>
            <Link href="/policies">Документы</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-300">Контакты</p>
          <p className="mt-3 text-sm text-zinc-400">+49 30 123 45 67</p>
          <p className="text-sm text-zinc-400">sales@novatrade.example</p>
          <p className="text-sm text-zinc-400">Пн-Пт: 09:00-19:00</p>
        </div>
      </div>
    </footer>
  );
}