import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const channel = req.query.channel || 'test';
    const uid = parseInt(req.query.uid || '0');
    const appId = process.env.AGORA_APP_ID;
    const cert = process.env.AGORA_CERT;
    if (!appId || !cert) {
      return res.status(500).json({ error: 'Falta AGORA_APP_ID o AGORA_CERT en Vercel' });
    }
    const expire = Math.floor(Date.now() / 1000) + 3600;
    const token = RtcTokenBuilder.buildTokenWithUid(appId, cert, channel, uid, RtcRole.PUBLISHER, expire);
    return res.status(200).json({ token, uid, channel });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
