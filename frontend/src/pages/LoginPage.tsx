import { useFormik } from "formik";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

import Input from "../components/Input";
import Label from "../components/Label";

import type { AppDispatch, RootState } from "../redux/store";
import type { LoginUser } from "../interfaces/users/LoginUserInterface";
import { loginUserThunk } from "../redux/features/user/userLoginSlice";

import styles from "../styles/LoginPage.style.module.css";
import Button from "../components/Button";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.loginUser);

  const from = location.state?.from?.pathname || "/";

  const formik = useFormik<LoginUser>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .min(6, "At least 6 characters are required")
        .required("Incorrect password"),
    }),
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginUserThunk(values));
        console.log(resultAction);
        if (loginUserThunk.fulfilled.match(resultAction)) {
          const user = resultAction.payload.loggedUser;
          const role = user.role;
          const token = resultAction.payload.token;
          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Successfull login");
          navigate(from, { replace: true });
        } else {
          const errMessage = resultAction.payload as string;
          toast.error(errMessage || "Login failed");
        }
      } catch (error: any) {
        console.error("Unexpected error during login:", error);
        toast.error("Unexpected error occurred");
      }
    },
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Skeleton height={40} width={200} style={{ marginBottom: "1rem" }} />
          <div className={styles.form}>
            <Skeleton height={30} width={`100%`} />
            <Skeleton height={30} width={`100%`} />
            <Skeleton height={40} width={150} />
          </div>
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
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p
          className={`${styles.heading} ${styles.center} ${styles.mainHeading}`}
        >
          Login Yourself
        </p>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.inputContainer}>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="text"
              id="email"
              className={
                formik.touched.email && formik.errors.email
                  ? styles.inputBoxError
                  : ""
              }
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type="password"
              id="password"
              className={
                formik.touched.password && formik.errors.password
                  ? styles.inputBoxError
                  : ""
              }
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className={styles.error}>{formik.errors.password}</div>
            )}
          </div>

          <div className={styles.inputContainer}>
            <Button
              variant="primary"
              type="submit"
              disabled={!formik.dirty || !formik.isValid || loading}
            >
              Login
            </Button>
          </div>
        </form>

        <p
          className={`${styles.heading} ${styles.center} ${styles.mainHeading}`}
        >
          if already registerd ? Go to{" "}
          <NavLink className={styles.link} to="/register">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}
