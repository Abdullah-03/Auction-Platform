import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  listPrice: { type: Number, required: true },
  listDuration: { type: Number }, //how long should the listing be live for? empty means it isnt a timed bid
  images: [{ type: String, required: true }], // atleast one image required || we will use a storage solution to store images and store urls in mongodb
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SellerModel",
    required: true,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BidModel",
    },
  ],
});

export default mongoose.model("ItemModel", itemSchema);
