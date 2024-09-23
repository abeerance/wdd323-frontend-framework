import { ReactNode } from "react";
import styles from "./cards.module.css";

// export const Card = () => {
//   const [count, setCount] = useState(0);

//   const add = () => {
//     setCount(count + 1);
//   };

//   const minus = () => {
//     setCount(count - 1);
//   };

//   return (
//     <div className={styles["card"]}>
//       <div>
//         <h2 className={styles.card__title}>Click Counter</h2>
//         <p className={styles["card__description"]}>This is just a simple click counter</p>
//       </div>
//       <div className={styles["card__content"]}>
//         <p className={styles["card__paragraph--bold"]}>
//           Current count:
//           <span className={styles["card__paragraph"]}>{` ${count}`}</span>
//         </p>
//         {/*  1. Möglichkeit ist mit einem label props */}
//         <div className={styles["card__buttons"]}>
//           <ButtonWithLabel label='Plus' handleClick={add} />
//           <ButtonWithLabel label='Minus' handleClick={minus} />
//         </div>
//         {/*  2. Möglichkeit ist mit einem children props */}
//         <div className={styles["card__buttons"]}>
//           <ButtonWithChildren handleClick={add}>
//             <p>Plus with children</p>
//           </ButtonWithChildren>
//           <ButtonWithChildren handleClick={minus}>
//             <p>Minus with children</p>
//           </ButtonWithChildren>
//         </div>
//       </div>
//     </div>
//   );
// };

interface CardProps {
  cardHeaderLabel: string;
  cardContent: ReactNode;
  cardFooter?: ReactNode;
}

// Lösungsvariante #1 -> da seid ihr limitiert, weil die Komponente
// eine gewisse Struktur vorgibt
export const Card = ({ cardHeaderLabel, cardContent, cardFooter }: CardProps) => {
  return (
    <div className={styles["card"]}>
      <div className={styles["card__header"]}>
        <h1>{cardHeaderLabel}</h1>
      </div>
      <div className={styles["card__content"]}>{cardContent}</div>
      <div className={styles["card__footer"]}>{cardFooter}</div>
    </div>
  );
};

// Lösungsvariante #2 -> da seid ihr extrem frei je nachdem wie ihr die
// Card umsetzen möchtet, da ihr viel modularer unterwegs seid
export const ModularCard = ({ children }: { children: ReactNode }) => {
  return <div className={styles["card"]}>{children}</div>;
};

export const CardHeader = ({ title }: { title: string }) => {
  return <h1 className={styles["card__header"]}>{title}</h1>;
};

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <div className={styles["card__content"]}>{children}</div>;
};

export const CardFooter = ({ children }: { children: ReactNode }) => {
  return <div className={styles["card__footer"]}>{children}</div>;
};
