import { Icon } from "./Icon";
import Reveal from "./Reveal";
import SkillBar from "./SkillBar";
import { softSkills, techSkillsGrouped } from "../lib/data";

function SkillItem({ iconClass, name, percentage, delay }) {
  return (
    <Reveal as="div" className="skill-item-enhanced" delay={delay}>
      <div className="skill-header">
        <i className={`${iconClass} skill-icon`}></i>
        <span className="skill-name">{name}</span>
      </div>
      <SkillBar percentage={percentage} />
    </Reveal>
  );
}

function MarqueeRow({ group, idx }) {
  const fillCount = group.skills.length <= 3 ? 3 : 2;
  const itemsPerSet = group.skills.length * fillCount;
  const duration = Math.round(itemsPerSet * 2.5 * 10) / 10;

  return (
    <div className="marquee-row">
      <div className="marquee-category-label">{group.category}</div>
      <div className="marquee-track-wrapper">
        <div
          className={`marquee-track ${idx % 2 === 0 ? "scroll-left" : "scroll-right"}`}
          style={{ "--marquee-duration": `${duration}s` }}
        >
          {[0, 1].map((set) => (
            <div className="marquee-set" key={set}>
              {Array.from({ length: fillCount }).flatMap((_, f) =>
                group.skills.map((skill) => (
                  <div className="marquee-skill-item" key={`${f}-${skill.name}`}>
                    <div className="marquee-skill-icon">
                      <i className={skill.icon}></i>
                    </div>
                    <div className="marquee-skill-info">
                      <span className="marquee-skill-name">{skill.name}</span>
                      <span className="marquee-skill-category">
                        {group.category.split("•")[0].trim()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-grid">
        <div className="card">
          <div className="card-header">
            <Icon name="heart" size={20} color="#e74c3c" />
            Soft Skills
          </div>
          <div className="skills-grid-two-col">
            {softSkills.map((skill, index) => (
              <SkillItem key={skill.name} {...skill} delay={index * 60} />
            ))}
          </div>
          <p className="footer-note" style={{ marginTop: "0.75rem" }}>
            <Icon name="sparkle" size={14} />
            Continuously improving soft skills
          </p>
        </div>

        <div className="card marquee-card">
          <div className="card-header">
            <Icon name="terminal" size={20} color="#3498db" />
            Technical Skills
          </div>

          <div className="marquee-skills-container">
            {techSkillsGrouped.map((group, idx) => (
              <MarqueeRow key={group.category} group={group} idx={idx} />
            ))}
          </div>

          <p className="footer-note" style={{ marginTop: "0.75rem" }}>
            <Icon name="sparkle" size={14} />
            Always learning new technologies
          </p>
        </div>
      </div>
    </section>
  );
}
