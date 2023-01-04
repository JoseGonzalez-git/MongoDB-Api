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
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Data not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
export const updateItemIntoMenu = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ err: err });
    console.log(err);
  }
};
export const deleteItemMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id, req.body);
    res.status(200).json(deletedProduct);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
