from pydantic_ai import Agent
from bs4 import BeautifulSoup
import requests

class WebScrapingAgent(Agent):
    async def scrape_website(self, url: str) -> str:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.title.string
