"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SecurityAdminPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLogs();
    }, []);

    async function fetchLogs() {
        setLoading(true);
        const { data, error } = await supabase.from('security_logs').select('*').order('timestamp', { ascending: false });
        if (error) console.error(error);
        else setLogs(data || []);
        setLoading(false);
    }

    return (
        <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>セキュリティ監視 (アクセスログ)</h1>
            <p style={{ marginBottom: '20px', color: '#666' }}>※管理者ログインの成功および、権限のないアカウントでのログイン試行の記録です。</p>

            {loading ? <p>読み込み中...</p> : (
                <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '12px 15px', fontWeight: 'bold' }}>日時</th>
                                <th style={{ padding: '12px 15px', fontWeight: 'bold' }}>試行されたEmail</th>
                                <th style={{ padding: '12px 15px', fontWeight: 'bold' }}>IPアドレス/UA等</th>
                                <th style={{ padding: '12px 15px', fontWeight: 'bold' }}>アクション</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px 15px' }}>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td style={{ padding: '12px 15px', fontWeight: 'bold', color: log.action === 'authorized_admin_login' ? '#10b981' : '#ef4444' }}>{log.email}</td>
                                    <td style={{ padding: '12px 15px', fontSize: '0.85rem', color: '#6b7280', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={log.user_agent}>{log.user_agent}</td>
                                    <td style={{ padding: '12px 15px' }}>
                                        <span style={{ 
                                            backgroundColor: log.action === 'authorized_admin_login' ? '#d1fae5' : '#fee2e2', 
                                            color: log.action === 'authorized_admin_login' ? '#065f46' : '#991b1b',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {log.action === 'authorized_admin_login' ? 'ログイン成功' : '不正アクセス試行'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ padding: '20px', textAlign: 'center' }}>不正なアクセス履歴はありません。安全です！</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
