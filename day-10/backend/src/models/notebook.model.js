const mongoose  = require("mongoose");

const notebookSchema = mongoose.Schema({
    title : String,
    description : String
})

const notebookModel = mongoose.model('notebooks',notebookSchema)

module.exports = notebookModel