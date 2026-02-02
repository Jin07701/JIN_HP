"use client";
import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '', // Changed from 'company'/'subject' to match existing form
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus('success');
                setIsSubmitted(true); // Set isSubmitted to true on success
                setFormData({
                    name: '',
                    email: '',
                    category: '',
                    message: ''
                });
            } else {
                setFormStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setFormStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>お問い合わせ</h2>
                    <span className={styles.subHeading}>CONTACT</span>
                </div>

                <div className={styles.formContainer}>
                    {isSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '50px', background: '#f0fdf4', borderRadius: '8px', color: '#166534' }}>
                            <h3>送信が完了しました</h3>
                            <p>お問い合わせありがとうございます。担当者よりご連絡いたします。</p>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {formStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    お問い合わせを受け付けました。ご連絡ありがとうございます。<br />
                                    (※現在は開発中のため、メールは実際には送信されない場合があります)
                                </div>
                            )}
                            {formStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    送信に失敗しました。時間をおいて再度お試しください。
                                </div>
                            )}
                            <div className={styles.group}>
                                <label htmlFor="name">お名前</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="山田 太郎"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="email">メールアドレス</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="example@directjapan.co.jp"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="category">お問い合わせ種別</label>
                                <select
                                    id="category"
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">選択してください</option>
                                    <option value="事業内容について">事業内容について</option>
                                    <option value="採用について">採用について</option>
                                    <option value="その他">その他</option>
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="message">お問い合わせ内容</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="お問い合わせ内容をご記入ください"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn}>送信する</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
