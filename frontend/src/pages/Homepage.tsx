import Products from "../components/Products";
import BannerImagesSlider from "../components/BannerImagesSlider";

import styles from "../styles/Homepage.style.module.css";

export default function Homepage() {
  return (
    <div className={styles.homepageContainer}>
      <h1>Discover Your styles with Aura Styles.</h1>
      <h2 className={styles.verticalMargin}>
        Explore our collections and find the perfect <br />
        look for any occasion. Style meets elegance at Aura Styles.
      </h2>

      {/* Banner Images Slider has its own skeleton */}
      <BannerImagesSlider />
      {/* Products Images shows here */}
      <Products />
    </div>
  );
}
