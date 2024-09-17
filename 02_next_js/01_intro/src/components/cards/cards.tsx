import styles from "./cards.module.css";

export const Card = () => {
  return (
    <div className={styles["card"]}>
      <div>
        <h2 className={styles["card__title"]}>Click Counter</h2>
        <p className={styles["card__description"]}>This is just a simple click counter</p>
      </div>
      <div className={styles["card__content"]}>
        <p>
          <span></span>
        </p>
        <div></div>
      </div>
    </div>
  );
};
