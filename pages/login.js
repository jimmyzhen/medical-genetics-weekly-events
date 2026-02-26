import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                setError('Invalid password');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head>
                <title>Login — Division of Medical Genetics Weekly Schedule</title>
            </Head>
            <main style={{ maxWidth: 400, margin: '120px auto', padding: '0 1rem' }}>
                <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    Division of Medical Genetics Weekly Schedule
                </h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoFocus
                        required
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            border: '1px solid #999',
                            borderRadius: 4,
                            marginBottom: 16,
                        }}
                    />
                    {error && (
                        <p style={{ color: '#8c1515', marginBottom: 16, fontSize: '0.9rem' }}>
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#fff',
                            backgroundColor: '#8c1515',
                            border: 'none',
                            borderRadius: 4,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </main>
        </>
    );
}
