import express from "express";
import dotEnv from "dotenv";
import { sql } from "./config/db.js";
import rateLlimiter from "./middlewares/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";

dotEnv.config();

const app = express();

const Port = process.env.PORT || 5001;

// middlewar is a function that runs between the request and response
app.use(express.json());
app.use(rateLlimiter);

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

app.use("/api/transactions", transactionsRoute);

initDB().then(() => {
  app.listen(Port, () => {
    console.log("server is running on port 5001");
  });
});
