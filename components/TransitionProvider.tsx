"use client";

import { createContext, useContext, useState } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

type TransitionContextType = {
    leaving: boolean;
    startTransition: (callback: () => void) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export function TransitionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [leaving, setLeaving] = useState(false);

    function startTransition(callback: () => void) {
        setLeaving(true);
        setTimeout(() => {
            callback();
            setLeaving(false);
        }, 300);
    }

    return (
        <TransitionContext.Provider value={{ leaving, startTransition }}>
        {children}
        </TransitionContext.Provider>
    );
}

export function usePageTransition() {
    const context = useContext(TransitionContext);

    if (!context) {
        throw new Error("Page Transition Error")
    }

    return context;
}