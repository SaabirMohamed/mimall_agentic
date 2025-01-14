export default function handler(req, res) {
  const fakeWeatherData = {
    location: 'Johannesburg, Lenasia',
    temperature: '25°C',
    condition: 'Sunny',
    humidity: '50%',
    wind: '10 km/h'
  };
  res.status(200).json({ weather: fakeWeatherData });
}
