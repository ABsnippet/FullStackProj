const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();

// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log(error));

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// ROUTES
app.use("/api/auth", require("./routes/tempauth.js"));
app.use("/api/notes", require("./routes/tempnote.js"));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Notes API Running");
});

// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});