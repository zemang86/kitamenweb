"use client";

import { useRef, useState, type ReactNode } from "react";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

/** Mouse-following magnetic hover effect (per prompt spec). */
export function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className = "",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const within =
      Math.abs(dx) < rect.width / 2 + padding &&
      Math.abs(dy) < rect.height / 2 + padding;
    if (within) {
      setActive(true);
      setPos({ x: dx / strength, y: dy / strength });
    } else {
      setActive(false);
      setPos({ x: 0, y: 0 });
    }
  };

  const onMouseLeave = () => {
    setActive(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: active ? activeTransition : inactiveTransition,
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
