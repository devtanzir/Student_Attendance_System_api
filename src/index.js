import router from "./routes/index.js";
import Express from "express";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./env",
});

const app = Express();

app.use(router);
app.use(Express.json());
app.use((err, _req, res, _next) => {
  console.log(err);
  const message = err.message ? err.message : "server error Occurred";
  const status = err.status ? err.status : 500;

  res.status(status).json({ message });
});
const PORT = process.env.PORT || 6000;
connectDB();
app.listen(PORT, () => {
  console.log(`\n Server Listening ! ! On PORT ${PORT}`);
});
