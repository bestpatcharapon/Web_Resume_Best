"use client";

import { useInView } from "../lib/useInView";

export default function Reveal({ children, className = "", delay = 0, as: Tag = "div", style, ...rest }) {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms", ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
