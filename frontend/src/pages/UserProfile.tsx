import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Button";

import type { AppDispatch, RootState } from "../redux/store";

import { loggedUserThunk } from "../redux/features/user/loggedUserSlice";

import styles from "../styles/UserProfile.style.module.css";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.loggedUser
  );
  const loggedUser = user?.data;

  useEffect(
    function () {
      dispatch(loggedUserThunk());
    },
    [dispatch]
  );

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <ScaleLoader color="black" loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <div className={styles.avatarSection}>
          <img
            src={loggedUser?.avatar}
            alt={loggedUser?.name}
            className={styles.avatar}
          />
          <h2 className={styles.name}>{loggedUser?.name}</h2>
          <p className={styles.role}>
            {loggedUser?.role
              ? loggedUser.role.charAt(0).toUpperCase() +
                loggedUser.role.slice(1)
              : ""}
          </p>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span>{loggedUser?.email}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Phone:</span>
            <span>{loggedUser?.phone}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Address:</span>
            <span>
              {loggedUser?.street}, {loggedUser?.state}, {loggedUser?.country} -{" "}
              {loggedUser?.postalCode}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Provider:</span>
            <span>{loggedUser?.provider}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Verified:</span>
            <span>{loggedUser?.isVerified ? "✅ Yes" : "❌ No"}</span>
          </div>
          <Button
            variant="secondary"
            onClick={() =>
              navigate("/register", { state: { id: loggedUser?._id } })
            }
          >
            <FaEdit size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
