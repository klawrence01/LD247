"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const items = [
    { name: "Home", href: "/" },
    { name: "Cities", href: "/city" },
    { name: "Everyday Heroes", href: "/blog/everyday-heroes" },
    { name: "Behind the Hustle", href: "/blog/behind-the-hustle" },
    { name: "Contact", href: "/contact" },
  ];

  const close = () => setOpen(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink} onClick={close}>
          <Image
            src="/logo-ld247.png"
            alt="Local Deals 24/7 Logo"
            width={150}
            height={55}
            priority
          />
        </Link>

        {/* Hamburger menu (mobile) */}
        <button
          className={styles.toggle}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* Navigation links */}
        <ul className={`${styles.menu} ${open ? styles.menuOpen : ""}`}>
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  onClick={close}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
