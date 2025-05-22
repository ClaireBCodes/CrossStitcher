import "../styles/componentStyles.css";
import threadstack from "../assets/thread-stack.png";


export function HeaderBar() {
  return (
    <header className="header-bar grad-pri-sec">
      <h1>
        <img src={threadstack} style={{ height: 50 }} />
        <span style={{ paddingInline: "0.6em 0.6em" }}>Happy Stitch</span>
        <img src={threadstack} style={{ height: 50 }} />
      </h1>
    </header>
  );
}
