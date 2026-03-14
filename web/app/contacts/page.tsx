"use client";

import { FormEvent, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export default function ContactsPage() {
  const [status, setStatus] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message")
    };

    const response = await fetch(`${API_URL}/forms/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setStatus(response.ok ? "Спасибо! Ваша заявка принята, менеджер свяжется с вами в ближайшее время." : "Не удалось отправить форму. Попробуйте еще раз.");
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">Контакты</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6 text-zinc-300">
          <p>Телефон: +49 30 123 45 67</p>
          <p className="mt-2">Email: sales@novatrade.example</p>
          <p className="mt-2">Адрес: Berlin, Friedrichstrasse 1</p>
          <p className="mt-4 text-sm text-zinc-400">Оставьте заявку - подготовим персональный расчет и дорожную карту внедрения.</p>
        </div>
        <form className="card p-6" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <input name="name" required placeholder="Ваше имя" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" />
            <input name="email" type="email" required placeholder="Рабочий email" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" />
            <textarea name="message" required placeholder="Кратко опишите задачу" rows={4} className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" />
            <button className="btn-primary" type="submit">Отправить заявку</button>
            {status ? <p className="text-sm text-zinc-400">{status}</p> : null}
          </div>
        </form>
      </div>
    </div>
  );
}