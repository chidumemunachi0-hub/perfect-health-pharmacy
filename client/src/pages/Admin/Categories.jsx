import { useEffect, useState } from "react";
import API from "../../../api/productApi";
import "./Categories.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log("FETCH CATEGORIES ERROR:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a category name.");
      return;
    }

    try {
      if (editingId) {
        await API.put(`/categories/${editingId}`, {
          name,
          description,
        });

        alert("Category updated successfully.");
      } else {
        await API.post("/categories", {
          name,
          description,
        });

        alert("Category added successfully.");
      }

      setName("");
      setDescription("");
      setEditingId(null);

      fetchCategories();

    } catch (error) {
      console.log("CATEGORY ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Failed to save category."
      );
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setName(category.name);
    setDescription(category.description || "");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/categories/${id}`);

      fetchCategories();

    } catch (error) {
      console.log("DELETE CATEGORY ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete category."
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  return (
    <div className="categories-page">

<div className="categories-header">        <h1>Categories</h1>
        <p>Manage your product categories.</p>
      </div>


      {/* FORM */}

      <div className="category-form-card">

        <h2>
          {editingId
            ? "Edit Category"
            : "Add New Category"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <textarea
            placeholder="Category description (optional)"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <div className="category-form-buttons">

            <button type="submit">
              {editingId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>


      {/* CATEGORY LIST */}

      <div className="categories-card">

        <h2>All Categories</h2>

        {categories.length === 0 ? (

          <p className="empty-category">
            No categories found.
          </p>

        ) : (

          <div className="categories-list">

            {categories.map((category) => (

              <div
                className="category-item"
                key={category._id}
              >

                <div className="category-info">

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description ||
                      "No description"}
                  </p>

                </div>


                <div className="category-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(category)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(category._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Categories;