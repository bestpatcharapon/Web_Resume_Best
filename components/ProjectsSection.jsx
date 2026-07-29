"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import Reveal from "./Reveal";
import { projects } from "../lib/data";

function handleTiltMove(e) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const px = (e.clientX - rect.left) / rect.width - 0.5;
  const py = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(900px) translateY(-4px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
}

function handleTiltLeave(e) {
  e.currentTarget.style.transform = "";
}

function Lightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", onKey);
    };
  }, [image, onClose]);

  return (
    <div
      id="image-lightbox"
      className={`lightbox ${image ? "active" : ""}`}
      onClick={(e) => e.target.id === "image-lightbox" && onClose()}
    >
      <div className="lightbox-container">
        <span className="lightbox-close" onClick={onClose}>
          &times;
        </span>
        {image && <img src={image.src} alt={image.title} className="lightbox-image" />}
        <p className="lightbox-title">{image?.title || ""}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, onImageClick }) {
  return (
    <Reveal
      as="div"
      className="project-card card"
      delay={Math.min(index, 5) * 60}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
    >
      <div className="project-card-body">
        <div className="project-card-top">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
        </div>

        <div className="project-tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.images ? (
        <div className="project-preview project-preview-double">
          {project.images.map((img) => (
            <div
              key={img}
              className="project-image-wrap project-image-wrap-half"
              onClick={() => onImageClick({ src: img, title: project.title })}
            >
              <img src={img} alt={project.title} className="project-image-half clickable-image" loading="lazy" />
              <div className="image-hover-overlay">
                <span className="image-zoom-icon">
                  <i className="fa-solid fa-magnifying-glass-plus"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : project.image ? (
        <div className="project-preview">
          <div
            className="project-image-wrap"
            onClick={() => onImageClick({ src: project.image, title: project.title })}
          >
            <img
              src={project.image}
              alt={project.title}
              className="project-image clickable-image"
              loading="lazy"
            />
            <div className="image-hover-overlay">
              <span className="image-zoom-icon">
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </span>
              <span className="image-zoom-label">View</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="project-preview project-preview-icon">
          <div className="project-icon-large" style={{ color: project.color }}>
            <i className={project.icon}></i>
          </div>
        </div>
      )}
    </Reveal>
  );
}

export default function ProjectsSection() {
  const trackRef = useRef(null);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [activePage, setActivePage] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const totalPages = Math.ceil(projects.length / cardsPerPage);
  const remainder = projects.length % cardsPerPage;
  const placeholders = totalPages > 1 && remainder > 0 ? cardsPerPage - remainder : 0;

  useEffect(() => {
    const update = () => setCardsPerPage(window.innerWidth > 768 ? 3 : 1);
    update();
    let timer;
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(update, 250);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const trackWidth = track.clientWidth;
        const maxScroll = track.scrollWidth - trackWidth;
        let index;
        if (Math.abs(track.scrollLeft - maxScroll) < 10) {
          index = totalPages - 1;
        } else {
          index = Math.round(track.scrollLeft / trackWidth);
        }
        setActivePage(Math.max(0, Math.min(index, totalPages - 1)));
        ticking = false;
      });
    };
    track.addEventListener("scroll", onScroll);
    return () => track.removeEventListener("scroll", onScroll);
  }, [totalPages]);

  const scrollToPage = (index) => {
    const track = trackRef.current;
    if (!track || totalPages <= 1) return;
    const cards = track.querySelectorAll(".project-card");
    const card = cards[index * cardsPerPage];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <Icon name="folder" size={24} color="#728559" />
        <h2>
          Projects <span className="header-count-badge">{projects.length}</span>
        </h2>
      </div>
      <p className="section-subtitle">Featured projects and contributions</p>

      <div className="projects-carousel-container" id="projects-carousel-container">
        <div className="projects-track" id="projects-track" ref={trackRef}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onImageClick={setLightboxImage}
            />
          ))}
          {Array.from({ length: placeholders }).map((_, i) => (
            <div
              key={`ph-${i}`}
              className="project-card project-card-placeholder"
              style={{
                visibility: "hidden",
                border: "none",
                boxShadow: "none",
                background: "transparent",
              }}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="projects-nav-dots" id="projects-nav-dots">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`project-dot ${i === activePage ? "active" : ""}`}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => scrollToPage(i)}
              />
            ))}
          </div>
        )}
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
