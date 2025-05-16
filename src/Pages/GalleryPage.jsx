import catPattern from "../assets/cat-pattern.png"
export function GalleryPage() {
  return (
    <>
      <h2> My Patterns </h2>
      <p>
        bootstrap cards with patterns [title, preview, date modified] for the
        users saved patterns
      </p>
      <img src={catPattern} style={{ height: 500 }} />
    </>
  );
}
