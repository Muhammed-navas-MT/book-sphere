import dotenv from "dotenv";
dotenv.config();
console.log(process.env.PORT)
import { connectDB } from "./config/db.js";
import { App } from "./app.js";

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  await connectDB();
  const application = new App();

  application.app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
