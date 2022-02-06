const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/planDB", {
    useNewUrlParser: true
}).then(() => {
    console.log("MongoDB Started !!");
}).catch(e => {
    console.log("Error: " + e);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", require("./routes/planRoute"));

app.listen(3000, () => console.log("Server started at PORT: 3000 !!"));