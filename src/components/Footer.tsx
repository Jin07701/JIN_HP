import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.brand}>
                        <h2 className={styles.logo}>DirectJapan</h2>
                        <p className={styles.description}>
                            Connecting the world directly with secure, efficient infrastructure solutions.
                        </p>
                    </div>
                    <div className={styles.links}>
                        <h3>Company</h3>
                        <ul>
                            <li><a href="#service">Service</a></li>
                            <li><a href="#company">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} DirectJapan. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
