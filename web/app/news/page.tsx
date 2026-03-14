import { getNews } from "@/lib/api";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">Новости компании</h1>
      <div className="mt-8 grid gap-4">
        {news.map((item) => (
          <article key={item.id} className="card p-6">
            <p className="text-xs uppercase text-zinc-400">{item.publishedAt}</p>
            <h2 className="mt-2 text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-zinc-400">{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}