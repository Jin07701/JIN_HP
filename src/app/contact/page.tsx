import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import Contact from '@/components/Contact'; // Reusing content
import styles from './page.module.css';

export default function ContactPage() {
    const breadcrumbs = [{ label: 'お問い合わせ', href: '' }];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="CONTACT"
                    titleJa="お問い合わせ"
                    breadcrumbs={breadcrumbs}
                />

                <div className={styles.container}>
                    <p className={styles.lead}>
                        サービスに関するご質問・ご相談は、下記フォームよりお気軽にお問い合わせください。<br />
                        内容を確認後、担当者よりご連絡させていただきます。
                    </p>
                    <div className={styles.formWrapper}>
                        <Contact />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
