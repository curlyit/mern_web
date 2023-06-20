const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require("mongoose-delete");

const PostSchema = new Schema(
  {
    tittle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Accessory", "Clothes", "Jewelry", "Other"],
    },
    like: {
      type: Number,
    },
    purchase: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

PostSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

module.exports = mongoose.model("posts", PostSchema);
