const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/dbConfig");
const userRoute = require('./User/UserRoute');
const ProductsRoute = require('./Products/ProductsRoute')
connectDB()
const app = express();
require("dotenv").config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Home route
app.get("/", (req, res) => {
  res.send("hello Developer");
});

//Routes
app.use('/api/users',userRoute);
// Server listening

app.use('/api' , ProductsRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
