'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQ() {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        {
            q: t('どのような契約形態になりますか？', 'What type of contract is available?'),
            a: t(
                '基本的には準委任契約となりますが、プロジェクトの性質に応じて請負契約も可能です。柔軟に対応させていただきます。',
                'Basically, it is a quasi-mandate contract, but contract agreements are also possible depending on the nature of the project. We will respond flexibly.'
            )
        },
        {
            q: t('エンジニアの稼働までどのくらいの期間がかかりますか？', 'How long does it take for an engineer to start working?'),
            a: t(
                '最短で3営業日以内のアサイン実績がございます。通常は1〜2週間程度でご提案から稼働開始まで進むケースが多いです。',
                'We have a track record of assignment within 3 business days at the shortest. Usually, it takes about 1 to 2 weeks from proposal to start of work.'
            )
        },
        {
            q: t('未経験エンジニアの採用は行っていますか？', 'Do you recruit inexperienced engineers?'),
            a: t(
                '現在は即戦力となる実務経験者をメインに採用しておりますが、ポテンシャル採用も一部行っております。採用情報ページをご確認ください。',
                'Currently, we mainly recruit experienced candidates who can be immediate assets, but we also do some potential hiring. Please check the recruitment information page.'
            )
        },
        {
            q: t('リモートワークは可能ですか？', 'Is remote work possible?'),
            a: t(
                'はい、多くのプロジェクトでフルリモートまたはハイブリッドワークを導入しております。働き方の柔軟性を重視しています。',
                'Yes, many projects have introduced full remote or hybrid work. We emphasize flexibility in work styles.'
            )
        }
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>FAQ</h2>
                    <p className={styles.subTitle}>{t('よくあるご質問', 'Frequently Asked Questions')}</p>
                </div>

                <div className={styles.list}>
                    {faqData.map((item, index) => (
                        <div key={index} className={`${styles.item} ${openIndex === index ? styles.open : ''}`}>
                            <button
                                className={styles.question}
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span className={styles.qMark}>Q</span>
                                <span className={styles.qText}>{item.q}</span>
                                <span className={styles.toggleIcon}>
                                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <div className={styles.answer} style={{ maxHeight: openIndex === index ? '200px' : '0' }}>
                                <div className={styles.answerContent}>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
