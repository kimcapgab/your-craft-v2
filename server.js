import db from "./db/connection.js";
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import logger from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.use("/api", routes);

app.use(logger("dev"));

db.on("connected", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () =>
    process.env.NODE_ENV === "production"
      ? console.log(`express server running in production on port ${PORT}`)
      : console.log(
          `express server running in development on: http://localhost:${PORT}`
        )
  );
});
