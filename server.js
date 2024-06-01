import app from "./api/index.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running! 🚀");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}!!!`);
});
