from pydantic_ai import Agent
from datetime import datetime

class DateTimeAgent(Agent):
    async def get_current_datetime(self):
        return datetime.now().isoformat()
