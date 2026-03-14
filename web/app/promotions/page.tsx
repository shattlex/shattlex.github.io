export default function PromotionsPage() {
  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">Акции и спецусловия</h1>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {[
          "Скидка 20% на монтаж до конца месяца",
          "Бесплатный аудит процессов при заказе от 30 000 ₽"
        ].map((item) => (
          <div key={item} className="card p-6">
            <h2 className="text-xl font-semibold text-red-300">{item}</h2>
            <p className="mt-2 text-zinc-400">
              Оставьте заявку, и менеджер зафиксирует условия, рассчитает экономику и предложит оптимальный сценарий запуска.
            </p>
            <button className="btn-primary mt-4">Получить предложение</button>
          </div>
        ))}
      </div>
    </div>
  );
}