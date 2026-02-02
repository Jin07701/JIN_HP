import styles from './CompanyProfile.module.css';

export default function CompanyProfile() {
    return (
        <section className={styles.section} id="company">
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>会社概要</h2>
                </div>

                <div className={styles.infoSection}>
                    <dl className={styles.dl}>
                        <div className={styles.row}>
                            <dt>会社名</dt>
                            <dd>合同会社KANAME</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>設立日</dt>
                            <dd>2026年4月</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>代表者</dt>
                            <dd>Jin</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>所在地</dt>
                            <dd>〒812-0011 福岡県福岡市博多区博多駅前1-23-4 博多駅前ビル 5F</dd>
                        </div>
                        <div className={styles.row}>
                            <dt>事業内容</dt>
                            <dd>
                                ・エンジニアマッチングプラットフォーム「DirectConnect」の運営<br />
                                ・ITコンサルティング事業<br />
                                ・セキュリティ監査・診断事業
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
}
