import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  price: { type: Number, required: true },
});

export default mongoose.model("BidModel", bidSchema);
