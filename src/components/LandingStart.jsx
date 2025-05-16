import "../styles/componentStyles.css";

export function LandingStart() {
  return (
    <div className="landing-start">
      <section className="landing-info">
        <h3>Welcome to Happy Stitch pattern generator!</h3>
        <p>
          To get started, please upload an image below or select a blank canvas
          option.
        </p>
        <p>Adjust the dimensions and number of colors to suit your needs.</p>
      </section>
      <section className="landing-actions">
        <button className="landing-button">Upload Image</button>
        <button className="landing-button">Blank Canvas</button>
      </section>
    </div>
  );
}
