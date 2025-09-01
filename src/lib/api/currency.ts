export type ConvertResponse = { 
  from: string; 
  amount: number; 
  rate: number; 
  converted: number
};

export async function convertToINR(amount: number, from: string): Promise<ConvertResponse> {
  const res = await fetch(`/api/convert?from=${encodeURIComponent(from)}&to=INR&amount=${amount}`);
  if (!res.ok) {
    throw new Error('Failed to convert currency');
  }
  return await res.json();
}