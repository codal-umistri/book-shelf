import express from "express";
import router from "./routes/routes";

const app = express();

app.use(express.json())
app.use("/api/v1",router);

app.listen(5000, () => {
  console.log(`Server is running on http://localhost:${5000}`);
});
