import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Footer from '@/components/Footer';
import SubpageHeader from '@/components/SubpageHeader';
import SubNav from '@/components/SubNav';
import CompanyProfile from '@/components/CompanyProfile';
import Philosophy from '@/components/Philosophy';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';
import { supabase } from '@/lib/supabase';

export default async function CompanyPage() {
    const { data: settingsData } = await supabase.from('site_settings').select('*');
    const settings: Record<string, string> = {};
    settingsData?.forEach(s => {
        settings[s.setting_key] = s.setting_value;
    });

    const breadcrumbs = [{ label: '企業情報', href: '' }];
    const subNavItems = [
        { label: 'Philosophy', href: '#philosophy' },
        { label: 'Message', href: '#message' },
        { label: 'Origin', href: '#origin' },
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
                                    src={settings.company_message_image || "/images/hero-premium.png"}
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
                                <p style={{ whiteSpace: 'pre-wrap' }}>
                                    {settings.company_message || `私たちのミッションは、単なるマッチングではありません。\nエンジニアが持つスキルと可能性を最大限に引き出し、\n企業のビジョンと深く共鳴する瞬間を生み出すこと。\nそれが、社会全体のイノベーションを加速させると信じています。\n\nARISTAは、AIと人の温かみを融合させた新しいプラットフォームとして、\n皆様の挑戦を全力でサポートいたします。`}
                                </p>
                                <div className={styles.sign}>
                                    {settings.company_name || '株式会社ARISTA'}<br />
                                    代表 {settings.company_representative || 'Jin Adachi'}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="origin" className={`${styles.section} ${styles.originSection}`} style={{ backgroundColor: '#f9fafb' }}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h2 className={styles.title}>ORIGIN</h2>
                            <p className={styles.subTitle}>社名の由来</p>
                        </div>
                        <div className={styles.originContent} style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                            {settings.company_origin_ja || `「ARISTA」はラテン語で「穂」や「先端・頂点」を意味する言葉です。穂は、種が育ち、価値として実る状態を表します。そして先端や頂点という意味から、今では「優れた存在」や「優秀な集団」といったニュアンスでも使われています。\n\n私たちは、ITコンサルティングやシステム開発、マッチングサービスを通じて、企業と人材を直接つなぎ、無駄を省きながら価値を生み出していきます。一つひとつの取り組みを確実に成果へと結びつけ、それを積み重ねることで、本当に意味のある“実り”を社会に届けることを目指しています。\n\nこの「ARISTA」という名前には、ただ関わるだけで終わるのではなく、結果として価値を残し続けること。そして最終的には、市場の中で優れた存在として認められる企業であり続けるという意思を込めています。`}
                        </div>
                    </div>
                </section>

                <section id="outline">
                    <CompanyProfile settings={settings} />
                </section>

                <FAQ />
            </main>
            <Footer />
        </>
    );
}
