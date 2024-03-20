import React, { useEffect, useState } from "react";
import axios from "axios";
import "./shopping-component.css";

export function ShoppingComponent() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  function LoadCategories() {
    axios
      .get("http://fakestoreapi.com/products/categories")
      .then((response) => {
        response.data.unshift("all");
        setCategories(response.data);
      });
  }

  function LoadProducts(url) {
    axios.get(url).then((response) => {
      setProducts(response.data);
    });
  }

  useEffect(() => {
    LoadCategories();
    LoadProducts("http://fakestoreapi.com/products");
  }, []);

  function handleCategoryChanged(e) {
    if (e.target.value === "all") {
      LoadProducts("http://fakestoreapi.com/products");
    } else {
      LoadProducts(`http://fakestoreapi.com/products/category/${e.target.value}`);
    }
    setCategory(e.target.value);
  }

  return (
    <div className="container-fluid">
      <header className="bg-dark text-white text-center p-2">
        <h2>
          <span className="bi bi-cart"></span> Shopping Cart
        </h2>
      </header>
      <section className="mt-3 row container-fluid">
        <nav className="col-2">
          <div id="label-1">
            <label className="form-label">Select Category</label>
            <div>
              <select onChange={handleCategoryChanged} className="form-select">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label className="form-label">Choose Category</label>
            <div>
              <ul className="list-unstyled">
                {categories.map((cat) => (
                  <li key={cat}>
                    <input type="radio" onChange={handleCategoryChanged} name="category" value={cat} /> {cat.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
        <main className="col-8 d-flex flex-wrap">
          {products.map((product) => (
            <div key={product.id} className="card m-2 p-2">
              <img src={product.image} className="card-img-top" height="150" alt={product.title} />
              <div className="card-header">
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-star-fill text-success"></span> {product.rating.rate} [{product.rating.count}]
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button className="btn btn-danger">
                  <span className="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </section>
    </div>
  );
}
