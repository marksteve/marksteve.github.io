import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

function useParallax(value: MotionValue<number>, range: [number, number]) {
  const [y, setY] = useState(0);
  const mv = useSpring(useTransform(value, [0, 1], range));
  useEffect(() => mv.onChange((v) => setY(v)), []);
  return y;
}

interface BgImageProps {
  className: string;
  src: string;
  range: [number, number];
}

export default function BgImage({ className, src, range }: BgImageProps) {
  const { scrollYProgress } = useScroll({
    offset: ["end", "start"],
  });
  const y = useParallax(scrollYProgress, range);
  return (
    <section className={className}>
      <motion.img src={src} style={{ objectPosition: `0 ${y * 100}%` }} />
    </section>
  );
}
