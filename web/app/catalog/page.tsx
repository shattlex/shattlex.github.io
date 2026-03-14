import { getProducts } from "@/lib/api";
import Link from "next/link";

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">Каталог решений</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Подбирайте оптимальный вариант под ваши KPI: снижение себестоимости, рост скорости производства и повышение качества.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((item) => (
          <article key={item.id} className="card p-5">
            <p className="text-xs text-zinc-400">{item.category}</p>
            <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
            <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xl font-bold text-white">{item.price.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-zinc-400">★ {item.rating}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link className="btn-primary w-full" href={`/catalog/${item.slug}`}>
                Подробнее
              </Link>
              <button className="btn-secondary w-full">Добавить в корзину</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}