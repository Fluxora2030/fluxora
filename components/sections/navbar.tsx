"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { label: "Fonctionnalités", href: "#formats" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "FAQ", href: "#faq" },
  { label: "À propos", href: "/a-propos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-void/80 py-3 backdrop-blur-xl"
          : "py-5"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-8 px-6">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-foreground"
        >
          Fluxora<span className="text-glow">.</span>
        </Link>

        <ul className="hidden flex-1 items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-sm text-mist transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="h-9 px-4 text-mist hover:text-foreground"
          >
            <Link href="/login">Se connecter</Link>
          </Button>
          <Button
            asChild
            className="h-9 rounded-xl px-4 font-medium shadow-[0_8px_30px_-8px_var(--glow)]"
          >
            <Link href="/register">Commencer →</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
