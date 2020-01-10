const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 27017;

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("mongo db connection established successfully");
});

const contactsRouter = require('./routes/contacts');

app.use('/contacts', contactsRouter);

app.listen(port, () => {
    console.log(`port is running on port: ${port}`);
})