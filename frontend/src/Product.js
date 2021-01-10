import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import Button from "./Button.js";
import { action, runInAction } from "mobx";

const Product = observer((props) => {
  const { details, store } = props;

  const quantity = store.findQuantityById(details.id) || 0;

  React.useEffect(() => {
    runInAction(() => store.cartToLS());
  }, [store, store.cart]);

  return (
    <div className="product">
      <div className="product-image-container">
        <Link to={`/products/${details.id}`}>
          <img
            src={details.image}
            width="100"
            height="100"
            className="product-image"
            alt={details.name}
          />
        </Link>
        {quantity > 0 && (
          <div className="product-quantity-container">
            <div className="product-quantity">{quantity}</div>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3>{details.name}</h3>
        <p>{details.description}</p>
      </div>
      <div className="product-checkout">
        <div>
          {quantity > 0 && (
            <Button
              outline
              onClick={action(() => store.productDelete(details.id))}
              className="product-delete"
            >
              x
            </Button>
          )}
        </div>
        <Button outline onClick={action(() => store.productAdd(details))}>
          ${details.price}
        </Button>
      </div>
    </div>
  );
});

export default Product;
