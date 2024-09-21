const express = require("express");




const app = express();
require("dotenv").config();
const cookieParser=require("cookie-parser");
// middleware
app.use(express.json());
app.use(cookieParser());

//  routes
// app.use("/api/users", UserRoute);

//Home
app.get("/", (req, res) => {
  res.send("hello from library ");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
