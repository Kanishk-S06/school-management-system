const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json({ limit: "10mb" }));

// ✅ Secure CORS Setup — allow only your frontend
app.use(cors({
  origin: 'https://school-management-system-seven-black.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB DataBase"))
  .catch((err) => console.log("💥 NOT CONNECTED TO NETWORK : ", err));

app.use("/", Routes);

app.listen(PORT, () => {
  console.log(`✅ Server started at port no. ${PORT}`);
});
