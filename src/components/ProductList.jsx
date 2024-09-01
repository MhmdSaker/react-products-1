import { useState, useEffect } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const apiUrl = `http://localhost:9000/products`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(product => product.category === selectedCategory);

  const prices = products.map(product => product.price)
  const maxPrice = Math.max(...prices)
  const minPrice = Math.min(...prices)

  return (
    <div>
      <div className="category-filter">
        <select onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
          <option value="all">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* <div className="price-filter">
        <label htmlFor="vol"> Prices between {maxPrice} and {minPrice}</label>
        <br />
        <input type="range" name="vol" min={minPrice} max={maxPrice}></input>

      </div> */}

      <div className="products">
        {filteredProducts.map((product) => (
          <Product key={product.id} productId={product.id} button={true} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
