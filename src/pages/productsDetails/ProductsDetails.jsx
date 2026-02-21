// ProductDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import useFetchProductById from "./hooks/useFetchProductById";
import Spinner from "../../ui/Spinner/Spinner";
import ErrorPage from "../../ui/Errorpage/ErrorPage";
import styles from "./productDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchProductById(id);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;
  if (!data) return <p>No product available</p>;

  // DummyJSON usually returns images as array → handle both string and array
  const images = Array.isArray(data.images) ? data.images : [data.images];
  const mainImage =
    images[0] || "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className={styles.container}>
      <div className={styles.backLinkWrapper}>
        <Link to="/products" className={styles.backLink}>
          ← Back to Products
        </Link>
      </div>

      <div className={styles.productContainer}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <img
            src={mainImage}
            alt={data.title}
            className={styles.mainImage}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/600x600?text=Image+Not+Found";
            }}
          />

          {/* Thumbnail gallery if multiple images */}
          {images.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${data.title} - view ${index + 1}`}
                  className={styles.thumbnail}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{data.title}</h1>

          <div className={styles.meta}>
            <span className={styles.category}>{data.category}</span>
            {data.brand && (
              <span className={styles.brand}> | {data.brand}</span>
            )}
          </div>

          <div className={styles.priceRating}>
            <p className={styles.price}>
              ${data.price?.toFixed(2)}
              {data.discountPercentage && (
                <span className={styles.originalPrice}>
                  $
                  {Math.round(
                    data.price / (1 - data.discountPercentage / 100),
                  ).toFixed(2)}
                </span>
              )}
            </p>

            <div className={styles.rating}>
              <span>★ {data.rating?.toFixed(1)}</span>
              {data.reviews && <span>({data.reviews?.length} reviews)</span>}
            </div>
          </div>

          <p className={styles.description}>{data.description}</p>

          <div className={styles.infoGrid}>
            <div>
              <strong>Stock:</strong> {data.stock}
              {data.availabilityStatus && (
                <span
                  className={
                    data.stock > 0 ? styles.inStock : styles.outOfStock
                  }
                >
                  {" "}
                  ({data.availabilityStatus})
                </span>
              )}
            </div>
            <div>
              <strong>Created:</strong>{" "}
              {data.meta?.createdAt
                ? new Date(data.meta.createdAt).toLocaleDateString()
                : "—"}
            </div>
            {data.warrantyPeriod && (
              <div>
                <strong>Warranty:</strong> {data.warrantyPeriod}
              </div>
            )}
          </div>

          {/* Optional: Add to Cart / Buy button placeholder */}
          <div className={styles.actions}>
            <button className={styles.addToCartBtn}>Add to Cart</button>
            <button className={styles.buyNowBtn}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
