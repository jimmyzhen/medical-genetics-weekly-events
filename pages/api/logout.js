export default function handler(req, res) {
    const isLocal = req.headers.host?.includes('localhost');
    const securePart = isLocal ? '' : ' Secure;';

    res.setHeader('Set-Cookie', `auth_token=; HttpOnly; Path=/; SameSite=Strict;${securePart} Max-Age=0`);
    return res.status(200).json({ success: true });
}
