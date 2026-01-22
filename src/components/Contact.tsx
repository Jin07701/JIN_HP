import styles from './Contact.module.css';

export default function Contact() {
    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>CONTACT</h2>
                    <span className={styles.subHeading}>お問い合わせ</span>
                </div>

                <div className={styles.formContainer}>
                    <form className={styles.form}>
                        <div className={styles.group}>
                            <label htmlFor="name">お名前</label>
                            <input type="text" id="name" placeholder="山田 太郎" />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="email">メールアドレス</label>
                            <input type="email" id="email" placeholder="example@directjapan.co.jp" />
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="category">お問い合わせ種別</label>
                            <select id="category" className={styles.select}>
                                <option>事業内容について</option>
                                <option>採用について</option>
                                <option>その他</option>
                            </select>
                        </div>
                        <div className={styles.group}>
                            <label htmlFor="message">お問い合わせ内容</label>
                            <textarea id="message" rows={5} placeholder="お問い合わせ内容をご記入ください"></textarea>
                        </div>
                        <button type="submit" className={styles.submitBtn}>送信する</button>
                    </form>
                </div>
            </div>
        </section>
    );
}
