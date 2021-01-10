import React from "react";
import Button from "./Button.js";
import { action } from "mobx";

export default function ProductDetailInfo({ product, store }) {
  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={action(() => store.productAdd(product))}>
        ${product.price}
      </Button>
    </>
  );
}
