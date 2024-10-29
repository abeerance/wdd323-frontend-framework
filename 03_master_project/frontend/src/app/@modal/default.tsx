export default function Default() {
  // this is needed for the parallel route to work
  // because the parallel route has no page.tsx
  // if we don't return null, the page
  // will response with a 404 error
  return null;
}
