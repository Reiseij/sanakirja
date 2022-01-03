const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SanaSchema = new Schema({
  suomi: { type: String, required: true },
  englanti: { type: String, required: true },
});

module.exports = Sana = mongoose.model("Sana", SanaSchema);
