import { Icon } from "./Icon";
import Reveal from "./Reveal";
import { experiences } from "../lib/data";

function TimelineItem({ experience, active, delay }) {
  return (
    <Reveal as="div" className="timeline-item" delay={delay}>
      <div className={`timeline-marker ${active ? "active" : ""}`}></div>
      <div className={`timeline-content ${active ? "active" : ""}`}>
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
      <p className="section-subtitle">My professional journey and internship experiences</p>

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
