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

app.use("/api/todos", require("./routes/todosRoute"))
app.use("/api/users", require("./routes/usersRoute"))
app.use("/api/posts", require("./routes/postsRoute"))
app.use("/api/photos", require("./routes/photosRoute"))

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log("----------DB error----------")
    console.log(err)
})


