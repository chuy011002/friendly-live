import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const appId = process.env.AGORA_APP_ID;
  const appCert = process.env.AGORA_CERT;
  const channel = req.query.channel || 'test';
  const uid = parseInt(req.query.uid || '0', 10);
  const role = req.query.role === 'host' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
  const expire = Math.floor(Date.now() / 1000) + 3600;

  if (!appId || !appCert) {
    return res.status(500).json({ error: 'Missing AGORA_APP_ID or AGORA_CERT' });
  }

  const token = RtcTokenBuilder.buildTokenWithUid(appId, appCert, channel, uid, role, expire);
  return res.status(200).json({ token, uid, channel, appId });
}
