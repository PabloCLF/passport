import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsSchema = new mongoose.Schema({
    code: {
        type: String,
        index: true,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        default: 0,
    },
    status: {
        type: String
    },
    category: {
        type: String
    },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("Products", productsSchema);