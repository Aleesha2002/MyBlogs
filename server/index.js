const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const auth_middleware = require("./middleware/auth_middleware");

app.use(express.json());
app.use(cors());

app.use("/images", express.static(path.join(__dirname, "/images")));
// mongoose
//   .connect(
//     "mongodb+srv://Aleesha2002:Aleesha2002@cluster0.yssmslr.mongodb.net/blog?retryWrites=true&w=majority"
//   )
//   .then(console.log("connected to mponogodb"))
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Connected to Mongodb"))
  .catch((err) => console.log(err));

mongoose.set("strictQuery", true);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.filename);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   res.status(200).json("File has been uploaded");
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/category", categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running");
});
