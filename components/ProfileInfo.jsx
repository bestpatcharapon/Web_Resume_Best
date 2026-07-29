"use client";

import { useState } from "react";
import { Icon, IconFilled } from "./Icon";
import TypingName from "./TypingName";

const INFO_CARDS = [
  { icon: "location", title: "Location", value: "Chiang Mai, TH" },
  { icon: "email", title: "Email", value: "Patcharaponyo65@gmail.com" },
  { icon: "cake", title: "Birthday", value: "December 4, 2003" },
  { icon: "graduation", title: "Faculty", value: "Computer Engineering" },
  {
    icon: "graduation",
    title: "University",
    value: "Rajamangala University of Technology Lanna, Thailand",
  },
  {
    icon: "sparkle",
    title: "Primary Tools",
    value: "Ruby on Rails · Bruno · Manual Testing",
  },
];

export default function ProfileInfo() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <div className="profile-info">
      <div className="profile-header">
        <TypingName />
        <p className="role">
          <Icon name="sparkle" size={20} />
          Software Developer | Software Testing
        </p>
        <p className="description">
          Test Engineer with a development background, specializing in software
          testing and quality assurance. Experienced in manual testing,
          end-to-end testing, test case design, execution, and defect
          reporting. Strong understanding of SDLC and Agile practices, with
          hands-on experience in API validation and dashboard data
          verification. Technical background in web development using Ruby on
          Rails and modern web technologies, with strong analytical thinking
          and problem-solving skills. Passionate about delivering reliable,
          high-quality software while contributing to development when needed.
        </p>
      </div>

      <div className="info-grid">
        {INFO_CARDS.map((card) => (
          <div className="info-card" key={card.title}>
            <Icon name={card.icon} size={20} />
            <div>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="action-buttons">
        <a
          href="https://github.com/bestpatcharapon"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFilled name="github" size={20} />
          GitHub Profile
        </a>
        <a
          href="https://www.linkedin.com/in/patcharapon-yoriya-153459357/"
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFilled name="linkedin" size={20} />
          LinkedIn
        </a>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsCvOpen(true)}
        >
          <Icon name="download" size={20} />
          Download CV
        </button>
      </div>

      {isCvOpen && (
        <div
          className="cv-modal-overlay"
          onClick={() => setIsCvOpen(false)}
        >
          <div
            className="cv-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cv-modal-header">
              <h3>Patcharapon_CV.pdf</h3>
              <div className="cv-modal-actions">
                <a
                  href="/Patcharapon_CV.pdf"
                  download="Patcharapon_CV.pdf"
                  className="btn btn-outline"
                >
                  <Icon name="download" size={18} />
                  Download
                </a>
                <button
                  type="button"
                  className="cv-modal-close"
                  onClick={() => setIsCvOpen(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
            </div>
            <iframe
              src="/Patcharapon_CV.pdf"
              title="Patcharapon CV"
              className="cv-modal-frame"
            />
          </div>
        </div>
      )}
    </div>
  );
}
