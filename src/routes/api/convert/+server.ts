import { apikey } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const from = url.searchParams.get('from') || 'USD';
  const to = url.searchParams.get('to') || 'INR';
  const amount = url.searchParams.get('amount') || '0';

  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${apikey}/pair/${from}/${to}/${amount}`
    );
    if (!res.ok) throw new Error('API request failed');

    const data = await res.json(); 
    
        return new Response(
      JSON.stringify({
        from,
        amount: Number(amount),
        rate: data.conversion_rate,
        converted: data.conversion_result
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Currency conversion error:', error);
    return new Response(
      JSON.stringify({ error: 'Conversion failed' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

