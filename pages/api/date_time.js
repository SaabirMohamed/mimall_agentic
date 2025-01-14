export default function handler(req, res) {
  const currentDateTime = new Date().toISOString();
  res.status(200).json({ datetime: currentDateTime });
}
