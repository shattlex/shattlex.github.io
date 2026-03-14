import Link from "next/link";
import { CatalogPreview } from "@/components/catalog-preview";

export default function HomePage() {
  return (
    <div>
      <section className="container-wrap py-14 sm:py-24">
        <div className="card overflow-hidden p-8 sm:p-12">
          <p className="mb-5 inline-block rounded-full border border-accent/40 bg-accent/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-red-200">
            Премиальный сервис для B2B
          </p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
            Современные решения <span className="text-accent">для роста продаж и прибыли</span>
          </h1>
          <p className="mt-5 max-w-2xl text-zinc-300">
            Мы берем на себя ключевые этапы: аудит, подбор решений, внедрение и сопровождение. Вы получаете понятный план,
            прогнозируемый результат и команду, которая отвечает за цифры.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catalog" className="btn-primary">
              Подобрать решение
            </Link>
            <Link href="/contacts" className="btn-secondary">
              Получить коммерческое предложение
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-sm text-zinc-400">Реализованных проектов</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-sm text-zinc-400">Клиентов продлевают сотрудничество</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-zinc-400">Техническая и сервисная поддержка</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wrap pb-16">
        <h2 className="mb-6 text-2xl font-bold sm:text-3xl">Хиты каталога</h2>
        <CatalogPreview />
      </section>

      <section className="container-wrap pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Логистика и доставка",
            "Интеграция с CRM",
            "SEO и контент",
            "Сервисное сопровождение"
          ].map((item) => (
            <div key={item} className="card p-5">
              <h3 className="font-semibold">{item}</h3>
              <p className="mt-2 text-sm text-zinc-400">
                Каждое направление настроено на одну цель: стабильно увеличивать конверсию, средний чек и повторные продажи.
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}