export function fetchProducts() {
  // return fetch("https://fakestoreapi.com/products").then((res) => res.json());
  return fetch("https://dummyjson.com/products").then((res) => res.json());
}

export async function fetchProductById(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  // const res = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to Fetch");
  }
  const data = await res.json();

  return data;
}
