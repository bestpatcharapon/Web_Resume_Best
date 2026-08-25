import { Icon } from "./Icon";

export default function ProfileStack() {
  return (
    <div className="profile-stack">
      <div className="profile-card card-main">
        <img src="/me.jpeg" alt="Best Patcharapon - Software Developer" />
        <div className="profile-overlay">
          <span className="profile-name">Patcharapon Yoriya (Best)</span>
        </div>
        <div className="internship-badge">
          <Icon name="sparkle" size={16} />
          Open to Work
        </div>
      </div>
    </div>
  );
}
