import { Card } from "@/components/cards/cards";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles["page__container"]}>
      <h1 className={styles["page__title"]}>Hello My very first React App</h1>
      <h2 className={styles["page__subtitle"]}>This will be a simple click counter</h2>
      <Card />
      {/*
      - Das Ziel ist, dass die Card-Komponent Komplett reusable ist
      - Das heisst, wir haben einen Card-Container, Card-Header, Card-Content, Card-Footer (evtl. optional) -> befinden sich im card.tsx

      <Card>
        <CardHeader>
          Inhalt von dem Card Header inkl. description
        <CardHeader />
        <CardContent>
          Inhalt von dem Card Content inkl. paragraph
        <CardContent />
        <CardFooter>
          Inhalt von dem Card Footer inkl. buttons
        <CardFooter />
      <Card />
      */}
    </div>
  );
}
