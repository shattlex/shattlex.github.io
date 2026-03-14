import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { runQuery } from "../db/pool";
import { AuthRequest, authRequired, createToken } from "../middleware/auth";

const router = Router();

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2).optional()
});

router.post("/register", async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  const { email, password, name } = parsed.data;
  const existing = await runQuery<{ id: number }>("select id from users where email = $1", [email]);
  if (existing.length > 0) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const users = await runQuery<{ id: number; email: string; role: string }>(
    "insert into users(name, email, password_hash) values($1,$2,$3) returning id, email, role",
    [name ?? "Новый пользователь", email, passwordHash]
  );

  const user = users[0];
  res.status(201).json({ token: createToken(user), user });
});

router.post("/login", async (req, res) => {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  const { email, password } = parsed.data;
  const users = await runQuery<{ id: number; email: string; role: string; name: string; password_hash: string }>(
    "select id, name, email, role, password_hash from users where email = $1",
    [email]
  );

  const user = users[0];
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const passwordOk = await bcrypt.compare(password, user.password_hash);
  if (!passwordOk) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const tokenPayload = { id: user.id, email: user.email, role: user.role };
  res.json({ token: createToken(tokenPayload), user: tokenPayload });
});

router.get("/me", authRequired, async (req: AuthRequest, res) => {
  const user = req.user;
  if (!user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const rows = await runQuery<{ id: number; name: string; email: string; role: string }>(
    "select id, name, email, role from users where id = $1",
    [user.id]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ user: rows[0] });
});

router.get("/oauth/:provider", (req, res) => {
  res.json({
    message: "OAuth flow placeholder",
    provider: req.params.provider,
    nextStep: "Configure provider client id/secret and callback URL"
  });
});

export default router;

