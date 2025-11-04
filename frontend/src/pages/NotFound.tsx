import { useNavigate } from "react-router-dom";
import styles from "../styles/NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.notFoundContainer}>
      OOp's The page you are looking for is not found. Navigate back to home
      page{" "}
      <span className={styles.span} onClick={() => navigate("/")}>
        Press Me !
      </span>
    </div>
  );
}
