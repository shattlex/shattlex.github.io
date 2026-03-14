import Link from "next/link";
import { getProducts } from "@/lib/api";

export async function CatalogPreview() {
  const products = await getProducts();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.slice(0, 3).map((item) => (
        <article key={item.id} className="card p-5 transition hover:border-accent/50">
          <p className="text-xs uppercase tracking-wide text-zinc-400">{item.category}</p>
          <h3 className="mt-2 text-xl font-semibold">{item.name}</h3>
          <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
          <p className="mt-4 text-2xl font-bold">{item.price.toLocaleString("ru-RU")} ₽</p>
          <Link href={`/catalog/${item.slug}`} className="btn-secondary mt-4 w-full">
            Посмотреть условия
          </Link>
        </article>
      ))}
    </div>
  );
}