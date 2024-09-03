const world = "World";

// Linke Seite der props ist sozusagen der Inhalt
// Die rechte Seite ist die Darstellung von dem Type
export function hello({ who = world }: { who: string }) {
  return `Hello ${who}`;
}
