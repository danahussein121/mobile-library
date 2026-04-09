"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  distance = 24,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance, scale: 0.985, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
