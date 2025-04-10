export default async function handler(req, res) {
  const { cardNumber } = req.query;

  if (!cardNumber || cardNumber.length < 6) {
    return res.status(400).json({ error: 'Minimal 6 digit BIN dibutuhkan.' });
  }

  try {
    const response = await fetch(`https://lookup.binlist.net/${cardNumber}`, {
      headers: { 'Accept-Version': '3' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
