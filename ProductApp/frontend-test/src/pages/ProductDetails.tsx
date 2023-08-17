import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import ReactQueryError from "../types/error";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ProductDetail() {
  const { id } = useParams();
  console.log(id);

  const { data, error, isError, isLoading } = useQuery(["product", id], () =>
    axios.get(`https://dummyjson.com/products/${id}`)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    const queryError = error as ReactQueryError;
    return <div>Error: {queryError.message}</div>;
  }

  console.log(data?.data);
  const product = data?.data;
  console.log(product);

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>+</button>
                <button onClick={() => zoomOut()}>-</button>
                <button onClick={() => resetTransform()}>x</button>
              </div>
              <TransformComponent>
                <img src={product.images[0]} alt={product.images[0]} />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
    </div>
  );
}

export default ProductDetail;
