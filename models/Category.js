import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

export default mongoose.model("Category", categoriesSchema);
