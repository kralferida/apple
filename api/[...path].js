export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  // /api/botXXX:YYY/sendMessage -> /botXXX:YYY/sendMessage
  const tgPath = url.pathname.replace('/api', '');
  const tgUrl = `https://api.telegram.org${tgPath}${url.search}`;

  try {
    const resp = await fetch(tgUrl, {
      method: req.method,
      headers: { 'Content-Type': req.headers.get('Content-Type') || 'application/json' },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? await req.arrayBuffer() : undefined,
    });

    return new Response(await resp.arrayBuffer(), {
      status: resp.status,
      headers: {
        'Content-Type': resp.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
