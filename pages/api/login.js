import crypto from 'crypto';

function computeToken(password, secret) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'Password is required' });
    }

    const appPassword = process.env.APP_PASSWORD;
    const appSecret = process.env.APP_SECRET;

    if (!appPassword || !appSecret) {
        return res.status(500).json({ error: 'Server configuration error' });
    }

    if (password !== appPassword) {
        return res.status(401).json({ error: 'Invalid password' });
    }

    const token = computeToken(password, appSecret);
    const isLocal = req.headers.host?.includes('localhost');
    const securePart = isLocal ? '' : ' Secure;';

    res.setHeader('Set-Cookie', `auth_token=${token}; HttpOnly; Path=/; SameSite=Strict;${securePart}`);
    return res.status(200).json({ success: true });
}
