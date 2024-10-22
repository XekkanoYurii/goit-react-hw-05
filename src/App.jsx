import "./App.css";

function Product() {
  return (
    <div>
      <h2>Cookies</h2>
      <p>Price: 999 credits</p>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Products</h1>

      <Product />
      <Product />
      <Product />
    </div>
  );
}
