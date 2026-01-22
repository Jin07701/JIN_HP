'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus } from 'lucide-react';

const faqData = [
    {
        q: 'どのような契約形態になりますか？',
        a: '基本的には準委任契約となりますが、プロジェクトの性質に応じて請負契約も可能です。柔軟に対応させていただきます。'
    },
    {
        q: 'エンジニアの稼働までどのくらいの期間がかかりますか？',
        a: '最短で3営業日以内のアサイン実績がございます。通常は1〜2週間程度でご提案から稼働開始まで進むケースが多いです。'
    },
    {
        q: '未経験エンジニアの採用は行っていますか？',
        a: '現在は即戦力となる実務経験者をメインに採用しておりますが、ポテンシャル採用も一部行っております。採用情報ページをご確認ください。'
    },
    {
        q: 'リモートワークは可能ですか？',
        a: 'はい、多くのプロジェクトでフルリモートまたはハイブリッドワークを導入しております。働き方の柔軟性を重視しています。'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>FAQ</h2>
                    <p className={styles.subTitle}>よくあるご質問</p>
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
