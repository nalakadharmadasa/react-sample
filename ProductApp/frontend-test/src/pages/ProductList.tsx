import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ReactQueryError from "../types/error";

function ProductList() {
  const [category, setCategory] = useState("");
  const { data, error, isError, isLoading } = useQuery("products", () =>
    axios.get("https://dummyjson.com/products")
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    const queryError = error as ReactQueryError;
    return <div>Error: {queryError.message}</div>;
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const products = data?.data.products;

  console.log(products);

  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-center p-6 mt-10">
          Product List
        </h1>
        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        <ul>
          {products.map((product: any) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
