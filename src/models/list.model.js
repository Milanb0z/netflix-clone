const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: { required: true, type: String, unique: true },
    type: { type: String },
    genre: { type: String },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);

module.exports = List;
