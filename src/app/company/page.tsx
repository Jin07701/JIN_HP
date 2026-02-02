import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import SubNav from '@/components/SubNav';
import CompanyProfile from '@/components/CompanyProfile';
import Philosophy from '@/components/Philosophy';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';

export default function CompanyPage() {
    const breadcrumbs = [{ label: '企業情報', href: '' }];
    const subNavItems = [
        { label: 'Philosophy', href: '#philosophy' },
        { label: 'Message', href: '#message' },
        { label: 'Outline', href: '#outline' },
        { label: 'FAQ', href: '#faq' },
    ];

    return (
        <>
            <Navbar />
            <main style={{ paddingTop: 'var(--header-height)' }}>
                <SubpageHeader
                    titleEn="COMPANY"
                    titleJa="企業情報"
                    breadcrumbs={breadcrumbs}
                />

                <SubNav items={subNavItems} />

                <Philosophy />

                <section id="message" className={styles.section}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>MESSAGE</h2>
                            <p className={styles.subTitle}>代表メッセージ</p>
                        </div>
                        <div className={styles.messageContent}>
                            <div className={styles.directorImage}>
                                <Image
                                    src="/images/hero-premium.png"
                                    alt="Representative"
                                    className={styles.profileImg}
                                    width={300}
                                    height={300}
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div className={styles.messageText}>
                                <h3 className={styles.messageTitle}>
                                    テクノロジーの力で、<br />
                                    エンジニアと企業の“幸せな出会い”を創造する。
                                </h3>
                                <p>
                                    私たちのミッションは、単なるマッチングではありません。<br />
                                    エンジニアが持つスキルと可能性を最大限に引き出し、<br />
                                    企業のビジョンと深く共鳴する瞬間を生み出すこと。<br />
                                    それが、社会全体のイノベーションを加速させると信じています。<br />
                                    <br />
                                    KANAMEは、AIと人の温かみを融合させた新しいプラットフォームとして、<br />
                                    皆様の挑戦を全力でサポートいたします。
                                </p>
                                <div className={styles.sign}>
                                    KANAME<br />
                                    代表 Jin
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="outline">
                    <CompanyProfile />
                </section>

                <FAQ />



            </main>
            <Footer />
        </>
    );
}
