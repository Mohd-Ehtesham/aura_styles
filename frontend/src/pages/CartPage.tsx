import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../redux/store";

import { cartPageThunk } from "../redux/features/cart/cart";
import { clearCartThunk } from "../redux/features/cart/clearCart";
import { removeFromCartPageThunk } from "../redux/features/cart/removeProductFromCart";
import { updateCartProductQuantityThunk } from "../redux/features/cart/updateProductQuantity";

import Button from "../components/Button";

import { ScaleLoader } from "react-spinners";

import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { IoMdArrowRoundBack } from "react-icons/io";

import styles from "../styles/CartPage.module.css";

export default function CartPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { carts, loading } = useSelector((state: RootState) => state.carts);
  const cartProducts = carts?.data?.[0]?.products || [];

  useEffect(() => {
    dispatch(cartPageThunk());
  }, [dispatch]);

  function handleRemoveFromCart(productId: string) {
    dispatch(removeFromCartPageThunk(productId))
      .unwrap()
      .then(() => dispatch(cartPageThunk()));
  }

  function handleUpdateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return;
    dispatch(updateCartProductQuantityThunk({ productId, quantity }))
      .unwrap()
      .then(() => dispatch(cartPageThunk()))
      .catch((error) => console.error("Failed to update quantity:", error));
  }

  function handleClearCart() {
    dispatch(clearCartThunk())
      .unwrap()
      .then(() => dispatch(cartPageThunk()))
      .catch((error) => console.error("Failed to clear cart:", error));
  }

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
    <div className={styles.cartPage}>
      <div
        className={styles.outlineButton}
        onClick={(event) => {
          event.preventDefault();
          navigate(-1);
        }}
      >
        <IoMdArrowRoundBack size={25} />
      </div>

      {!cartProducts || cartProducts.length === 0 ? (
        <p className={styles.infoContainer}>
          Currently, there are no products in your cart. Please start adding to
          your wardrobe.
        </p>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Discount Price</th>
                  <th>Rating</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((cartProduct) => (
                  <tr key={cartProduct._id}>
                    <td>
                      {cartProduct?.product?.images?.length > 0 && (
                        <img
                          className={styles.image}
                          src={cartProduct.product.images[0].url}
                          alt={cartProduct.product.name}
                        />
                      )}
                    </td>
                    <td>{cartProduct?.product?.brand}</td>
                    <td>{cartProduct?.product?.category}</td>
                    <td className={styles.strikeThrough}>
                      ₹{cartProduct?.product?.price}
                    </td>
                    <td>₹{cartProduct?.product?.discountPrice}</td>
                    <td>{cartProduct?.product?.rating}</td>
                    <td>{cartProduct?.size}</td>
                    <td>{cartProduct?.quantity}</td>
                    <td className={styles.actionButtons}>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleUpdateQuantity(
                            cartProduct.product._id,
                            cartProduct.quantity + 1
                          )
                        }
                      >
                        <FaPlus size={14} />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleUpdateQuantity(
                            cartProduct.product._id,
                            cartProduct.quantity - 1
                          )
                        }
                      >
                        <TiMinus size={16} />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleRemoveFromCart(cartProduct.product._id)
                        }
                      >
                        <ImCross size={12} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.actionButtonsContainer}>
            <Button variant="danger" onClick={handleClearCart}>
              Clear Cart
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                navigate("/order", {
                  state: { source: "multiple", cartProducts },
                })
              }
            >
              Make Order
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
