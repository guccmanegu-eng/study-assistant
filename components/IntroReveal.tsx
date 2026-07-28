"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroReveal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const lastPlayed = localStorage.getItem("introLastPlayed");

    const now = Date.now();
    const fiveHours = 5 * 60 * 60 * 1000;

    if (!lastPlayed || now - Number(lastPlayed) > fiveHours) {
      setShow(true);
      localStorage.setItem("introLastPlayed", now.toString());
    }
  }, []);

  if (!show) return null;

  return (
    <motion.div
  initial={{
    width: 0,
    height: 0,
  }}
  animate={{
    width: "300vmax",
    height: "300vmax",
  }}
  transition={{
    duration: 1,
    ease: [0.4, 0, 0.2, 1],
  }}
  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent pointer-events-none z-50"
  style={{
    boxShadow: "0 0 0 100vmax black",
  }}
/>

  );
}