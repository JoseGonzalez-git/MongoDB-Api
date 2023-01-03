import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    category: String,
    price: Number,
    imgUrl: String,
},{
    timestamps:true,
    versionKey:false
});

export default model('Product', productSchema)