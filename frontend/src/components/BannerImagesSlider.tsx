import { useSelector } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import type { RootState } from "../redux/store";
import styles from "../styles/BannerImagesSlider.style.module.css";

export default function BannerImagesSlider() {
  const { settings, loading, error } = useSelector(
    (state: RootState) => state.adminSettings
  );

  const allBannerImages =
    settings?.data.flatMap((setting) => setting.bannerImages) || [];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 522,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className={styles.margin}>
        <Slider {...sliderSettings}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <Skeleton
                height={400}
                width="100%"
                baseColor="#e5e5e7ff"
                borderRadius="2rem"
              />
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.area}>
        <p className={styles.error}>Error in loading banner images</p>
      </div>
    );
  }

  return (
    <div className={styles.margin}>
      <Slider {...sliderSettings}>
        {allBannerImages.map((image) => (
          <div key={image.fileId}>
            <img src={image.url} alt="banner" className={styles.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
