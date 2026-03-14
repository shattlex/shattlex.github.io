import Link from "next/link";

const links = [
  ["Главная", "/"],
  ["Каталог", "/catalog"],
  ["О компании", "/about"],
  ["Доставка и оплата", "/delivery"],
  ["Новости", "/news"],
  ["Акции", "/promotions"],
  ["Контакты", "/contacts"],
  ["Личный кабинет", "/account"]
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
      <div className="container-wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-black tracking-wide">
          <span className="text-white">NOVA</span> <span className="text-accent">TRADE</span>
        </Link>
        <nav className="hidden gap-4 text-sm text-zinc-300 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contacts" className="btn-primary px-4 py-2 text-xs">
          Получить расчет за 15 минут
        </Link>
      </div>
    </header>
  );
}