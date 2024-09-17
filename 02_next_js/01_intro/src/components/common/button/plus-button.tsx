import styles from "./button.module.css";

interface PlusButtonProps {
  add: () => void;
}

export const PlusButton = ({ add }: PlusButtonProps) => {
  return (
    <button className={styles.button} onClick={add}>
      +
    </button>
  );
};
