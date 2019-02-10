// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this is our data base's data structure 
const QuestionSchema = new Schema({
    rows:[String],
    columns:[String]
});

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Question", QuestionSchema);