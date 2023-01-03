import Product from "../models/Product";
export const createItemOnMenu = async (req, res) => {
  try {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product({ name, category, price, imgUrl });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
export const getAllMenu = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
export const getItemFromMenuById = async (req, res) => {
  try {
    console.log(req.params.productId);
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
export const updateItemIntoMenu = (req, res) => {};
export const deleteItemMenu = (req, res) => {};
