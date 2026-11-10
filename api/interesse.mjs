import { createSign } from 'node:crypto';

const sizes = new Set(['P', 'M', 'G', 'GG']);
const tokenUrl = 'https://oauth2.googleapis.com/token';

async function getAccessToken(email, key) {
  const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: tokenUrl,
    iat: now,
    exp: now + 300,
  };
  const unsigned = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode(claims)}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key, 'base64url');
  const response = await fetch(tokenUrl, {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${signature}`,
    }),
  });
  if (!response.ok) throw new Error('Google authorization failed');
  return (await response.json()).access_token;
}

export async function handleInterest(req, res, save) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método inválido.' });
  }

  const { name, phone, product, size } = req.body ?? {};
  const validPhone = typeof phone === 'string' && phone.length <= 24 &&
    /^[+\d() .-]+$/.test(phone) &&
    /^(?:\d{10,11}|55\d{10,11})$/.test(phone.replace(/\D/g, ''));
  if (typeof name !== 'string' || !name.trim() || name.trim().length > 80 ||
      !validPhone || !['Camiseta', 'Caneca'].includes(product) ||
      (product === 'Camiseta' && !sizes.has(size))) {
    return res.status(400).json({ error: 'Confira o nome, o telefone com DDD e a escolha da lembrança.' });
  }

  const row = [
    new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
    name.trim(), phone.trim(), product, product === 'Camiseta' ? size : '',
  ];
  try {
    const preview = await save(row);
    return res.status(201).json(preview ? { ok: true, preview } : { ok: true });
  } catch {
    return res.status(502).json({ error: 'Não foi possível registrar seu interesse. Tente novamente.' });
  }
}

export default function handler(req, res) {
  const { CMA_SHEETS_ID, CMA_GOOGLE_CLIENT_EMAIL, CMA_GOOGLE_PRIVATE_KEY } = process.env;
  if (!CMA_SHEETS_ID || !CMA_GOOGLE_CLIENT_EMAIL || !CMA_GOOGLE_PRIVATE_KEY) {
    return res.status(503).json({ error: 'O registro de interesse ainda não está disponível.' });
  }
  return handleInterest(req, res, async row => {
    const token = await getAccessToken(CMA_GOOGLE_CLIENT_EMAIL, CMA_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'));
    const range = encodeURIComponent("'Respostas'!A:E");
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(CMA_SHEETS_ID)}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: [row] }),
    });
    if (!response.ok) throw new Error('Sheets append failed');
  });
}
