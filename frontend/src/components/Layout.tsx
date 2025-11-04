import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { FaOpencart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

import Input from "./Input";
import Button from "./Button";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "../styles/Layout.style.module.css";

import type { AppDispatch, RootState } from "../redux/store";
import { logoutUser } from "../redux/features/user/userLoginSlice";
import { fetchAdminSettings } from "../redux/features/adminSetting/adminSettingSlice";

export default function Layout() {
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { carts } = useSelector((state: RootState) => state.carts);
  const { user } = useSelector((state: RootState) => state.loginUser);
  const { settings, loading } = useSelector(
    (state: RootState) => state.adminSettings
  );

  const contactEmail = settings?.data?.[0]?.contactEmail;
  const contactPhone = settings?.data?.[0]?.contactPhone;

  useEffect(() => {
    dispatch(fetchAdminSettings());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    navigate("/");
  }

  function gotoProfile() {
    setIsDropdownOpen(false);
    navigate("/myProfile");
  }

  function gotoOrders() {
    setIsDropdownOpen(false);
    navigate("/orders");
  }

  return (
    <>
      <header className={styles.header}>
        {/* Left: Logo */}
        <div className={styles.left}>
          <div className={styles.logoWrap} onClick={() => navigate("/")}>
            <img
              className={styles.image}
              src="./logo.png"
              alt="Aura Styles Logo"
            />
            <span className={styles.brand}>Aura Styles</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className={styles.center}>
          <Input
            type="search"
            placeholder="Search by brand name or category..."
            className={styles.searchInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Right: Cart + Auth + User */}
        <div className={styles.right}>
          <div
            className={styles.cartContainer}
            onClick={() => navigate("/wishlist")}
            role="button"
            aria-label="Go to wishlist page"
          >
            <span className={styles.cartIcon}>
              <FaRegHeart size={22} />
            </span>
          </div>

          <div
            className={styles.cartContainer}
            onClick={() => navigate("/cart")}
            role="button"
            aria-label="Go to cart"
          >
            <span className={styles.cartIcon}>
              <FaOpencart size={22} />
            </span>
            {(carts?.length ?? 0) > 0 && (
              <span className={styles.cartInfoText}>{carts?.length ?? 0}</span>
            )}
          </div>

          {!user ? (
            <div className={styles.authLinks}>
              <NavLink className={styles.link} to="/register">
                Register
              </NavLink>
              <NavLink className={styles.link} to="/login">
                Login
              </NavLink>
            </div>
          ) : (
            <div className={styles.userWrap} ref={dropdownRef}>
              <Button
                className={styles.userBtn}
                onClick={() => setIsDropdownOpen((s) => !s)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <img
                  className={styles.userImage}
                  src={
                    typeof user?.loggedUser?.avatar === "string"
                      ? user.loggedUser.avatar
                      : "/profile.jpg"
                  }
                  alt={user?.loggedUser?.name || "User"}
                />
                <span className={styles.userText}>
                  {user?.loggedUser?.name ?? "User"}
                </span>
                <FiChevronDown />
              </Button>

              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownItem} onClick={gotoProfile}>
                    My Profile
                  </button>
                  <button className={styles.dropdownItem} onClick={gotoOrders}>
                    My Orders
                  </button>
                  <div className={styles.dropdownDivider} />
                  <button
                    className={styles.dropdownItem}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <Outlet context={{ query }} />
      </main>

      <footer className={styles.footer}>
        <p className={styles.contact}>
          Contact us at: <br />
          Email :
          {loading ? (
            <Skeleton
              width={180}
              height={16}
              style={{ display: "inline-block", marginLeft: 8 }}
            />
          ) : (
            <a className={styles.contactLink} href={`mailto:${contactEmail}`}>
              {" "}
              {contactEmail}
            </a>
          )}
          <br />
          Mobile :
          {loading ? (
            <Skeleton
              width={140}
              height={16}
              style={{ display: "inline-block", marginLeft: 8 }}
            />
          ) : (
            <a className={styles.contactLink} href={`tel:${contactPhone}`}>
              {" "}
              {contactPhone}
            </a>
          )}
        </p>
        <h2 className={styles.textCenter}>
          &copy; by Aura Collections. All rights reserved by Aura Styles.
        </h2>
      </footer>
    </>
  );
}
