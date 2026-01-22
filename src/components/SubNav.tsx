import Link from 'next/link';
import styles from './SubNav.module.css';

interface SubNavItem {
    label: string;
    href: string;
    active?: boolean;
}

interface SubNavProps {
    items: SubNavItem[];
}

export default function SubNav({ items }: SubNavProps) {
    return (
        <nav className={styles.navBar}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    {items.map((item, index) => (
                        <li key={index} className={item.active ? styles.activeItem : ''}>
                            <Link href={item.href} className={styles.link}>
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
