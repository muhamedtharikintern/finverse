import dotenv from "dotenv";
import app from "./app.js";
import { connectToDatabase } from "./db.js";

dotenv.config();

const port = parseInt(process.env.PORT || "4000", 10);

async function start() {
  try {
    await connectToDatabase(process.env.MONGODB_URI);
    app.listen(port, "0.0.0.0", () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}


  start();


export default app;