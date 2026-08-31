import Category from "../models/Category.js";

// GET ALL CATEGORIES
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.log("GET CATEGORIES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};


// CREATE CATEGORY
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || "",
    });

    res.status(201).json(category);
  } catch (error) {
    console.log("CREATE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Failed to create category",
    });
  }
};


// UPDATE CATEGORY
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name?.trim(),
        description: description || "",
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.log("UPDATE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Failed to update category",
    });
  }
};


// DELETE CATEGORY
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(
      req.params.id
    );

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("DELETE CATEGORY ERROR:", error);

    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};