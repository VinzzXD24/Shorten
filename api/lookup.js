// api/lookup.js
export default async function handler(req, res) {
  const cardNumber = req.query.cardNumber;

  if (!cardNumber || cardNumber.length < 6) {
    return res.status(400).json({ error: 'Parameter cardNumber tidak valid (minimal 6 digit).' });
  }

  try {
    const apiUrl = `https://lookup.binlist.net/${cardNumber}`;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept-Version': '3'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
