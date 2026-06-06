"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { label: "Profile Information", href: "/profile", icon: "👤" },
  { label: "My Applications", href: "/applications", icon: "📄" },
  { label: "Application Status", href: "/status", icon: "📊" },
  { label: "Notifications", href: "/notifications", icon: "🔔" },
  { label: "Documents", href: "/documents", icon: "📁" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full min-h-screen bg-white border-r border-[var(--color-border-light)] p-[var(--spacing-24)]">
      <h2 className="font-bold text-[var(--color-text-900)] text-base mb-[var(--spacing-16)]">
        Account Management
      </h2>
      <nav className="flex flex-col gap-[var(--spacing-4)]">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-[var(--spacing-12)] px-[var(--spacing-12)] py-[var(--spacing-8)] rounded-[var(--radius-8)] text-sm transition-all duration-200 group ${
                isActive
                  ? "bg-[var(--color-primary-50)] text-[var(--color-primary-600)] font-semibold border-l-4 border-[var(--color-primary-600)]"
                  : "text-[var(--color-text-600)] hover:bg-[var(--color-primary-600)] hover:text-white"
              }`}
            >
              <span className={`text-base transition-colors ${
                isActive 
                  ? "text-[var(--color-primary-600)]" 
                  : "group-hover:text-white"
              }`}>
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;