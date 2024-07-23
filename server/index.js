const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Connect = require("./src/config/Connection");
const routes = require("./src/routes/route");
const coockieParser = require("cookie-parser");
const app = express();
const path = require("path");
const port = process.env.PORT;
const mongoose = require("mongoose");
app.use(coockieParser());
app.use(express.json());

// Konfigurasi CORS
const corsOptions = {
  origin: ["localhost:4000", "https://stmikaelsemarangindah.site/"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Tambahkan middleware CORS dengan konfigurasi yang telah ditentukan
app.use(cors(corsOptions));
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));
app.use("/blog", express.static(path.join(__dirname, "blog")));
app.use("/event", express.static(path.join(__dirname, "event")));
app.use("/profile", express.static(path.join(__dirname, "profile")));
app.use("/pengumuman", express.static(path.join(__dirname, "pengumuman")));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use("/", routes);

// Endpoints untuk tes koneksi
app.get("/", (req, res) => {
  res.json("🦄");
});

// Koneksi database
Connect();

app.listen(port, () => {
  console.log(`Server berjalan pada port ${port}`);
});
