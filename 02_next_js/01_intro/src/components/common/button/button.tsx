import { ReactNode } from "react";
import styles from "./button.module.css";

// 1. Möglichkeit ist mit einem label props
// Diese Möglichkeit wird genutzt, wenn eine Komponente
// immer gleich aussehen soll (content)
// und es hat nicht mehrere Kinder

interface ButtonWithLabelProps {
  label: string;
  handleClick: () => void;
}

export const ButtonWithLabel = ({ label, handleClick }: ButtonWithLabelProps) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {label}
    </button>
  );
};

// 2. Möglichkeit ist mit einer children props
// Diese Möglichkeit wird vor allem genutzt, wenn man
// eine wirkliche reusable Komponente bauen möchte, bei dem
// der Inhalt durch children komplett custom ist

interface ButtonWithChildrenProps {
  handleClick: () => void;
  children: ReactNode;
}

export const ButtonWithChildren = ({ handleClick, children }: ButtonWithChildrenProps) => {
  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
};
