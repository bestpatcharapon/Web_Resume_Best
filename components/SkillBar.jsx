"use client";

import { useInView } from "../lib/useInView";

export default function SkillBar({ percentage }) {
  const [ref, inView] = useInView();

  return (
    <div className="skill-bar" ref={ref}>
      <div className="skill-progress" style={{ width: inView ? `${percentage}%` : "0%" }} />
    </div>
  );
}
