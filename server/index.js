const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const dbURI =
    "mongodb+srv://brsilva181:Hakushaku12345@capstone.rsht6.mongodb.net/capstone?retryWrites=true&w=majority";
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) =>
        app.listen(port, () => {
            console.log(`App is running on port ${port}`);
        })
    )
    .catch((err) => console.log(err));

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

const drinkRoute = require("./routes/cocktails");

app.use("/api/drinks", drinkRoute);
