import Link from 'next/link';
import styles from './SubpageHeader.module.css';

interface SubpageHeaderProps {
    titleEn: string;
    titleJa: string;
    breadcrumbs: { label: string; href?: string }[];
}

export default function SubpageHeader({ titleEn, titleJa, breadcrumbs }: SubpageHeaderProps) {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContent}>
                <div className={styles.titles}>
                    <h1 className={styles.titleEn}>{titleEn}</h1>
                    <p className={styles.titleJa}>{titleJa}</p>
                </div>
            </div>
            <div className={styles.breadcrumbs}>
                <div className={styles.breadcrumbContainer}>
                    <Link href="/" className={styles.breadcrumbLink}>ホーム</Link>
                    {breadcrumbs.map((crumb, index) => (
                        <span key={index} className={styles.crumbItem}>
                            <span className={styles.separator}>{'>'}</span>
                            {crumb.href ? (
                                <Link href={crumb.href} className={styles.breadcrumbLink}>{crumb.label}</Link>
                            ) : (
                                <span className={styles.current}>{crumb.label}</span>
                            )}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
