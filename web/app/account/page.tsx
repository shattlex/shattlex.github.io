"use client";

import { FormEvent, useMemo, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type User = { id: number; name: string; email: string; role: string };

export default function AccountPage() {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState<string>("");

  const buttonText = useMemo(() => (mode === "login" ? "Войти в кабинет" : "Создать личный кабинет"), [mode]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      name: String(formData.get("name") ?? "")
    };

    const response = await fetch(`${API_URL}/auth/${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      setStatus("Ошибка авторизации. Проверьте данные и повторите попытку.");
      return;
    }

    const data = await response.json();
    setToken(data.token);
    setStatus("Готово. Токен получен, можно загружать профиль.");
  }

  async function loadProfile() {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      setStatus("Токен недействителен или истек.");
      return;
    }
    const data = await response.json();
    setUser(data.user);
  }

  return (
    <div className="container-wrap py-10 sm:py-14">
      <h1 className="text-3xl font-black sm:text-4xl">Личный кабинет</h1>
      <p className="mt-2 max-w-2xl text-zinc-400">Управляйте профилем, заявками и историей взаимодействий в одном месте.</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <form className="card p-6" onSubmit={onSubmit}>
          <div className="mb-4 flex gap-2">
            <button type="button" className={mode === "login" ? "btn-primary w-full" : "btn-secondary w-full"} onClick={() => setMode("login")}>Вход</button>
            <button type="button" className={mode === "register" ? "btn-primary w-full" : "btn-secondary w-full"} onClick={() => setMode("register")}>Регистрация</button>
          </div>
          <div className="grid gap-3">
            {mode === "register" ? <input name="name" required placeholder="Ваше имя" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" /> : null}
            <input name="email" type="email" required placeholder="Рабочий email" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" />
            <input name="password" type="password" required placeholder="Пароль" className="rounded-xl border border-white/15 bg-black/30 px-4 py-3" />
            <button className="btn-primary" type="submit">{buttonText}</button>
          </div>
        </form>

        <div className="card p-6">
          <p className="text-sm text-zinc-400">JWT token</p>
          <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 p-3 text-xs" />
          <button className="btn-secondary mt-3" onClick={loadProfile}>Загрузить профиль</button>
          {status ? <p className="mt-3 text-sm text-zinc-400">{status}</p> : null}
          {user ? (
            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-300">
              <p>ID: {user.id}</p>
              <p>Имя: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Роль: {user.role}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}