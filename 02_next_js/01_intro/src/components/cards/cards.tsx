"use client";

import { useState } from "react";
import styles from "./cards.module.css";
import { ButtonWithChildren, ButtonWithLabel } from "../common/button/button";

export const Card = () => {
  const [count, setCount] = useState(0);

  const add = () => {
    setCount(count + 1);
  };

  const minus = () => {
    setCount(count - 1);
  };

  return (
    <div className={styles["card"]}>
      <div>
        <h2 className={styles.card__title}>Click Counter</h2>
        <p className={styles["card__description"]}>This is just a simple click counter</p>
      </div>
      <div className={styles["card__content"]}>
        <p className={styles["card__paragraph--bold"]}>
          Current count:
          <span className={styles["card__paragraph"]}>{` ${count}`}</span>
        </p>
        {/*  1. Möglichkeit ist mit einem label props */}
        <div className={styles["card__buttons"]}>
          <ButtonWithLabel label='Plus' handleClick={add} />
          <ButtonWithLabel label='Minus' handleClick={minus} />
        </div>
        {/*  2. Möglichkeit ist mit einem children props */}
        <div className={styles["card__buttons"]}>
          <ButtonWithChildren handleClick={add}>
            <p>Plus with children</p>
          </ButtonWithChildren>
          <ButtonWithChildren handleClick={minus}>
            <p>Minus with children</p>
          </ButtonWithChildren>
        </div>
      </div>
    </div>
  );
};
