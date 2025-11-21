import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import * as Yup from "yup";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";

import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";

import type { AppDispatch, RootState } from "../redux/store";

import { createNewUser } from "../redux/features/user/userRegisterSlice";
import { loggedUserThunk } from "../redux/features/user/loggedUserSlice";
import { updateUserThunk } from "../redux/features/user/updateUserSlice";

import type { RegisterUser } from "../interfaces/users/RegisterUserInterface";

import styles from "../styles/RegisterPage.style.module.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector(
    (state: RootState) => state.registerUser
  );
  const { user } = useSelector((state: RootState) => state.loggedUser);
  const loggedUser = user?.data;

  const { id } = location.state;
  console.log("Location state id:", id);

  useEffect(
    function () {
      if (id && !loggedUser) {
        dispatch(loggedUserThunk());
      }
    },
    [dispatch, id]
  );

  useEffect(() => {
    if (loggedUser) {
      formik.setValues({
        avatar: loggedUser.avatar as unknown as File,
        name: loggedUser.name || "",
        email: loggedUser.email || "",
        password: "******",
        phone: loggedUser.phone || "",
        street: loggedUser.street || "",
        state: loggedUser.state || "",
        country: loggedUser.country || "",
        postalCode: loggedUser.postalCode || "",
        googleId: loggedUser.googleId || "",
        facebookId: loggedUser.facebookId || "",
        provider: loggedUser.provider || "",
        role: loggedUser.role || "",
        isVerified: String(loggedUser.isVerified || ""),
      });
      formik.setTouched({});
      formik.setSubmitting(false);
    }
  }, [loggedUser]);

  const formik = useFormik<RegisterUser>({
    initialValues: {
      avatar: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      street: "",
      state: "",
      country: "",
      postalCode: "",
      googleId: "",
      facebookId: "",
      provider: "",
      role: "",
      isVerified: "",
    },
    validationSchema: Yup.object({
      avatar: id
        ? Yup.mixed()
        : Yup.mixed()
            .test("required", "Avatar is required", (value) => {
              return value instanceof File;
            })
            .test("fileType", "Unsupported File Format", (value) => {
              if (value && value instanceof File) {
                return ["image/jpeg", "image/png", "image/jpg"].includes(
                  value.type
                );
              }
              return true;
            }),

      name: Yup.string().min(3).max(30).required("Name is required"),

      email: Yup.string().email().required("Email is required"),

      password: id
        ? Yup.string()
        : Yup.string().min(6).required("Password is required"),

      phone: Yup.string().required("Phone is required"),
      street: Yup.string().required("Street is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      postalCode: Yup.string().required("Postal Code is required"),

      googleId: id
        ? Yup.string().notRequired()
        : Yup.string().required("Google Id is required"),

      facebookId: id
        ? Yup.string().notRequired()
        : Yup.string().required("Facebook Id is required"),

      provider: id
        ? Yup.string().notRequired()
        : Yup.string().required("Provider is required"),

      role: id
        ? Yup.string().notRequired()
        : Yup.string().required("Role is required"),

      isVerified: id
        ? Yup.string().notRequired()
        : Yup.string().required("Verification is required"),
    }),

    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.avatar instanceof File) {
        formData.append("avatar", values.avatar);
      }
      Object.entries(values).forEach(([key, value]) => {
        if (key !== "avatar") {
          formData.append(key, String(value));
        }
      });
      try {
        let resultAction;
        if (id) {
          resultAction = await dispatch(updateUserThunk({ id, formData }));
        } else {
          resultAction = await dispatch(createNewUser(formData));
        }
        if (resultAction.meta.requestStatus === "fulfilled") {
          toast.success(
            id ? "User updated successfully" : "New user Successfully created."
          );
          navigate(id ? "/myProfile" : "/login");
        } else {
          toast.error("Something went wrong!");
          navigate(-1);
        }
      } catch (error: any) {
        toast.error("Unexpected error occurred");
        navigate(-1);
      }
    },
  });

  if (loading) {
    return (
      <div className={styles.parent}>
        <div className={styles.container}>
          <form className={styles.form}>
            {Array.from({ length: 13 }).map((_, i) => (
              <div className={styles.inputContainer} key={i}>
                <Skeleton
                  height={20}
                  width={100}
                  style={{ marginBottom: "0.5rem" }}
                />
                <Skeleton height={40} />
              </div>
            ))}
            <Skeleton height={45} width={120} style={{ marginTop: "1rem" }} />
          </form>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.area}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.parent}>
      <div className={styles.container}>
        <p
          className={`${styles.heading} ${styles.center} ${styles.mainHeading}`}
        >
          Register Yourself
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className={styles.form}
          encType="multipart/form-data"
        >
          <div className={styles.inputContainer}>
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              type="file"
              name="avatar"
              accept="image/*"
              id="avatar"
              onChange={(e: React.ChangeEvent) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                formik.setFieldValue("avatar", file);
                formik.setFieldTouched("avatar", true, true);
              }}
              className={
                formik.touched.avatar && formik.errors.avatar
                  ? `${styles.input} ${styles.inputBoxError}`
                  : styles.input
              }
            />

            {formik.touched.avatar && formik.errors.avatar && (
              <div className={styles.error}>{formik.errors.avatar}</div>
            )}
          </div>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "text" },
            { name: "password", label: "Password", type: "password" },
            { name: "phone", label: "Contact Number", type: "tel" },
            { name: "street", label: "Your Street", type: "text" },
            { name: "state", label: "Your State", type: "text" },
            { name: "country", label: "Your Country", type: "text" },
            { name: "postalCode", label: "Your Postal Code", type: "text" },
            { name: "googleId", label: "Your Google Id", type: "text" },
            { name: "facebookId", label: "Your Facebook Id", type: "text" },
            {
              name: "provider",
              placeholder: "google / facebook",
              label: "Your Provider",
              type: "text",
            },
            {
              name: "isVerified",
              placeholder: "true / false",
              label: "Verified",
              type: "text",
            },
            {
              name: "role",
              placeholder: "admin / customer",
              label: "Your Role",
              type: "text",
            },
          ].map((field) => (
            <div className={styles.inputContainer} key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                id={field.name}
                value={(formik.values as any)[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched[field.name as keyof RegisterUser] &&
                  formik.errors[field.name as keyof RegisterUser]
                    ? `${styles.input} ${styles.inputBoxError}`
                    : styles.input
                }
              />

              {(formik.touched as any)[field.name] &&
                (formik.errors as any)[field.name] && (
                  <div className={styles.error}>
                    {(formik.errors as any)[field.name]}
                  </div>
                )}
            </div>
          ))}
          <div className={`${styles.inputContainer} ${styles.submitButton}`}>
            <Button variant="primary" type="submit" disabled={!formik.isValid}>
              {id ? "Update User" : "Register User"}
            </Button>
          </div>
        </form>
        <p className={`${styles.heading} ${styles.center}`}>
          if already registerd ? Go to{" "}
          <NavLink className={styles.link} to="/login">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}
