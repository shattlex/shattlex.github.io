import { Router } from "express";
import { z } from "zod";
import { runQuery } from "../db/pool";

const router = Router();

const querySchema = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["price_asc", "price_desc", "rating_desc"]).optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(50).optional()
});

router.get("/", async (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  const { category, q, sort, page = 1, limit = 12 } = parsed.data;
  const offset = (page - 1) * limit;

  const params: unknown[] = [];
  const where: string[] = [];

  if (category) {
    params.push(category);
    where.push(`category = $${params.length}`);
  }

  if (q) {
    params.push(`%${q}%`);
    where.push(`(name ilike $${params.length} or description ilike $${params.length})`);
  }

  let orderBy = "created_at desc";
  if (sort === "price_asc") orderBy = "price asc";
  if (sort === "price_desc") orderBy = "price desc";
  if (sort === "rating_desc") orderBy = "rating desc";

  params.push(limit, offset);

  const whereSql = where.length ? `where ${where.join(" and ")}` : "";
  const sql = `select id, slug, name, category, description, price, old_price as \"oldPrice\", rating from products ${whereSql} order by ${orderBy} limit $${params.length - 1} offset $${params.length}`;

  const rows = await runQuery(sql, params);
  res.json(rows);
});

router.get("/:slug", async (req, res) => {
  const rows = await runQuery(
    "select id, slug, name, category, description, price, old_price as \"oldPrice\", rating from products where slug = $1",
    [req.params.slug]
  );

  if (rows.length === 0) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(rows[0]);
});

export default router;

