import * as Yup from "yup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import type { AppDispatch, RootState } from "../redux/store";

import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaShoppingBasket } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

import toast from "react-hot-toast";
import styles from "../styles/ProductDetails.style.module.css";

import { fetchReviewThunk } from "../redux/features/review/fetchReviewsSlice";
import { createReviewThunk } from "../redux/features/review/createReviewSlice";
import { updateReviewThunk } from "../redux/features/review/updateReviewSlice";
import { deleteReviewThunk } from "../redux/features/review/deleteReviewSlice";
import { fetchProductByIdThunk } from "../redux/features/product/fetchProductByIdSlice";

import Modal from "../components/Modal";
import Button from "../components/Button";
import { handleAddToCart } from "../utils/handleAddToCart";

export default function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useParams<{ _id: string }>();

  const limit = 3;
  const [skip, setSkip] = useState<number>(0);
  const [selectSize, setSelectSize] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  const { loading, product, error } = useSelector(
    (state: RootState) => state.fetchProductById
  );
  const { reviews, count } = useSelector(
    (state: RootState) => state.fetchReviews
  );
  const data = product?.data;

  const formik = useFormik({
    initialValues: {
      reviewRating: 0,
      comment: "",
      images: [] as File[],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      reviewRating: Yup.number().required("Rating is required").min(1).max(5),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (!_id) {
          toast.error("Please select product first for review!");
          throw new Error("Product ID is missing");
        }
        const userId = JSON.parse(localStorage.getItem("user") || "{}")._id as
          | string
          | undefined;
        if (!userId) {
          toast.error(
            "Login to your account first if new then register yourself !"
          );
          throw new Error("User ID is missing");
        }
        const formData = new FormData();
        formData.append("reviewRating", values.reviewRating.toString());
        formData.append("comment", values.comment);
        formData.append("product", _id);
        formData.append("user", userId);
        values.images.forEach((file) => {
          formData.append("images", file);
        });
        if (isEditMode && selectedReview?._id) {
          await dispatch(
            updateReviewThunk({
              data: formData as any,
              reviewId: selectedReview._id,
            })
          );
        } else {
          await dispatch(createReviewThunk(formData as unknown as any));
        }
        setIsModalOpen(false);
        setIsEditMode(false);
        setSelectedReview(null);
        formik.resetForm();
      } catch (error: unknown) {
        console.error("Error submitting review:", error);
      }
    },
  });

  const fields = [
    {
      htmlFor: "images",
      name: "images",
      type: "file",
      label: "Images",
      placeholder: "Upload images",
      multiple: true,
    },
    {
      htmlFor: "reviewRating",
      name: "reviewRating",
      type: "number",
      label: "Rating",
      placeholder: "Enter your rating please",
    },
    {
      htmlFor: "comment",
      name: "comment",
      label: "Comment",
      type: "textarea",
      placeholder: "Enter comment please",
    },
  ];

  useEffect(
    function () {
      if (_id) {
        dispatch(fetchProductByIdThunk({ _id }));
        dispatch(fetchReviewThunk({ skip: 0, limit: 0, productId: _id }));
      }
    },
    [dispatch, _id]
  );

  if (error) {
    return (
      <div className={styles.area}>
        <p className={styles.error}>Error : {error}</p>
      </div>
    );
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

  async function onAddToCart() {
    if (product?.data) {
      const orderedProduct = {
        ...product.data,
        selectedSize: selectSize,
        quantity: 1,
      };
      handleAddToCart(orderedProduct, dispatch, {
        size: selectSize,
        quantity: 1,
      });
    }
  }

  async function handleMoreReviews() {
    if (_id) {
      const newSkip = skip + limit;
      setSkip(newSkip);
      dispatch(fetchReviewThunk({ skip: newSkip, limit, productId: _id }));
    }
  }

  async function deleteReview(reviewId: string) {
    await dispatch(deleteReviewThunk(reviewId));
    dispatch(fetchReviewThunk({ skip: 0, limit: 3, productId: _id }));
  }

  return (
    <div className={styles.container}>
      <Button
        variant="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        <IoMdArrowRoundBack size={25} />
      </Button>
      <div className={styles.display}>
        {data?.images.map((image: { fileId: string; url: string }) => (
          <img
            className={styles.image}
            key={image.fileId}
            src={image.url}
            alt="loading..."
          />
        ))}
      </div>
      <div className={styles.innerContainer}>
        <div>
          <p className={styles.subContainer}>
            <span className={styles.subHeading}>Description : </span>
            <span className={styles.textDesign}>{data?.description}</span>
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Name : </span>{" "}
              <span className={styles.textDesign}>{data?.name}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Brand : </span>
              <span className={styles.textDesign}>{data?.brand}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Category : </span>
              <span className={styles.textDesign}>{data?.category}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Discount Price : </span>
              <span className={styles.textDesign}>{data?.discountPrice}</span>
            </p>
          </div>
          <div>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Num Reviews : </span>
              <span className={styles.textDesign}>{data?.numReviews}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Price : </span>
              <span className={styles.textDesign}>{data?.price}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Rating : </span>
              <span className={styles.textDesign}>{data?.rating}</span>
            </p>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Stock : </span>
              <span className={styles.textDesign}>{data?.stock}</span>
            </p>
          </div>
          <div>
            <p className={styles.subContainer}>
              <span className={styles.subHeading}>Is Featured : </span>
              <span className={styles.textDesign}>
                {data?.isFeatured ? "Yes" : "No"}
              </span>
            </p>
            <div className={styles.flexContainer}>
              <label className={styles.subHeading}>Sizes : </label>
              <select
                id="sizes"
                className={styles.selectBox}
                value={selectSize}
                onChange={(event) => setSelectSize(event.target.value)}
              >
                <option value="" className={styles.optionBox}>
                  Select Size
                </option>
                {data?.sizes.map((size: string, index: number) => (
                  <option key={index} value={size} className={styles.optionBox}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onAddToCart} variant="secondary">
              <BsFillCartPlusFill size={20} />
            </Button>
            <Button
              onClick={() =>
                navigate("/order", { state: { source: "single", product } })
              }
              variant="secondary"
            >
              <FaShoppingBasket size={20} />
            </Button>
          </div>
        </div>
        <div>
          <h2 className={styles.subHeading}>Customers Review</h2>
          {reviews?.length ? (
            reviews.map((review) => (
              <div key={review._id} className={styles.reviewContainer}>
                <div className={styles.imageSection}>
                  {review?.images?.map((image) => (
                    <img
                      key={image.fileId}
                      className={styles.reviewImage}
                      src={image.url}
                      alt="loading..."
                    />
                  ))}
                </div>

                <div className={styles.contentSection}>
                  <div className={styles.userInfo}>
                    <p>
                      <span className={styles.subHeading}>User:</span>{" "}
                      <span className={styles.textDesign}>
                        {review.user?.name}
                      </span>
                    </p>
                    <p>
                      <span className={styles.subHeading}>Rating:</span>{" "}
                      <span className={styles.textDesign}>
                        {review.reviewRating} / 5
                      </span>
                    </p>
                  </div>

                  <p className={styles.commentSection}>
                    <span className={styles.subHeading}>Comment:</span>{" "}
                    <span className={styles.textDesign}>{review.comment}</span>
                  </p>
                </div>
                <div className={styles.buttonContainer}>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsEditMode(true);
                      setSelectedReview(review);
                      setIsModalOpen(true);
                      formik.setValues({
                        reviewRating: review.reviewRating,
                        comment: review.comment,
                        images: [],
                      });
                    }}
                  >
                    <FaEdit size={20} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteReview(review._id);
                    }}
                  >
                    <MdDeleteOutline size={20} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.textDesign}>No Reviews Yet</p>
          )}
          <div className={styles.flexContainer}>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Add Review
            </Button>
            <Button
              variant="outline"
              onClick={handleMoreReviews}
              disabled={reviews.length === count}
            >
              {reviews.length < count
                ? "Load More Reviews"
                : "No More Reviews Available"}
            </Button>
          </div>
        </div>
        <Modal
          isOpen={isModalOpen}
          title="Add Review"
          fields={fields}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditMode(false);
            setSelectedReview(null);
            formik.resetForm();
          }}
          formik={formik}
        />
      </div>
    </div>
  );
}
