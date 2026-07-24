"use client";

import { useEffect, useState } from "react";
import { typingTexts } from "../lib/data";

const CONFIG = {
  typeSpeed: 100,
  deleteSpeed: 50,
  pauseAfterType: 2000,
  pauseAfterDelete: 500,
  initialDelay: 800,
};

export default function TypingName() {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), CONFIG.initialDelay);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const currentText = typingTexts[textIndex];
    let timer;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timer = setTimeout(() => {
          setDisplay(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, CONFIG.typeSpeed);
      } else {
        timer = setTimeout(() => setIsDeleting(true), CONFIG.pauseAfterType);
      }
    } else {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplay(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, CONFIG.deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % typingTexts.length);
        }, CONFIG.pauseAfterDelete);
      }
    }
    return () => clearTimeout(timer);
  }, [started, charIndex, isDeleting, textIndex]);

  return (
    <h1 className="typing-name" id="typingName">
      {display}
    </h1>
  );
}
