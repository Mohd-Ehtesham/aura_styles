import styles from "../styles/Input.style.module.css";

interface InputProps {
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  checked?: boolean;
  className?: string;
  value?: string;
  accept?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function Input(props: InputProps) {
  if (props.type === "textarea") {
    return (
      <textarea
        className={`${styles.inputStyle} ${props.className || ""}`}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    );
  }

  return (
    <input
      className={`${styles.inputStyle} ${props.className || ""}`}
      type={props.type}
      name={props.name}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      accept={props.accept}
      checked={props.checked}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
}
