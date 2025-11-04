import styles from "../styles/Button.style.module.css";

export default function Button({
  className,
  children,
  variant,
  onClick,
  type,
  disabled,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "outline" | "back";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const variantClass =
    variant === "primary"
      ? styles.buttonPrimary
      : variant === "secondary"
      ? styles.buttonSecondary
      : variant === "outline"
      ? styles.buttonOutline
      : variant === "danger"
      ? styles.buttonDanger
      : variant === "back"
      ? styles.buttonBack
      : "";
  return (
    <button
      className={`${styles.buttonBase} ${styles.buttonRing} ${variantClass} ${
        className || ""
      }`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
