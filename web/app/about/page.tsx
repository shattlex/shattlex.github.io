export default function AboutPage() {
  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">О компании</h1>
      <p className="mt-3 max-w-2xl text-zinc-400">
        NOVA TRADE - команда с фокусом на коммерческий результат. Мы выстраиваем решения так, чтобы ваши вложения окупались быстрее,
        а рост был предсказуемым.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {[
          "10+ лет в B2B-сегменте",
          "Сильная отраслевая экспертиза",
          "Прозрачная аналитика и KPI"
        ].map((item) => (
          <div key={item} className="card p-6">
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Каждый этап фиксируем в понятных метриках: сроки, стоимость, конверсия и влияние на прибыль.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}