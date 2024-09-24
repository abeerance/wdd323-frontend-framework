import Link from "next/link";

// refactored navigation component so that it can be used in the layout
// refactoring makes sense, as long as the logic of a component is encapsulated
export const Navigation = () => {
  return (
    <nav style={{ padding: "16px", width: "100%", display: "flex", justifyContent: "center" }}>
      <ul style={{ display: "flex", gap: "16px", listStyle: "none" }}>
        <li>
          {/* this is a link to the root of the app */}
          <Link href='/'>home</Link>
        </li>
        <li>
          {/*
          It is important to always write a "/" before the actual
          route. If you don't, the router will just stack the routes.
          E.g. if you're in the blog page, and then navigate to the articales
          where the href is "articles", this will direct you to the
          route /blog/articles.
          To not encounter that, we always write a "/" before the route
          */}
          <Link href='/articles'>articles</Link>
        </li>
        <li>
          <Link href='/blog'>blog</Link>
        </li>
        <li>
          <Link href='/contact'>contact</Link>
        </li>
      </ul>
    </nav>
  );
};
