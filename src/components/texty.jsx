import React, { useEffect, useState } from "react";

const Typewriter = () => {
  const text = "scroll for animation";
  const typeSpeed = 10;    // ms per character typing
  const deleteSpeed = 30;  // ms per character deleting
  const waitTime = 1000;   // wait 2 seconds after typing

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!isDeleting && index < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, typeSpeed);
    } else if (!isDeleting && index === text.length) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, waitTime);
    } else if (isDeleting && index > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.slice(0, index - 1));
        setIndex(index - 1);
      }, deleteSpeed);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text]);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#transparent",
      color: "ForestGreen",
      fontFamily: "monospace, monospace",
      fontSize: "7rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      userSelect: "none",
      zIndex: 9999, // on top of everything
      pointerEvents: "none", // to avoid blocking interactions
      whiteSpace: "nowrap",
      borderRight: displayedText ? "2px solid #eee" : "none",
      paddingRight: "2px",
    }}>
      {displayedText}
    </div>
  );
};

export default Typewriter;
