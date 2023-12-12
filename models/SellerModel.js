import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemModel" }],
});

export default mongoose.model("SellerModel", sellerSchema);
