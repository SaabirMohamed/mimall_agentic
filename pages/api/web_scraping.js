import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

export default async function handler(req, res) {
  const url = req.query.url || 'https://example.com';

  try {
    const response = await fetch(url);
    const text = await response.text();
    const dom = new JSDOM(text);
    const title = dom.window.document.querySelector('title').textContent;
    res.status(200).json({ title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
