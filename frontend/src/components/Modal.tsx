import { createPortal } from "react-dom";
import type { FormikProps } from "formik";

import Input from "./Input";
import Label from "./Label";
import Button from "./Button";

import styles from "../styles/Modal.style.module.css";

interface Field {
  htmlFor: string;
  name: string;
  id?: string;
  label: string;
  type?: string;
  placeholder?: string;
}

interface ModalProps {
  isOpen: boolean;
  title: string;
  fields: Field[];
  onClose: () => void;
  formik: FormikProps<any>;
}

export default function Modal({
  isOpen,
  title,
  fields,
  onClose,
  formik,
}: ModalProps) {
  if (!isOpen) return null;
  return createPortal(
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.subContainer}>
          <h2 className={styles.heading}>{title}</h2>
          <span className={styles.span} onClick={onClose}>
            &times;
          </span>
        </div>

        <form onSubmit={formik.handleSubmit}>
          {fields.map((field) => (
            <div className={styles.inputContainer} key={field.name}>
              <Label htmlFor={field.htmlFor}>{field.label}</Label>

              {field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  id={field.id}
                  multiple
                  onChange={(event) => {
                    const files = (event.target as HTMLInputElement).files;
                    if (files) {
                      formik.setFieldValue(field.name, Array.from(files));
                    }
                  }}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                />
              ) : (
                <Input
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={field.placeholder}
                />
              )}

              {formik.touched[field.name] && formik.errors[field.name] ? (
                <div style={{ color: "red" }}>
                  {formik.errors[field.name] as string}
                </div>
              ) : null}
            </div>
          ))}

          <div className={styles.buttonContainer}>
            <Button
              type="button"
              variant="danger"
              className={styles.button}
              onClick={() => {
                formik.resetForm();
                onClose();
              }}
            >
              Cancel
            </Button>

            <Button className={styles.button} type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
