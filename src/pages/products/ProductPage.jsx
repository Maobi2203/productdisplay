// import React, { useState } from "react";
// import useFetchProducts from "./hooks/useFetchProducts";
// import { Link, useNavigate } from "react-router-dom";
// // import Spinner from "../../../../../../Downloads/Spinner";
// import ErrorPage from "../../ui/Errorpage/ErrorPage";
// import ProductBrandChart from "../../ui/charts/ProductBrandChart/ProductBrandChart";
// import Spinner from "../../ui/Spinner/Spinner";
// const categoryArr = [
//   { name: "All", value: "all" },
//   { name: "Beauty", value: "beauty" },
//   { name: "Fragrances", value: "fragrances" },
//   { name: "Furniture", value: "furniture" },
//   { name: "Groceries", value: "groceries" },
// ];

// const PAGE_SIZE = 10;

// const ProductPage = () => {
//   const { data, isLoading, error } = useFetchProducts();
//   const navigate = useNavigate();

//   const [page, setPage] = useState(1);
//   const [categoryFilter, setCategoryFilter] = useState("all");
//   const [brandFilter, setBrandFilter] = useState("all");
//   const [priceFilter, setPriceFilter] = useState("all");
//   const [search, setSearch] = useState("");
//   const [sortOrder, setSortOrder] = useState("");
//   if (isLoading) return <Spinner />;
//   if (error) return <ErrorPage />;

//   const products = data?.products ?? [];

//   // Brands that is aailable for the category that is selected

//   const brandOptions =
//     categoryFilter === "all"
//       ? [...new Map(products.map((p) => [p.brand, p])).values()]
//       : products.filter((p) => p.category === categoryFilter);

//   // filter by price
//   const filterByPrice = (product) => {
//     if (priceFilter === "all") return true;
//     if (priceFilter === "low") return product.price < 50;
//     if (priceFilter === "medium")
//       return product.price >= 50 && product.price < 100;
//     if (priceFilter === "high") return product.price >= 100;
//     return true;
//   };
//   // fileterered products

//   const filteredProducts = products.filter((product) => {
//     const categoryMatch =
//       categoryFilter === "all" ? true : product.category == categoryFilter;
//     const brandMatch =
//       brandFilter === "all" ? true : product.brand === brandFilter;
//     const priceMatch = filterByPrice(product);
//     const searchMatch = product.title
//       .toLowerCase()
//       .includes(search.toLocaleLowerCase());
//     return categoryMatch && brandMatch && priceMatch && searchMatch;
//   });
//   console.log(data);
//   // Sort BEFORE paginating
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOrder === "newest")
//       // return b.id - a.id;
//       return new Date(b.meta.createdAt) - new Date(a.meta.createdAt);
//     if (sortOrder === "oldest")
//       // return a.id - b.id;
//       return new Date(a.meta.createdAt) - new Date(b.meta.createdAt);
//     return 0;
//   });

//   const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
//   const start = (page - 1) * PAGE_SIZE;
//   const end = start + PAGE_SIZE;

//   const paginatedProducts = sortedProducts.slice(start, end);

//   const handleCategoryChange = (e) => {
//     setCategoryFilter(e.target.value);
//     setBrandFilter("all");
//     setPage(1);

//     // console.log(filteredProducts);
//     // console.log(paginatedProducts, "pagination");
//   };

//   // handle brand change

//   const handleBrandChange = (e) => {
//     setBrandFilter(e.target.value);
//     setPage(1);
//   };

//   //  handle price change
//   const handlePriceChange = (e) => {
//     setPriceFilter(e.target.value);
//     setPage(1);
//   };

//   //  serch function

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };
//   return (
//     <div>
//       <button
//         onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>
//       <h1>Products Page</h1>
//       <Link to="/addProduct">Add New Product</Link>
//       {/* chart */}
//       <ProductBrandChart products={paginatedProducts} />
//       {/* filters */}
//       {/* category filter */}
//       <label htmlFor="search">Category</label> :
//       <select
//         id="category"
//         value={categoryFilter}
//         onChange={handleCategoryChange}
//       >
//         {categoryArr.map((item) => (
//           <option key={item.value} value={item.value}>
//             {item.name}
//           </option>
//         ))}
//       </select>
//       {/* brand filter */}
//       <label htmlFor="brand">Brand</label> :
//       <select id="brand" value={brandFilter} onChange={handleBrandChange}>
//         <option value="all">All Brands</option>
//         {brandOptions.map((item) =>
//           item.brand ? (
//             <option key={item.brand} value={item.brand}>
//               {item.brand}
//             </option>
//           ) : null,
//         )}
//       </select>
//       {/* filter by Price */}
//       <label htmlFor="price">Price</label> :
//       <select id="price" value={priceFilter} onChange={handlePriceChange}>
//         <option value="all">All Prices</option>
//         <option value="low">Below $50</option>
//         <option value="medium">$50 – $100</option>
//         <option value="high">Above $100</option>
//       </select>
//       {/* search */}
//       <label htmlFor="search">Search Products</label> :
//       <input
//         type="text"
//         id="search"
//         placeholder="Search product..."
//         value={search}
//         onChange={handleSearchChange}
//       />
//       {/* sort by date */}
//       <label htmlFor="date">Sort by Date</label> :
//       <select
//         id="date"
//         value={sortOrder}
//         onChange={(e) => setSortOrder(e.target.value)}
//       >
//         <option value="">Sort by Date</option>
//         <option value="newest">Newest</option>
//         <option value="oldest">Oldest</option>
//       </select>
//       {/* priduct list */}
//       {paginatedProducts.length === 0 ? (
//         <p>No products match your filter</p>
//       ) : (
//         <ul>
//           {paginatedProducts.map((product) => (
//             <li
//               onClick={() => navigate(`/product/${product.id}`)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   navigate(`/product/${product.id}`);
//                 }
//               }}
//               tabIndex={product.id}
//               key={product.id}
//               style={{
//                 border: "1px solid gray",
//                 padding: "10px",
//                 margin: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               {product.title}
//             </li>
//           ))}
//         </ul>
//       )}
//       {/* paginations */}
//       <div>
//         <button
//           onClick={() => setPage((p) => Math.max(p - 1, 1))}
//           disabled={page === 1}
//         >
//           Prev
//         </button>
//         <span>
//           Page {page} of {totalPages || 1}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//           disabled={page >= totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// ProductPage.jsx
import React, { useState } from "react";
import useFetchProducts from "./hooks/useFetchProducts";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "../../ui/Errorpage/ErrorPage";
import ProductBrandChart from "../../ui/charts/ProductBrandChart/ProductBrandChart";
import Spinner from "../../ui/Spinner/Spinner";
// import styles from "./ProductPage.module.css";
import styles from "../products/ProductPage.module.css";

