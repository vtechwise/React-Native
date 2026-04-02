import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// create a sql connection using ur DB url
export const sql = neon(process.env.DATABASE_URL);
