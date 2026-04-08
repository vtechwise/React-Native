import express from "express";
import { sql } from "../config/db";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    return res.status(200).json(transactions);
  } catch (error) {
    console.log("error getting transactions", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, user_id, amount, category } = req.body;
    if (!title || !user_id || !category || amount === undefined) {
      res.status(400).json({ message: "A;; fields are required" });
    }

    const transaction =
      await sql`INSERT INTO transactions(user_id, title, amount, category)
    VALUES (${user_id},${title},${amount},${category}) 
    RETURNING *

      `;

    res.status(201).json(transaction[0]);
  } catch (error) {
    console.log("Error creating transactions", error);
    res.status(500).json({ message: "internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "invalid transaction ID" });
    }
    const transaction =
      await sql`DELETE FROM transactions WHERE id=${id} RETURNING *`;
    if (transaction.length === 0) {
      return res.status(404).json({ message: "transaction not found" });
    }
    return res
      .status(200)
      .json({ message: "transaction deleted sucessfully " });
  } catch (error) {
    console.log("error deleting transaction", error);
    res.status(500).json({ messgae: "internal server error" });
  }
});

router.get("/summary/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount, 0)) as balance FROM transactions
         WHERE user_id = ${id}`;
    const incomeResult =
      await sql`SELECT COALESCE(SUM(amount, 0)) as income FROM transactions
        WHERE user_id = ${id} AND amount > 0 
        `;
    const expensesResult =
      await sql`SELECT COALESCE(SUM(amount, 0)) as expenses FROM transactions
        WHERE user_id = ${id} amount < 0
        `;
    return res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expenses: expensesResult[0].expenses,
    });
  } catch (error) {}
});

export default router;
