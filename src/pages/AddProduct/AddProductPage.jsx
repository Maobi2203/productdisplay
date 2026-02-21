// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { validate } from "./utilis/formValidate";
// import useFetchProducts from "../products/hooks/useFetchProducts";
// // import {brandArr} from "../products/ProductPage";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// const categoryArr = [
//   { name: "All", value: "all" },
//   { name: "Beauty", value: "beauty" },
//   { name: "Fragrances", value: "fragrances" },
//   { name: "Furniture", value: "furniture" },
//   { name: "Groceries", value: "groceries" },
// ];

// const AddProductPage = () => {
//   const { data, isLoading, error } = useFetchProducts();

//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     brand: "",
//     category: "",
//     rating: "",
//     stock: "",
//     images: "",
//     description: "",
//   });
//   //Loading state during image upload
//   const [loading, setLoading] = useState(false);

//   //Temporary storage of the uploaded image URL
//   const [imageUrl, setImageUrl] = useState("");
//   const [errors, setErrors] = useState({});

//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   // creating a unique id

//   // const generateId = () => {
//   //   const randomNum = Math.floor(Math.random() * (100 - 10 + 1) + 10);
//   //   return `${Date.now()}${randomNum}`;
//   // };
//   const products = data?.products ?? [];
//   // console.log(products);
//   const brandMap = [
//     ...new Map(products.map((p) => [p.brand, p.brand])).values(),
//   ];
//   // console.log(brandMap, "brand ");

//   // const brandArr = [...new Map(product.map((p) => [p.brand, p])).values()];
//   // console.log(brandArr, "brand Array");

//   // control input text and numbers
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   //  function to stroe the selected file when user picks an image
//   const handleFileChange = (e) => {
//     const files = e.target.files[0];
//     if (!files) return;
//     const imagePreview = URL.createObjectURL(files);
//     setFormData({ ...formData, images: files });
//   };

//   // function to add Product

//   const addProductMutation = useMutation({
//     mutationFn: async (newProduct) => {
//       // this is a fake apicall
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(newProduct);
//         }, 5000);
//       });
//     },
//     onSuccess: (newProduct) => {
//       // this upDTES THE CACHE
//       // update cache
//       // queryClient.setQueryData(["products"], (oldProducts = []) => {
//       //   return [newProduct, ...oldProducts];
//       // });

//       // go back to products page
//       navigate("/products");
//     },
//   });

//   // function to submit form

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const isValid = validate(formData, setErrors);
//     if (!isValid) return;
//     const newProduct = {
//       id: Date.now(),
//       title: formData.title,
//       price: formData.price,
//       brand: formData.brand,
//       category: formData.category,
//       description: formData.description,
//       rating: formData.rating,
//       stock: formData.stock,
//       images: formData.images,
//       createdAt: new Date().toISOString(),
//     };
//     addProductMutation.mutate(newProduct);
//   };

//   return (
//     <div>
//       <Link to="/">Go Back to produt page</Link>

//       <h1>Add new Product</h1>
//       <form onSubmit={handleSubmit}>
//         <label>Title</label>
//         <input
//           type="text"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//         />

//         {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}

//         <label>Price</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleInputChange}
//         />

//         {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
//         <label>Brand</label>
//         <select
//           name="brand"
//           id="brand"
//           value={formData.brand}
//           onChange={handleInputChange}
//         >
//           {brandMap.map((item) =>
//             item ? (
//               <option key={item} value={item}>
//                 {item}
//               </option>
//             ) : null,
//           )}
//         </select>
//         {/* <input
//           type="text"
//           name="brand"
//           value={formData.brand}
//           onChange={handleInputChange}
//         /> */}

//         {errors.brand && <p style={{ color: "red" }}>{errors.brand}</p>}
//         <label>Category</label>

//         <select
//           id="category"
//           name="category"
//           value={formData.value}
//           onChange={handleInputChange}
//         >
//           {categoryArr.map((item) =>
//             item ? (
//               <option key={item.value} value={item.value}>
//                 {item.value}
//               </option>
//             ) : null,
//           )}
//         </select>

//         {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
//         <label>Stock</label>
//         <input
//           type="number"
//           name="stock"
//           value={formData.stock}
//           onChange={handleInputChange}
//         />

//         {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
//         <label>Rating</label>
//         <input
//           type="number"
//           name="rating"
//           value={formData.rating}
//           onChange={handleInputChange}
//         />

//         {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
//         <label>Image</label>

//         <input type="file" accept="image/*" onChange={handleFileChange} />