const categoryArr = [
  { name: "All", value: "all" },
  { name: "Beauty", value: "beauty" },
  { name: "Fragrances", value: "fragrances" },
  { name: "Furniture", value: "furniture" },
  { name: "Groceries", value: "groceries" },
];

const PAGE_SIZE = 10;

const ProductPage = () => {
  const { data, isLoading, error } = useFetchProducts();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;

  const products = data?.products ?? [];

  // Brands that is aailable for the category that is selected

  const brandOptions =
    categoryFilter === "all"
      ? [...new Map(products.map((p) => [p.brand, p])).values()]
      : products.filter((p) => p.category === categoryFilter);

  // filter by price
  const filterByPrice = (product) => {
    if (priceFilter === "all") return true;
    if (priceFilter === "low") return product.price < 50;
    if (priceFilter === "medium")
      return product.price >= 50 && product.price < 100;
    if (priceFilter === "high") return product.price >= 100;
    return true;
  };
  // fileterered products

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      categoryFilter === "all" ? true : product.category == categoryFilter;
    const brandMatch =
      brandFilter === "all" ? true : product.brand === brandFilter;
    const priceMatch = filterByPrice(product);
    const searchMatch = product.title
      .toLowerCase()
      .includes(search.toLocaleLowerCase());
    return categoryMatch && brandMatch && priceMatch && searchMatch;
  });
  console.log(data);
  // Sort BEFORE paginating
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "newest")
      // return b.id - a.id;
      return new Date(b.meta.createdAt) - new Date(a.meta.createdAt);
    if (sortOrder === "oldest")
      // return a.id - b.id;
      return new Date(a.meta.createdAt) - new Date(b.meta.createdAt);
    return 0;
  });

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginatedProducts = sortedProducts.slice(start, end);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setBrandFilter("all");
    setPage(1);

    // console.log(filteredProducts);
    // console.log(paginatedProducts, "pagination");
  };

  // handle brand change

  const handleBrandChange = (e) => {
    setBrandFilter(e.target.value);
    setPage(1);
  };

  //  handle price change
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
    setPage(1);
  };

  //  serch function

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Products</h1>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className={styles.logoutButton}
        >
          Logout
        </button>
      </div>

      <Link to="/addProduct" className={styles.addButton}>
        + Add New Product
      </Link>

      {/* chart */}
      <div className={styles.chartContainer}>
        <ProductBrandChart products={paginatedProducts} />
      </div>

      {/* filters */}
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={categoryFilter}
            onChange={handleCategoryChange}
            className={styles.select}
          >
            {categoryArr.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor="brand">Brand</label>
          <select
            id="brand"
            value={brandFilter}
            onChange={handleBrandChange}
            className={styles.select}
          >
            <option value="all">All Brands</option>
            {brandOptions.map((item) =>
              item.brand ? (
                <option key={item.brand} value={item.brand}>
                  {item.brand}
                </option>
              ) : null,
            )}
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor="price">Price</label>
          <select
            id="price"
            value={priceFilter}
            onChange={handlePriceChange}
            className={styles.select}
          >
            <option value="all">All Prices</option>
            <option value="low">Below $50</option>
            <option value="medium">$50 – $100</option>
            <option value="high">Above $100</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor="search">Search Products</label>
          <input
            type="text"
            id="search"
            placeholder="Search product..."
            value={search}
            onChange={handleSearchChange}
            className={styles.input}
          />
        </div>

        <div className={styles.filterItem}>
          <label htmlFor="date">Sort by Date</label>
          <select
            id="date"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.select}
          >
            <option value="">Sort by Date</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* product list */}
      {paginatedProducts.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No products match your filter</p>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className={styles.productCard}
              onClick={() => navigate(`/product/${product.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/product/${product.id}`);
                }
              }}
              tabIndex={0}
              role="button"
            >
              <div className={styles.cardContent}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                {product.brand && (
                  <p className={styles.productBrand}>{product.brand}</p>
                )}
                <p className={styles.productPrice}>${product.price}</p>
                <span className={styles.productCategory}>
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* paginations */}
      <div className={styles.pagination}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className={styles.pageButton}
        >
          Prev
        </button>
        <span className={styles.pageInfo}>
          Page {page} of {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page >= totalPages}
          className={styles.pageButton}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
