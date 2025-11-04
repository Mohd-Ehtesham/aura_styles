import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/WishlistPage.module.css";

import type { RootState, AppDispatch } from "../redux/store";

import { fetchWishlistProductsThunk } from "../redux/features/myWishlistPage/getWishlistProducts";
import { removeProductFromWishlistThunk } from "../redux/features/myWishlistPage/removeWishlistProduct";

import { ScaleLoader } from "react-spinners";
import { IoMdArrowRoundBack } from "react-icons/io";

import Button from "../components/Button";

import { BsFillCartPlusFill } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { handleAddToCart } from "../utils/handleAddToCart";

export default function MyWishlistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { wishlistProducts, loading } = useSelector(
    (state: RootState) => state.fetchWishlistProducts
  );

  const products = wishlistProducts?.data?.products || [];

  useEffect(() => {
    dispatch(fetchWishlistProductsThunk());
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <ScaleLoader
          loading={loading}
          color="black"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="back" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack size={25} />
        </Button>
        <h1 className={styles.title}>Wishlist Products</h1>
      </div>

      {!wishlistProducts || products.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.tableHeading}>
            Currently, there are no products in your wishlist.
          </p>
          <p className={styles.tableHeading}>
            Please start adding items to your wardrobe.
          </p>
        </div>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeading}>Image</th>
                  <th className={styles.tableHeading}>Name</th>
                  <th className={styles.tableHeading}>Brand</th>
                  <th className={styles.tableHeading}>Price</th>
                  <th className={styles.tableHeading}>Discount Price</th>
                  <th className={styles.tableHeading}>Stock</th>
                  <th className={styles.tableHeading}>Sizes</th>
                  <th className={styles.tableHeading}></th>
                  <th className={styles.tableHeading}></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      {product.images?.[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className={styles.image}
                        />
                      )}
                    </td>
                    <td className={styles.tableContent}>{product.name}</td>
                    <td className={styles.tableContent}>{product.brand}</td>
                    <td className={styles.tableContent}>${product.price}</td>
                    <td className={styles.discount}>
                      ${product.discountPrice}
                    </td>
                    <td className={styles.tableContent}>{product.stock}</td>
                    <td className={styles.tableContent}>
                      {product.sizes.map((size, index) => (
                        <span key={index} className={styles.sizeTag}>
                          {size}
                        </span>
                      ))}
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          const orderedProduct = {
                            ...product,
                            selectedSize: product.sizes?.[0] ?? "",
                            quantity: 1,
                          } as any;
                          handleAddToCart(orderedProduct, dispatch);
                          dispatch(removeProductFromWishlistThunk(product._id));
                          dispatch(fetchWishlistProductsThunk());
                        }}
                      >
                        <BsFillCartPlusFill size={20} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate("/order", {
                            state: {
                              source: "single",
                              product: { data: product },
                            },
                          })
                        }
                      >
                        <FaShoppingBasket size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.cardList}>
            {products.map((product) => (
              <div key={product._id} className={styles.card}>
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h3>{product.name}</h3>
                  <p className={styles.brand}>{product.brand}</p>
                  <div className={styles.priceRow}>
                    <span className={styles.discountPrice}>
                      ${product.discountPrice}
                    </span>
                    <span className={styles.originalPrice}>
                      ${product.price}
                    </span>
                  </div>
                  <p className={styles.stock}>Stock: {product.stock}</p>
                  <div className={styles.sizeRow}>
                    {product.sizes.map((size, index) => (
                      <span key={index} className={styles.sizeTag}>
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
