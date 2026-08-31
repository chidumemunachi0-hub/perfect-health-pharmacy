import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const createProduct = async (req, res) => {
  try {
    console.log("FILE:", req.file);

    let imageUrl = "";

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "perfect-health-pharmacy",
          },
          (error, result) => {
            if (error) {
              console.log("CLOUDINARY ERROR:", error);
              reject(error);
            } else {
              console.log("CLOUDINARY RESULT:", result.secure_url);
              resolve(result.secure_url);
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });
    }

    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
      image: imageUrl,
    });

    console.log("SAVED PRODUCT:", product);

    res.status(201).json(product);

  } catch (error) {
    console.log("CREATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    console.log("UPDATE FILE:", req.file);

    const updateData = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      description: req.body.description,
    };

    // Only upload if a new image was selected
    if (req.file) {
      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "perfect-health-pharmacy",
          },
          (error, result) => {
            if (error) {
              console.log("CLOUDINARY ERROR:", error);
              reject(error);
            } else {
              console.log(
                "NEW CLOUDINARY IMAGE:",
                result.secure_url
              );

              resolve(result.secure_url);
            }
          }
        );

        streamifier
          .createReadStream(req.file.buffer)
          .pipe(stream);
      });

      updateData.image = imageUrl;
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    console.log("UPDATED PRODUCT:", updatedProduct);

    res.status(200).json(updatedProduct);

  } catch (error) {
    console.log("UPDATE PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// =========================
// GET ALL PRODUCTS
// =========================

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// =========================
// GET SINGLE PRODUCT
// =========================

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};





// =========================
// DELETE PRODUCT
// =========================

export const deleteProduct = async (req, res) => {
  try {

    const deletedProduct =
      await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};