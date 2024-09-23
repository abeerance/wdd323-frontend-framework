import styles from "./page.module.css";
import { BlogCardOverview } from "./views/blog-overview/blog-overview";

export default function Home() {
  return (
    <div className={styles["page__container"]}>
      <h1 className={styles["page__title"]}>Hello My very first React App</h1>
      <h2 className={styles["page__subtitle"]}>This will be a simple click counter</h2>
      {/* <Card
        cardHeaderLabel='Card Title'
        cardContent={
          <>
            <p>This is a card Content</p>
            <p>you can put anything in here you want</p>
          </>
        }
        cardFooter={
          <>
            <button>Submit</button>
            <button>Cancel</button>
          </>
        }
      /> */}
      <BlogCardOverview />
    </div>
  );
}
