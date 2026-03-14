export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
};

export type NewsItem = {
  id: number;
  title: string;
  summary: string;
  publishedAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function fetchFromApi<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!response.ok) {
      return fallback;
    }
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const fallbackProducts: Product[] = [
  {
    id: 1,
    slug: "linea-x1",
    name: "LINEA X1",
    category: "Оборудование",
    description: "Производительная система для роста скорости отгрузки и снижения операционных затрат.",
    price: 129900,
    oldPrice: 144900,
    rating: 4.9
  },
  {
    id: 2,
    slug: "nova-pack-pro",
    name: "NOVA PACK PRO",
    category: "Упаковка",
    description: "Автоматизация упаковки: меньше ручного труда, выше стабильность качества.",
    price: 89900,
    rating: 4.8
  },
  {
    id: 3,
    slug: "scale-control-7",
    name: "SCALE CONTROL 7",
    category: "Контроль качества",
    description: "Точный контроль параметров продукции и снижение доли возвратов.",
    price: 56900,
    rating: 4.7
  }
];

export async function getProducts(): Promise<Product[]> {
  return fetchFromApi<Product[]>("/catalog", fallbackProducts);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const fallback = fallbackProducts.find((item) => item.slug === slug) ?? null;
  return fetchFromApi<Product | null>(`/catalog/${slug}`, fallback);
}

export async function getNews(): Promise<NewsItem[]> {
  return fetchFromApi<NewsItem[]>("/news", [
    {
      id: 1,
      title: "Запустили обновленную линейку решений для B2B",
      summary: "Ускорили внедрение и добавили расширенную гарантию, чтобы вы быстрее получили результат.",
      publishedAt: "2026-03-10"
    }
  ]);
}