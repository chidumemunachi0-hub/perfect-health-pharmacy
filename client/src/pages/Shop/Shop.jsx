import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import "./Shop.css";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import ProductCard from "../../components/ProductCard/ProductCard";

import API from "../../../api/productApi";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );
  const [sort, setSort] = useState("default");

  const selectedCategory =
    searchParams.get("category") || "All";

  const [category, setCategory] =
    useState(selectedCategory);

  // Update category when URL changes
  useEffect(() => {
    setCategory(selectedCategory);
  
    setSearch(
      searchParams.get("search") || ""
    );
  }, [selectedCategory, searchParams]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");

      console.log(
        "PRODUCT IMAGES:",
        res.data.map((product) => ({
          name: product.name,
          image: product.image,
        }))
      );

      setProducts(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Filter products
  let displayedProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" ||
      product.category === category;
  
    const searchText = search.toLowerCase().trim();
  
    const matchesSearch =
      product.name?.toLowerCase().includes(searchText) ||
      product.category?.toLowerCase().includes(searchText) ||
      product.description?.toLowerCase().includes(searchText);
  
    return matchesCategory && matchesSearch;
  });
  // Sort products
  if (sort === "low") {
    displayedProducts.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    displayedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
      <NavBar />

      <section className="shop">

        <h1>Shop Products</h1>

        <div className="shop-controls">
        <input
  type="text"
  placeholder="Search products..."
  value={search}
  onChange={(e) => {
    const value = e.target.value;

    setSearch(value);

    setSearchParams((prev) => {
      if (value.trim()) {
        prev.set("search", value);
      } else {
        prev.delete("search");
      }

      return prev;
    });
  }}
/>

          <select
            value={category}
            onChange={(e) => {
              const value = e.target.value;
            
              setCategory(value);
            
              setSearchParams((prev) => {
                if (value === "All") {
                  prev.delete("category");
                } else {
                  prev.set("category", value);
                }
            
                return prev;
              });
            }}
          >
            <option value="All">
              All Categories
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

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="default">
              Sort
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>
          </select>

        </div>

        <div className="shop-grid">

          {displayedProducts.length === 0 ? (

            <h2 className="no-products">
              No products found.
            </h2>

          ) : (

            displayedProducts.map((product) => (

              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                description={product.description}
                category={product.category}
                stock={product.stock}
              />

            ))

          )}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Shop;