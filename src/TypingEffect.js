import React, { useEffect, useState } from "react";

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false); // New state to track typing completion

  useEffect(() => {
    if (cursorPosition < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[cursorPosition]);
        setCursorPosition((prevPosition) => prevPosition + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      setIsTypingComplete(true); // Set typing completion flag when done
    }
  }, [text, speed, cursorPosition]);

  const textBeforeCursor = displayedText.slice(0, cursorPosition);
  const textAfterCursor = displayedText.slice(cursorPosition);

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      {textBeforeCursor}
      {!isTypingComplete && <span className="cursor">|</span>}{" "}
      {/* Only show cursor if typing is not complete */}
      {textAfterCursor}
    </div>
  );
};

export default TypingEffect;
