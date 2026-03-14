import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "NOVA Trade - современные решения для роста продаж",
  description: "Каталог оборудования и услуг для бизнеса: быстрый запуск, прозрачные условия и сопровождение 24/7.",
  openGraph: {
    title: "NOVA Trade",
    description: "Надежные B2B-решения в современном формате: от подбора до внедрения"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}