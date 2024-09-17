import styles from "./button.module.css";

interface MinusButtonProps {
  minus: () => void;
}

export const MinusButton = ({ minus }: MinusButtonProps) => {
  return (
    <button className={styles.button} onClick={minus}>
      -
    </button>
  );
};
