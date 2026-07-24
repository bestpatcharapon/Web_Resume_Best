"use client";

import { useState } from "react";
import { Icon } from "./Icon";

const CARDS = [
  {
    src: "/me.jpeg",
    alt: "Best Patcharapon - Software Developer",
    main: true,
  },
  {
    src: "https://img2.pic.in.th/5f28bf8468995c032c41bee6daf8e65d.jpg",
    alt: "Coding",
  },
  {
    src: "https://img2.pic.in.th/d835428a4f951c34e26b8008ec0d958a.jpg",
    alt: "Working",
  },
];

export default function ProfileStack() {
  const [current, setCurrent] = useState(0);

  const positionClass = (i) => {
    if (i === current) return "card-main";
    if (i === (current + 1) % CARDS.length) return "card-back-1";
    return "card-back-2";
  };

  return (
    <div className="profile-stack">
      {CARDS.map((card, i) => (
        <div
          key={card.src}
          className={`profile-card ${positionClass(i)}`}
          onClick={() => i !== current && setCurrent(i)}
        >
          <img src={card.src} alt={card.alt} />
          {card.main && (
            <>
              <div className="profile-overlay">
                <span className="profile-name">Patcharapon Yoriya (Best)</span>
              </div>
              <div className="internship-badge">
                <Icon name="sparkle" size={16} />
                Open to Work
              </div>
            </>
          )}
        </div>
      ))}
      <div className="stack-nav">
        {CARDS.map((_, i) => (
          <span
            key={i}
            className={`stack-dot ${i === current ? "active" : ""}`}
            data-index={i}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
