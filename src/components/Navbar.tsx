"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    DirectJapan
                </Link>
                <nav className={styles.nav}>
                    <Link href="#service" className={styles.link}>Service</Link>
                    <Link href="#company" className={styles.link}>Company</Link>
                    <Link href="#contact" className={`${styles.link} ${styles.cta}`}>Contact</Link>
                </nav>
            </div>
        </header>
    );
}
