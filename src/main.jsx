import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "enter"];
const splashSheep = [
  ["-24%", "-12%", "54vw", "-7deg", 0.58],
  ["16%", "-10%", "58vw", "4deg", 0.48],
  ["54%", "-8%", "56vw", "-3deg", 0.52],
  ["-14%", "12%", "62vw", "5deg", 0.5],
  ["25%", "16%", "64vw", "-5deg", 0.57],
  ["63%", "14%", "60vw", "3deg", 0.48],
  ["-28%", "39%", "68vw", "-4deg", 0.54],
  ["17%", "38%", "72vw", "4deg", 0.5],
  ["63%", "40%", "66vw", "-5deg", 0.52],
  ["-10%", "68%", "60vw", "5deg", 0.45],
  ["36%", "66%", "70vw", "-3deg", 0.5],
  ["76%", "70%", "62vw", "4deg", 0.43],
];

function SheepArt({ variant = "full" }) {
  const src = variant === "pattern" ? "/splash-sheep.png" : "/sheep-sprite.png";
  return <img className={`sheep-art sheep-art-${variant}`} src={src} alt="" draggable="false" />;
}

function Sheep({ phase, count }) {
  return (
    <div className={`sheep sheep-${phase}`} key={`${count}-${phase}`} aria-hidden="true">
      <SheepArt />
    </div>
  );
}

function Splash({ onEnter }) {
  return (
    <button className="splash" onClick={onEnter} aria-label="Open sheep counter">
      <div className="pattern">
        {splashSheep.map(([x, y, size, rotate, opacity], index) => (
          <span
            className="pattern-sheep"
            key={index}
            style={{ "--x": x, "--y": y, "--size": size, "--rotate": rotate, "--opacity": opacity }}
          >
            <SheepArt variant="pattern" />
          </span>
        ))}
      </div>
      <div className="title-pill">
        <h1>SHEEP COUNTER</h1>
        <p>by cliviagao</p>
      </div>
    </button>
  );
}

function CounterApp() {
  const [screen, setScreen] = useState("splash");
  const [expected, setExpected] = useState(1);
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState("enter");
  const [shake, setShake] = useState(false);

  const displayValue = useMemo(() => value || "", [value]);

  function submit() {
    if (Number(value) !== expected) {
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }

    setPhase("exit");
    setValue("");
    window.setTimeout(() => {
      setExpected((current) => current + 1);
      setPhase("enter");
    }, 760);
  }

  function pressKey(key) {
    if (key === "clear") {
      setValue("");
      return;
    }
    if (key === "enter") {
      submit();
      return;
    }
    setValue((current) => `${current}${key}`.replace(/^0+(?=\d)/, ""));
  }

  return (
    <main className="page">
      <section className="app-frame" aria-label="Sheep Counter">
        {screen === "splash" ? (
          <Splash onEnter={() => setScreen("counter")} />
        ) : (
          <div className="counter-screen">
            <div className="app-bar">
              <strong>earth online</strong>
            </div>
            <div className="night">
              <div className="moon" />
              <div className="hill hill-back" />
              <div className="hill hill-front" />
              <Sheep phase={phase} count={expected} />
            </div>
            <div
              className={`answer ${shake ? "shake" : ""}`}
              role="status"
              aria-label={`Current answer ${displayValue || "empty"}`}
            >
              <span className="answer-display">{displayValue}</span>
            </div>
            <div className="keypad" aria-label="Number pad">
              {keys.map((key) => (
                <button
                  className={`key key-${key}`}
                  key={key}
                  type="button"
                  onClick={() => pressKey(key)}
                  aria-label={key === "clear" ? "Clear" : key === "enter" ? "Enter" : key}
                >
                  {key === "clear" ? "x" : key === "enter" ? ">" : key}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<CounterApp />);
