import express from "express";
import dotEnv from "dotenv";
import { sql } from "./config/db.js";

dotEnv.config();

const app = express();

const Port = process.env.PORT || 5001;

// middlewar is a function that runs between the request and response
app.use(express.json());

async function initDB() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS transactions(
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT CURRENT_DATE 
       )`;
    console.log("Database initialized successfully");
  } catch (error) {
    console.log("error initializing DB", error);
    process.exit(1);
  }
}

app.get("/api/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    return res.status(200).json(transactions);
  } catch (error) {
    console.log("error getting transactions", error);
    res.status(500).json({ message: "internal server error" });
  }
});

app.post("/api/transactions", async (req, res) => {
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

    res.status(201).json({ message: "transactions created successfully " });
  } catch (error) {
    console.log("Error creating transactions", error);
    res.status(500).json(transaction[0]);
  }
});

app.delete("/api/transaction/:id", async (req, res) => {
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
initDB().then(() => {
  app.listen(Port, () => {
    console.log("server is running on port 5001");
  });
});
