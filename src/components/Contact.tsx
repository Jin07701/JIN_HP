"use client";
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Contact.module.css';

export default function Contact() {
    const { t } = useLanguage();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<'success' | 'error' | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // ... (rest of submit logic logic unchanged)
        setFormStatus(null);
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setFormStatus('success');
                setIsSubmitted(true);
                setFormData({ name: '', email: '', category: '', message: '' });
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
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>{t('お問い合わせ', 'Contact Us')}</h2>
                    <span className={styles.subHeading}>CONTACT</span>
                </div>

                <div className={styles.formContainer}>
                    {isSubmitted ? (
                        <div style={{ textAlign: 'center', padding: '50px', background: '#f0fdf4', borderRadius: '8px', color: '#166534' }}>
                            <h3>{t('送信が完了しました', 'Submission Complete')}</h3>
                            <p>{t('お問い合わせありがとうございます。担当者よりご連絡いたします。', 'Thank you for your inquiry. We will contact you shortly.')}</p>
                        </div>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            {formStatus === 'success' && (
                                <div className={styles.successMessage}>
                                    {t('お問い合わせを受け付けました。ご連絡ありがとうございます。', 'Your message has been received. Thank you.')}
                                </div>
                            )}
                            {formStatus === 'error' && (
                                <div className={styles.errorMessage}>
                                    {t('送信に失敗しました。時間をおいて再度お試しください。', 'Failed to send. Please try again later.')}
                                </div>
                            )}
                            <div className={styles.group}>
                                <label htmlFor="name">{t('お名前', 'Name')}</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder={t("アリスタ 太郎", "Taro Arista")}
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="email">{t('メールアドレス', 'Email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="info@arista.co.jp"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="category">{t('お問い合わせ種別', 'Inquiry Type')}</label>
                                <select
                                    id="category"
                                    className={styles.select}
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('選択してください', 'Please select')}</option>
                                    <option value="事業内容について">{t('事業内容について', 'About Business')}</option>
                                    <option value="採用について">{t('採用について', 'About Career')}</option>
                                    <option value="その他">{t('その他', 'Others')}</option>
                                </select>
                            </div>
                            <div className={styles.group}>
                                <label htmlFor="message">{t('お問い合わせ内容', 'Message')}</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder={t("お問い合わせ内容をご記入ください", "Please enter your message")}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                {isSubmitting ? t('送信中...', 'Sending...') : t('送信する', 'Send Message')}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
