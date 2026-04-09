"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  containerClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  priority,
  containerClassName,
  imageClassName,
  overlayClassName,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.03, 1.09]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", containerClassName)}>
      <motion.div style={{ y, scale }} className="absolute inset-0 will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn("object-cover", imageClassName)}
          sizes={sizes}
        />
      </motion.div>
      {overlayClassName ? <div className={cn("absolute inset-0", overlayClassName)} /> : null}
    </div>
  );
}