//         {errors.images && <p style={{ color: "red" }}>{errors.images}</p>}

//         <label>Description</label>
//         <textarea
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//         />

//         {errors.description && (
//           <p style={{ color: "red" }}>{errors.description}</p>
//         )}
//         <button type="submit" disabled={addProductMutation.isPending}>
//           {addProductMutation.isPending ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProductPage;

// AddProductPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { validate } from "./utilis/formValidate";
import useFetchProducts from "../products/hooks/useFetchProducts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./AddProductPage.module.css";

const categoryArr = [
  { name: "All", value: "all" },
  { name: "Beauty", value: "beauty" },
  { name: "Fragrances", value: "fragrances" },
  { name: "Furniture", value: "furniture" },
  { name: "Groceries", value: "groceries" },
];

const AddProductPage = () => {
  const { data, isLoading, error } = useFetchProducts();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    brand: "",
    category: "",
    rating: "",
    stock: "",
    images: "",
    description: "",
  });

  //Loading state during image upload
  const [loading, setLoading] = useState(false);

  //Temporary storage of the uploaded image URL
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState({});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const products = data?.products ?? [];
  const brandMap = [
    ...new Map(products.map((p) => [p.brand, p.brand])).values(),
  ];

  // control input text and numbers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //  function to stroe the selected file when user picks an image
  const handleFileChange = (e) => {
    const files = e.target.files[0];
    if (!files) return;
    const imagePreview = URL.createObjectURL(files);
    setFormData({ ...formData, images: files });
    setImageUrl(imagePreview); // optional preview
  };

  // function to add Product
  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      // this is a fake apicall
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(newProduct);
        }, 5000);
      });
    },
    onSuccess: (newProduct) => {
      // go back to products page
      navigate("/products");
    },
  });

  // function to submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(formData, setErrors);
    if (!isValid) return;
    const newProduct = {
      id: Date.now(),
      title: formData.title,
      price: formData.price,
      brand: formData.brand,
      category: formData.category,
      description: formData.description,
      rating: formData.rating,
      stock: formData.stock,
      images: formData.images,
      createdAt: new Date().toISOString(),
    };
    addProductMutation.mutate(newProduct);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/products" className={styles.backLink}>
          ← Back to Products
        </Link>
        <h1 className={styles.pageTitle}>Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Title */}
          <div className={styles.formField}>
            <label htmlFor="title">Product Title</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="e.g. Premium Wireless Headphones"
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>

          {/* Price */}
          <div className={styles.formField}>
            <label htmlFor="price">Price ($)</label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="99.99"
              step="0.01"
              min="0"
            />
            {errors.price && <p className={styles.error}>{errors.price}</p>}
          </div>

          {/* Brand - Select */}
          <div className={styles.formField}>
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select Brand</option>
              {brandMap.map((item) =>
                item ? (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ) : null,
              )}
            </select>
            {errors.brand && <p className={styles.error}>{errors.brand}</p>}
          </div>

          {/* Category */}
          <div className={styles.formField}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="">Select Category</option>
              {categoryArr.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className={styles.error}>{errors.category}</p>
            )}
          </div>

          {/* Stock */}
          <div className={styles.formField}>
            <label htmlFor="stock">Stock Quantity</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className={styles.input}
              min="0"
              placeholder="e.g. 45"
            />
            {errors.stock && <p className={styles.error}>{errors.stock}</p>}
          </div>

          {/* Rating */}
          <div className={styles.formField}>
            <label htmlFor="rating">Rating (0–5)</label>
            <input
              id="rating"
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className={styles.input}
              step="0.1"
              min="0"
              max="5"
              placeholder="e.g. 4.7"
            />
            {errors.rating && <p className={styles.error}>{errors.rating}</p>}
          </div>
        </div>

        {/* Image Upload */}
        <div className={styles.formField}>
          <label htmlFor="image">Product Image</label>
          <div className={styles.fileUpload}>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <span className={styles.fileLabel}>Choose Image</span>
          </div>

          {imageUrl && (
            <div className={styles.imagePreview}>
              <img src={imageUrl} alt="Preview" />
            </div>
          )}

          {errors.images && <p className={styles.error}>{errors.images}</p>}
        </div>

        {/* Description */}
        <div className={styles.formField}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles.textarea}
            rows={6}
            placeholder="Describe your product in detail..."
          />
          {errors.description && (
            <p className={styles.error}>{errors.description}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={addProductMutation.isPending || loading}
        >
          {addProductMutation.isPending || loading
            ? "Adding Product..."
            : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
