import { Schema,model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: String,
    price: Number,
    imgUrl: String,
},{
    timestamps:true,
    versionKey:false
});

export default model('Product', productSchema)