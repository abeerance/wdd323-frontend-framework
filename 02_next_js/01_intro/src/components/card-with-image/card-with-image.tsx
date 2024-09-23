import Link from "next/link";
import styles from "./card-with-image.module.css";
import Image from "next/image";

export const BlogArticles = [
  {
    title: "Best phone ever",
    imageUrl:
      "https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: "Discover why this phone stands out as the best choice for both performance and design, making it the ultimate device for tech enthusiasts and everyday users alike.",
    slug: "best-phone-ever",
  },
  {
    title: "My second blog article",
    imageUrl:
      "https://images.unsplash.com/photo-1726944350425-9109d1c0806d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: "In my second article, I delve into the latest technological advancements and share insights on how these trends are shaping the future of innovation and connectivity.",
    slug: "my-second-blog-article",
  },
  {
    title: "Ultimate Guide to Remote Work",
    imageUrl:
      "https://images.unsplash.com/photo-1726996573743-d0682be18d02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    lead: "This comprehensive guide explores the best practices, tools, and strategies for working remotely, helping you stay productive and maintain a healthy work-life balance.",
    slug: "ultimate-guide-remote-work",
  },
  {
    title: "Top 10 Travel Destinations",
    imageUrl:
      "https://images.unsplash.com/photo-1726742942147-1f87c0a19d0b?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    lead: "Looking to satisfy your wanderlust? Here’s our curated list of the top 10 travel destinations you must visit in 2024, packed with unique experiences and breathtaking scenery.",
    slug: "top-10-travel-destinations",
  },
];

interface CardWithImageProps {
  imageUrl: string;
  title: string;
  lead: string;
  slug: string;
}

export const CardWithImage = ({ imageUrl, title, lead, slug }: CardWithImageProps) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__image"]}>
        <Image src={imageUrl} alt='' fill />
      </div>
      <h1 className={styles["card__title"]}>{title}</h1>
      <p className={styles["card__lead"]}>{lead}</p>
      <Link href={`/${slug}`} className={styles["card__button"]}>
        Read more
      </Link>
    </div>
  );
};
