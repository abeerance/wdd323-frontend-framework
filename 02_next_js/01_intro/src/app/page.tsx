import styles from "./page.module.css";
import { BlogArticles, CardWithImage } from "../components/card-with-image/card-with-image";

export default function Home() {
  return (
    <div className={styles["page__container"]}>
      <h1 className={styles["page__title"]}>Hello My very first React App</h1>
      <h2 className={styles["page__subtitle"]}>This will be a simple click counter</h2>

      {BlogArticles.map((blog) => (
        <CardWithImage
          key={blog.slug}
          imageUrl={blog.imageUrl}
          title={blog.title}
          lead={blog.lead}
          slug={blog.slug}
        />
      ))}
    </div>
  );
}
