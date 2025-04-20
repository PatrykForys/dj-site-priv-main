"use client";

import { cn } from "@/lib/utils";
import React, {
  ComponentPropsWithoutRef,
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

interface GlowAreaProps extends ComponentPropsWithoutRef<"div"> {
  size?: number | { sm?: number; md?: number; lg?: number; default: number };
  padding?: number;
}

export const GlowArea = (props: GlowAreaProps) => {
  const {
    className = "",
    size = { sm: 200, md: 300, lg: 400, default: 400 },
    padding = 0,
    ...rest
  } = props;
  const element = useRef<HTMLDivElement>(null);
  const frameId = useRef<number | null>(null);
  const latestCoords = useRef<{ x: number; y: number } | null>(null);
  const [currentSize, setCurrentSize] = useState(
    typeof size === "number" ? size : size.default
  );
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      if (typeof size === "number") {
        setCurrentSize(size);
        return;
      }

      const width = window.innerWidth;
      if (width < 640 && size.sm) {
        setCurrentSize(size.sm);
      } else if (width < 1024 && size.md) {
        setCurrentSize(size.md);
      } else if (size.lg) {
        setCurrentSize(size.lg);
      } else {
        setCurrentSize(size.default);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [size]);

  const updateGlow = () => {
    if (latestCoords.current && element.current) {
      element.current.style.setProperty(
        "--glow-x",
        `${latestCoords.current.x}px`
      );
      element.current.style.setProperty(
        "--glow-y",
        `${latestCoords.current.y}px`
      );
      frameId.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!element.current) return;
    setIsHovered(true);

    const bounds = element.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    latestCoords.current = { x, y };
    if (!frameId.current) {
      frameId.current = requestAnimationFrame(() => updateGlow());
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    setTimeout(() => {
      if (element.current) {
        element.current.style.removeProperty("--glow-x");
        element.current.style.removeProperty("--glow-y");
      }
    }, 300);
  };

  return (
    <div
      style={{
        position: "relative",
        margin: padding ? `-${padding * 4}px` : "0",
      }}
    >
      <div
        ref={element}
        style={
          {
            position: "relative",
            "--glow-size": `${currentSize}px`,
            "--glow-opacity": isHovered ? "1" : "0",
            padding: padding ? `${padding * 4}px` : "0",
          } as CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(className)}
        {...rest}
      />
    </div>
  );
};

GlowArea.displayName = "GlowArea";

interface GlowProps extends ComponentPropsWithoutRef<"div"> {
  color?: string;
}

export const Glow = (props: GlowProps) => {
  const { className, color = "blue", children, ...rest } = props;
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (element.current) {
        element.current.style.setProperty(
          "--glow-top",
          `${element.current.offsetTop}px`
        );
        element.current.style.setProperty(
          "--glow-left",
          `${element.current.offsetLeft}px`
        );
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    const observer = new MutationObserver(updatePosition);
    if (element.current) {
      observer.observe(element.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", updatePosition);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={element} className={cn(className, "relative")}>
      <div
        {...rest}
        style={{
          backgroundImage: `radial-gradient(
            var(--glow-size) var(--glow-size) at calc(var(--glow-x, -99999px) - var(--glow-left, 0px))
            calc(var(--glow-y, -99999px) - var(--glow-top, 0px)),
            ${color} 0%,
            transparent 100%
          )`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: "var(--glow-opacity, 0)",
        }}
        className={cn(
          className,
          "absolute pointer-events-none inset-0 dark:mix-blend-lighten mix-blend-multiply after:content-[''] after:absolute after:bg-background/90 after:inset-0.25 after:rounded-[inherit]"
        )}
      ></div>
      {children}
    </div>
  );
};

Glow.displayName = "Glow";
