import { notFound } from "next/navigation";
import { fallbackProducts, getProduct } from "@/lib/api";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return fallbackProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container-wrap py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="card p-8">
          <div className="aspect-[4/3] rounded-xl border border-white/10 bg-black/30" />
        </div>
        <div className="card p-8">
          <p className="text-sm uppercase tracking-wide text-zinc-400">{product.category}</p>
          <h1 className="mt-2 text-3xl font-black">{product.name}</h1>
          <p className="mt-4 text-zinc-300">
            {product.description} Это решение подходит компаниям, которым важно быстро масштабировать процессы без потери качества.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <p className="text-3xl font-bold">{product.price.toLocaleString("ru-RU")} ₽</p>
            {product.oldPrice ? <p className="text-lg text-zinc-500 line-through">{product.oldPrice.toLocaleString("ru-RU")} ₽</p> : null}
          </div>
          <div className="mt-8 flex gap-3">
            <button className="btn-primary">В корзину</button>
            <button className="btn-secondary">Запросить КП</button>
          </div>
          <div className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
            <p>Гарантия 24 месяца и официальное сервисное обслуживание.</p>
            <p>Поставка по Европе за 1-4 рабочих дня.</p>
            <p>Персональный менеджер и обучение вашей команды.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
