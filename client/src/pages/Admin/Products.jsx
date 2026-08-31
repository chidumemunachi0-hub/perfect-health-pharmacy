import { useState, useEffect } from "react";
import "./Products.css";
import API from "../../../api/productApi";
import AddProductModal from "../../components/AddProductModal/AddProductModal";
function Products() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const deleteProduct = async (id) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
    
      if (!confirmDelete) return;
    
      try {
        await API.delete(`/products/${id}`);
    
        fetchProducts();
    
        alert("Product deleted successfully.");
      } catch (error) {
        console.log(error);
        alert("Failed to delete product.");
      }
    };

    useEffect(() => {
      fetchProducts();
    }, []);
    
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  return (

      

<div className="dashboard-content">
        <div className="page-header">
          <h1>Products</h1>

          <button
  className="add-product-btn"
  onClick={() => setIsModalOpen(true)}
>
  + Add Product
</button>
<AddProductModal
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setEditingProduct(null);
  }}
  editingProduct={editingProduct}
  fetchProducts={fetchProducts}
/>
        </div>

        <table className="products-table">

          <thead>

            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>
  {products.map((product) => (
    <tr key={product._id}>
      <td>
      {product.image ? (
  <img
    src={product.image}
    alt={product.name}
    width="80"
  />
) : (
  <div className="no-image">
    No Image
  </div>
)}
      </td>

      <td>{product.name}</td>

      <td>{product.category}</td>

      <td>₦{product.price.toLocaleString()}</td>

      <td>{product.stock}</td>

      <td>
        <button
          className="edit-btn"
          onClick={() => {
            setEditingProduct(product);
            setIsModalOpen(true);
          }}
        >
          Edit
        </button>

        <button
  className="delete-btn"
  onClick={() => deleteProduct(product._id)}
>
  Delete
</button>
      </td>
    </tr>
  ))}
</tbody>
        </table>

        </div>
  );
}

export default Products;