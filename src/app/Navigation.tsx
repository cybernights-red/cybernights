"use client";

import { useState } from "react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#d68a3a]/30 bg-[#080808]/90 backdrop-blur-md">
      <div className="flex items-center justify-between py-6">
        <a
          href="#"
          className="font-mono text-sm tracking-[0.35em] text-[#d68a3a]"
        >
          CYBERNIGHTS
        </a>

        {/* Desktop navigation */}
        <div className="hidden gap-8 font-mono text-xs tracking-widest text-[#8f8a80] md:flex">
          <a
            href="#projects"
            className="transition hover:text-[#d68a3a]"
          >
            PROJECTS
          </a>

          <a
            href="#research"
            className="transition hover:text-[#d68a3a]"
          >
            RESEARCH
          </a>

          <a
            href="/writeups"
            className="transition hover:text-[#d68a3a]"
          >
            WRITEUPS
          </a>

          <a
            href="#about"
            className="transition hover:text-[#d68a3a]"
          >
            ABOUT
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          className="font-mono text-[10px] tracking-[0.25em] text-[#d68a3a] md:hidden"
        >
          {menuOpen ? "CLOSE ×" : "MENU +"}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-[#d68a3a]/20 py-5 md:hidden">
          <div className="flex flex-col gap-5 font-mono text-xs tracking-[0.2em] text-[#8f8a80]">
            <a
              href="#projects"
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-[#d68a3a]"
            >
              01 // PROJECTS
            </a>

            <a
              href="#research"
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-[#d68a3a]"
            >
              02 // RESEARCH
            </a>

            <a
              href="/writeups"
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-[#d68a3a]"
            >
              03 // WRITEUPS
            </a>

            <a
              href="#about"
              onClick={() => setMenuOpen(false)}
              className="transition hover:text-[#d68a3a]"
            >
              04 // ABOUT
            </a>
          </div>

          <div className="mt-6 border-t border-[#d68a3a]/10 pt-4 font-mono text-[9px] tracking-[0.2em] text-[#4f4b45]">
            NAVIGATION // LOCAL NODE
          </div>
        </div>
      )}
    </nav>
  );
}