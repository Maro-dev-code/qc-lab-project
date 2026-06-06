"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const user = {
    name: "Sarah Johnson",
    role: "City Administrator",
    initials: "SJ",
  };

  const navLinks = [
    { label: "Our Story", href: "/" },
    { label: "One Community", href: "/" },
    { label: "Our Process", href: "/" },
    { label: "Our Programs", href: "/", hasDropdown: true },
    { label: "News & Resources", href: "/" },
  ];

  return (
    <nav className="w-full">

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-light)]">
        <div className="w-full px-[var(--spacing-32)] py-[var(--spacing-4)] flex justify-end items-center gap-[var(--spacing-16)]">
          <span className="text-[var(--color-text-600)] text-xs">
            U.S. Department of Defense
          </span>
          <span className="text-[var(--color-text-400)] text-xs">|</span>
          <span className="text-[var(--color-text-600)] text-xs">
            Office of Local Defense Community Cooperation
          </span>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="bg-white border-b border-[var(--color-border-light)] shadow-sm">
        <div className="w-full px-[var(--spacing-32)] py-[var(--spacing-12)] flex justify-between items-center">

          {/* LEFT SIDE — Logo and Organization Name */}
          <div className="flex items-center gap-[var(--spacing-12)]">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary-800)] flex items-center justify-center overflow-hidden border-2 border-[var(--color-primary-200)]">
              <span className="text-white font-bold text-xs text-center leading-tight">
                DoD
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[var(--color-primary-800)] text-sm leading-tight">
                U.S. Department of Defense
              </span>
              <span className="text-[var(--color-text-500)] text-xs leading-tight mt-[var(--spacing-4)]">
                Office of Local Defense
              </span>
              <span className="text-[var(--color-text-500)] text-xs leading-tight">
                Community Cooperation
              </span>
            </div>
          </div>

          {/* MIDDLE — Navigation Links */}
          <div className="hidden md:flex items-center gap-[var(--spacing-4)]">
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[var(--color-text-700)] hover:text-[var(--color-primary-600)] text-sm font-medium px-[var(--spacing-12)] py-[var(--spacing-8)] rounded-[var(--radius-4)] hover:bg-[var(--color-primary-50)] transition-colors whitespace-nowrap"
                  onClick={() => {
                    if (link.hasDropdown) {
                      setIsProgramsOpen(!isProgramsOpen);
                      setIsProfileOpen(false);
                    }
                  }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <span className="text-xs ml-1">▾</span>
                  )}
                </Link>

                {/* PROGRAMS DROPDOWN */}
                {link.hasDropdown && isProgramsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-[var(--color-border-light)] rounded-[var(--radius-8)] shadow-lg z-50 py-[var(--spacing-4)]">
                    <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-text-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]">
                      Defense Programs
                    </a>
                    <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-text-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]">
                      Community Initiatives
                    </a>
                    <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-text-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]">
                      Grant Programs
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT SIDE — Notification and Profile */}
          <div className="flex items-center gap-[var(--spacing-12)]">

            {/* NOTIFICATION BELL */}
            <button className="relative p-[var(--spacing-8)] rounded-full hover:bg-[var(--color-primary-50)] transition-colors">
              <span className="text-[var(--color-text-600)] text-lg">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error-500)] rounded-full"></span>
            </button>

            {/* DIVIDER */}
            <div className="w-px h-8 bg-[var(--color-border-light)]"></div>

            {/* PROFILE SECTION */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsProgramsOpen(false);
                }}
                className="flex items-center gap-[var(--spacing-8)] hover:bg-[var(--color-primary-50)] px-[var(--spacing-8)] py-[var(--spacing-4)] rounded-[var(--radius-8)] transition-colors"
              >
                {/* PROFILE PHOTO CIRCLE */}
                <div className="w-9 h-9 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center text-white text-xs font-bold border-2 border-[var(--color-primary-200)] overflow-hidden">
                  {user.initials}
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-semibold text-[var(--color-text-800)]">
                    {user.name}
                  </span>
                  <span className="text-xs text-[var(--color-text-500)]">
                    {user.role}
                  </span>
                </div>
                <span className="text-xs text-[var(--color-text-400)] ml-1">▾</span>
              </button>

              {/* PROFILE DROPDOWN */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-[var(--color-border-light)] rounded-[var(--radius-8)] shadow-lg z-50 py-[var(--spacing-4)]">
                  <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-text-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]">
                    👤 My Profile
                  </a>
                  <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-text-700)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-primary-600)]">
                    ⚙️ Settings
                  </a>
                  <hr className="my-1 border-[var(--color-border-light)]" />
                  <a href="#" className="flex items-center px-[var(--spacing-16)] py-[var(--spacing-8)] text-sm text-[var(--color-error-500)] hover:bg-[var(--color-error-50)]">
                    🚪 Sign Out
                  </a>
                </div>
              )}
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-[var(--spacing-8)] rounded-[var(--radius-4)] hover:bg-[var(--color-primary-50)] transition-colors"
            >
              <div className="w-5 h-0.5 bg-[var(--color-text-700)] mb-1"></div>
              <div className="w-5 h-0.5 bg-[var(--color-text-700)] mb-1"></div>
              <div className="w-5 h-0.5 bg-[var(--color-text-700)]"></div>
            </button>

          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-border-light)] shadow-md">
          <div className="w-full px-[var(--spacing-32)] py-[var(--spacing-16)]">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-[var(--spacing-8)] text-[var(--color-text-700)] hover:text-[var(--color-primary-600)] text-sm font-medium border-b border-[var(--color-border-light)] last:border-0"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;