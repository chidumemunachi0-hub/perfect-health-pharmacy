import { useState, useEffect } from "react";
import "./AddProductModal.css";
import API from "../../../api/productApi";

function AddProductModal({
  isOpen,
  onClose,
  fetchProducts,
  editingProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  // Load product information when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        category: editingProduct.category || "",
        price: editingProduct.price || "",
        stock: editingProduct.stock || "",
        description: editingProduct.description || "",
        image: null,
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: null,
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);

    // Only add image if the user selected a new one
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingProduct) {
        // EDIT EXISTING PRODUCT
        await API.put(
          `/products/${editingProduct._id}`,
          data
        );

        alert("Product updated successfully.");
      } else {
        // ADD NEW PRODUCT
        await API.post("/products", data);

        alert("Product added successfully.");
      }

      await fetchProducts();

      onClose();

      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        image: null,
      });

    } catch (error) {
      console.log(error);
      alert("Failed to save product.");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              setFormData({
                ...formData,
                image: e.target.files[0],
              })
            }
          />

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Category
            </option>

            <option value="Pharmacy">
              Pharmacy
            </option>

            <option value="Baby Care">
              Baby Care
            </option>

            <option value="Supermarket">
              Supermarket
            </option>
            <option value="Beauty">
              Beauty
            </option>
            <option value="Personal Care">
              Personal Care
            </option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">
            {editingProduct
              ? "Save Changes"
              : "Save Product"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProductModal;