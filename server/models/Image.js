const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const ImageSchema = new Schema({
  originalName: String,
  fileName: String,
  filePath: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "posts",
  },
  url: String,
});

ImageSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model("images", ImageSchema);
