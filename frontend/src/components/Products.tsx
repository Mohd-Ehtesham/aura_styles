import { NavLink, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import type { RootState, AppDispatch } from "../redux/store";
import { fetchProductsThunk } from "../redux/features/product/fetchProductsSlice";

import { getUserFromToken } from "../utils/getUserFromToken";
import { toggleWishlistProduct } from "../services/myWishlistPageService";

import styles from "../styles/Products.style.module.css";
import Button from "./Button";

export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const { query } = useOutletContext<{ query: string }>();

  const [page, setPage] = useState<number>(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const limit = 3;

  const { loading, products, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (query) {
      dispatch(fetchProductsThunk({ skip: 0, limit, query }));
    } else {
      dispatch(fetchProductsThunk({ skip: 0, limit }));
    }
  }, [dispatch, query]);

  function handleLoadMoreProducts(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    console.log("Fetch more :");
    const newPage = page + 1;
    dispatch(fetchProductsThunk({ skip: newPage * limit, limit }));
    setPage(newPage);
  }

  async function addProductToWishlist(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productId: string
  ) {
    event.preventDefault();
    event.stopPropagation();
    const user = getUserFromToken();
    const userId = user?.id;
    if (!userId) {
      console.error("User not logged in");
      return;
    }
    setSelectedProduct(productId);
    try {
      await toggleWishlistProduct(productId);
      setWishlist((prevWishlist) =>
        prevWishlist.includes(productId)
          ? prevWishlist.filter((id) => id !== productId)
          : [...prevWishlist, productId]
      );
    } catch (error) {
      console.error("Error toggling wishlist", error);
    } finally {
      setSelectedProduct(null);
    }
  }

  if (error) {
    return (
      <div className={styles.area}>
        <p className={styles.error}>Error in loading product images</p>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.heading}>
        <p>Collections of Aura Collections</p>
      </div>
      <div className={styles.productsDisplay}>
        {loading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index}>
                  <Skeleton height={400} width={300} />
                  <div className={styles.container}>
                    <p>
                      <Skeleton width={150} />
                    </p>
                    <p>
                      <Skeleton width={100} />
                    </p>
                  </div>
                  <div className={styles.container}>
                    <p>
                      <Skeleton width={100} />
                    </p>
                    <p>
                      <Skeleton width={80} />
                    </p>
                  </div>
                </div>
              ))
          : products?.data.map((product) => (
              <div key={product._id} className={styles.cardWrapper}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  to={`/productDetails/${product._id}`}
                >
                  <div className={styles.imageWrapper}>
                    <img
                      className={styles.image}
                      src={product.images[0].url}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.container}>
                    <p className={styles.subHeading}>Name: {product.name}</p>
                    <p className={styles.subHeading}>Brand: {product.brand}</p>
                  </div>
                  <div className={styles.container}>
                    <p className={styles.subHeading}>
                      Category: {product.category}
                    </p>
                    <p className={styles.subHeading}>
                      Price:{" "}
                      {product.discountPrice ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              marginRight: "0.5rem",
                              color: "red",
                            }}
                          >
                            {product.price}
                          </span>
                          <span>{product.discountPrice}</span>
                        </>
                      ) : (
                        <span>{product.price}</span>
                      )}
                    </p>
                  </div>
                </NavLink>

                {/* ✅ Wishlist heart button */}
                <button
                  className={styles.heartButton}
                  disabled={selectedProduct === product._id}
                  onClick={(event) => addProductToWishlist(event, product._id)}
                >
                  {wishlist.includes(product._id) ? (
                    <FaHeart color="red" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
            ))}
      </div>

      <div className={styles.loadMoreWrapper}>
        <Button
          type="button"
          variant="primary"
          onClick={() => handleLoadMoreProducts}
        >
          Explore More +
        </Button>
      </div>
    </div>
  );
}
