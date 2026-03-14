import { Router } from "express";
import { z } from "zod";
import { runQuery } from "../db/pool";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5)
});

router.post("/contact", async (req, res) => {
  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid payload" });
    return;
  }

  const { name, email, message } = parsed.data;
  await runQuery(
    "insert into leads(name, email, message, source) values($1,$2,$3,$4)",
    [name, email, message, "contact_form"]
  );

  res.status(201).json({ message: "Lead stored" });
});

export default router;

