/** @format */

import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3002/api/stripe/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`); 
  };

  return (
    <div className="product-container">
      <div className="products">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <h3>{product.name}</h3>
            <img
              className="product-img "
              src={product.images[0]}
              alt={product.name}
            />
            <p>{product.description}</p>
            <p>
              Price:{" "}
              {(product.default_price.unit_amount_decimal / 100).toFixed(2)}kr
            </p>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
