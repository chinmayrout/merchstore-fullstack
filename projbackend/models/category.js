const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    }
  },
  { timestamps: true }
); //used to record time for entry
//updates when the schema is inserted; https://mongoosejs.com/docs/guide.html#timestamps

module.exports = mongoose.model("Category", categorySchema);
