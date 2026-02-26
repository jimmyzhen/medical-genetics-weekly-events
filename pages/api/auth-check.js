import crypto from 'crypto';

function computeToken(password, secret) {
    return crypto.createHmac('sha256', secret).update(password).digest('hex');
}

export default function handler(req, res) {
    const appPassword = process.env.APP_PASSWORD;
    const appSecret = process.env.APP_SECRET;

    if (!appPassword || !appSecret) {
        return res.status(200).json({ authenticated: false });
    }

    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(200).json({ authenticated: false });
    }

    const expectedToken = computeToken(appPassword, appSecret);

    if (token.length !== expectedToken.length) {
        return res.status(200).json({ authenticated: false });
    }

    const authenticated = crypto.timingSafeEqual(
        Buffer.from(token),
        Buffer.from(expectedToken)
    );

    return res.status(200).json({ authenticated });
}
