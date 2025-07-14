
import { ReactNode, useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const FadeIn = ({ 
  children, 
  className = "", 
  direction = "up", 
  delay = 0, 
  duration = 500,
  once = true,
  threshold = 0.1
}: FadeInProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [once, threshold]);

  const getDirectionClass = () => {
    switch (direction) {
      case "up":
        return "translate-y-10";
      case "down":
        return "translate-y-[-10px]";
      case "left":
        return "translate-x-10";
      case "right":
        return "translate-x-[-10px]";
      default:
        return "";
    }
  };

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translate3d(0, 0, 0)"
          : `translate3d(0, ${direction === "up" ? "10px" : direction === "down" ? "-10px" : 0}, 0) 
             translate3d(${direction === "left" ? "10px" : direction === "right" ? "-10px" : 0}, 0, 0)`,
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
