require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbconn");
const app = express();
const PORT = process.env.PORT || 4444;

connectDB();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.send("hello root page");
});

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
})


