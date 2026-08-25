"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const LINKS = [
  { id: "about", icon: "user", label: "About" },
  { id: "skills", icon: "code", label: "Skills" },
  { id: "experience", icon: "briefcase", label: "Experience" },
];

export default function Header() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      document.querySelectorAll("section[id]").forEach((section) => {
        const top = section.offsetTop;
        if (scrollPosition >= top && scrollPosition < top + section.offsetHeight) {
          setActive(section.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="header">
      {LINKS.map((link) => (
        <a
          key={link.id}
          href={`#${link.id}`}
          className={`nav-link ${active === link.id ? "active" : ""}`}
          onClick={(e) => handleClick(e, link.id)}
        >
          <Icon name={link.icon} />
          {link.label}
        </a>
      ))}
    </header>
  );
}
