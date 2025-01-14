from pydantic_ai import Agent
import requests

class WeatherAgent(Agent):
    async def get_weather(self, location: str) -> dict:
        # Example API call
        response = requests.get(f"https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q={location}")
        return response.json()
