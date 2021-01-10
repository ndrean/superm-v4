import React, { useState, useEffect, Suspense, lazy } from "react";
import {
  NavLink,
  Switch,
  Route,
  useParams,
  useRouteMatch,
} from "react-router-dom";
const LazyProductDetailInfo = lazy(() => import("./ProductDetailInfo.js"));
const LazyProductDetailNutrition = lazy(() =>
  import("./ProductDetailNutrition.js")
);
const LazyProductDetailStorage = lazy(() =>
  import("./ProductDetailStorage.js")
);

const baseURL = "https://react-tutorial-demo.firebaseio.com/";

export default function ProductDetails({ store }) {
  const [product, setProduct] = useState({});
  const params = useParams();
  const match = useRouteMatch();

  useEffect(() => {
    fetch(baseURL + `productinfo/id${params.id}.json`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.log("Could not load product details", error));
  }, [params.id]);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/nutrition"}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + "/storage"}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<span>Loading</span>}>
          <Switch>
            <Route exact path={match.path}>
              <LazyProductDetailInfo store={store} product={product} />
            </Route>

            <Route path={match.path + "/nutrition"}>
              <LazyProductDetailNutrition nutrition={product.nutrition} />
            </Route>

            <Route path={match.path + "/storage"}>
              <LazyProductDetailStorage storage={product.storage} />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}
