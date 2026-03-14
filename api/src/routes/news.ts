import { Router } from "express";
import { runQuery } from "../db/pool";

const router = Router();

router.get("/", async (_req, res) => {
  const rows = await runQuery(
    "select id, title, summary, to_char(published_at, 'YYYY-MM-DD') as \"publishedAt\" from news order by published_at desc"
  );
  res.json(rows);
});

export default router;

