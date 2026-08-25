import { Icon } from "./Icon";
import Reveal from "./Reveal";
import { experiences } from "../lib/data";

function TimelineItem({ experience, active, delay }) {
  return (
    <Reveal as="div" className="timeline-item" delay={delay}>
      <div className={`timeline-marker ${active ? "active" : ""}`}></div>
      <div className={`timeline-content ${active ? "active" : ""}`}>
        {experience.image && (
          <div className="timeline-image-preview" aria-hidden="true">
            <div className="timeline-preview-header">
              <span className="timeline-preview-dot"></span>
              <span>Project preview</span>
            </div>
            <div className="timeline-preview-stage">
              <img src={experience.image} alt="" loading="lazy" />
            </div>
            <div className="timeline-preview-copy">
              <div className="timeline-preview-caption">{experience.title}</div>
              <p className="timeline-preview-description">{experience.description}</p>
            </div>
          </div>
        )}
        <div className="timeline-period-wrapper">
          <div className="timeline-period">{experience.period}</div>
          {experience.duration && (
            <span className="timeline-duration">{experience.duration}</span>
          )}
        </div>
        <h3 className="timeline-title">{experience.title}</h3>
        <p className="timeline-location">
          <i className="fa-solid fa-building"></i>
          {experience.company}
        </p>
        <p className="timeline-description">{experience.description}</p>
        {experience.link && (
          <a
            className="timeline-link"
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {experience.linkLabel || "View project"}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        )}
        {experience.tags?.length > 0 && (
          <div className="timeline-tags">
            {experience.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function ExperienceSection() {
  return (
    <section className="experience-section" id="experience">
      <div className="section-header">
        <Icon name="briefcase" size={24} color="#728559" />
        <h2>
          Experience <span className="header-count-badge">{experiences.length}</span>
        </h2>
      </div>
      <p className="section-subtitle">Professional experience, selected projects, and contributions</p>

      <div className="timeline">
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.title}
            experience={exp}
            active={index === 0}
            delay={Math.min(index, 5) * 70}
          />
        ))}
      </div>
    </section>
  );
}
