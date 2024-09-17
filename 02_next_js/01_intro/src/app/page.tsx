import { Card } from "@/components/cards/cards";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["page__container"]}>
      <h1 className={styles["page__title"]}>Hello My very first React App</h1>
      <h2 className={styles["page__subtitle"]}>This will be a simple click counter</h2>
      <Card />
    </div>
  );
}
