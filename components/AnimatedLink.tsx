"use client";

import { useRouter } from "next/navigation";
import { usePageTransition } from "./TransitionProvider";

export default function AnimatedLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  const { startTransition } = usePageTransition();

  return (
    <button
      className={className}
      onClick={() =>
        startTransition(() => {
          router.push(href);
        })
      }
    >
      {children}
    </button>
  );
}