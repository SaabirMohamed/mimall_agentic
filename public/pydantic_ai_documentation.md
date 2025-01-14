# Pydantic AI Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
4. [Agents](#agents)
5. [Teams](#teams)
6. [Message Handling](#message-handling)
7. [Integration Examples](#integration-examples)
8. [Best Practices](#best-practices)
9. [Advanced Features](#advanced-features)
10. [Retrieval Augmented Generation (RAG)](#retrieval-augmented-generation-rag)
11. [Tool-Using Agents](#tool-using-agents)
12. [Specific Agent Examples](#specific-agent-examples)
13. [Message History](#message-history)
14. [Results and Error Handling](#results-and-error-handling)
15. [Dependencies and Configuration](#dependencies-and-configuration)
16. [Pydantic Models Integration](#pydantic-models-integration)
17. [API Reference Summary](#api-reference-summary)

## Introduction

Pydantic AI is a powerful framework for building AI agents and teams using Python. It leverages Pydantic's data validation capabilities to create type-safe AI applications.

## Installation

```bash
pip install pydantic-ai
```

## Core Concepts

### 1. Messages
Messages are the fundamental unit of communication in Pydantic AI. They are strongly typed and validated.

```python
from pydantic_ai import Message

class CustomerQuery(Message):
    query: str
    customer_id: str
    priority: int = 1

# Create a message
query = CustomerQuery(
    query="When will my order arrive?",
    customer_id="cust_123"
)
```

### 2. Schemas
Schemas define the structure of data that agents can work with.

```python
from pydantic import BaseModel
from pydantic_ai import Schema

class OrderStatus(Schema):
    order_id: str
    status: str
    estimated_delivery: str
    tracking_number: str | None = None
```

## Agents

Agents are autonomous entities that can process messages and perform tasks.

### Basic Agent

```python
from pydantic_ai import Agent, Message

class CustomerServiceAgent(Agent):
    name = "customer_service"
    description = "Handles customer queries about orders"

    async def process(self, message: CustomerQuery) -> str:
        # Agent logic here
        response = await self.think(f"How should I respond to: {message.query}")
        return response

# Initialize agent
agent = CustomerServiceAgent()
```

### Agent with Memory

```python
from pydantic_ai import Agent, Memory

class SupportAgent(Agent):
    def __init__(self):
        self.memory = Memory()
    
    async def process(self, message: Message):
        # Access previous context
        context = await self.memory.get_context(message)
        
        # Process with context
        response = await self.think(
            message.content,
            context=context
        )
        
        # Store new memory
        await self.memory.store(message, response)
        return response
```

## Teams

Teams allow multiple agents to collaborate on complex tasks.

```python
from pydantic_ai import Team, Agent

class OrderTeam(Team):
    def __init__(self):
        self.agents = {
            'customer_service': CustomerServiceAgent(),
            'logistics': LogisticsAgent(),
            'billing': BillingAgent()
        }
    
    async def process(self, message: Message):
        # Route message to appropriate agent
        if 'order' in message.content.lower():
            return await self.agents['logistics'].process(message)
        elif 'payment' in message.content.lower():
            return await self.agents['billing'].process(message)
        else:
            return await self.agents['customer_service'].process(message)
```

## Message Handling

### 1. Synchronous Processing

```python
from pydantic_ai import Agent

# Simple synchronous processing
response = agent.process_sync(message)
```

### 2. Asynchronous Processing

```python
import asyncio
from pydantic_ai import Agent

# Async processing
async def handle_message():
    response = await agent.process(message)
    return response

# Run async
asyncio.run(handle_message())
```

### 3. Stream Processing

```python
from pydantic_ai import Agent

class StreamAgent(Agent):
    async def process_stream(self, message: Message):
        async for token in self.think_stream(message.content):
            yield token
```

## Integration Examples

### 1. FastAPI Integration

```python
from fastapi import FastAPI
from pydantic_ai import Agent, Message

app = FastAPI()
agent = CustomerServiceAgent()

@app.post("/chat")
async def chat(message: Message):
    response = await agent.process(message)
    return {"response": response}
```

### 2. WebSocket Integration

```python
from fastapi import FastAPI, WebSocket
from pydantic_ai import Agent

app = FastAPI()
agent = StreamAgent()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    while True:
        message = await websocket.receive_text()
        async for response in agent.process_stream(message):
            await websocket.send_text(response)
```

## Best Practices

1. **Type Safety**
   - Always define proper message types
   - Use Pydantic models for data validation
   - Leverage type hints for better code quality

```python
from typing import List, Optional
from pydantic import BaseModel
from pydantic_ai import Message

class OrderItem(BaseModel):
    product_id: str
    quantity: int
    price: float

class OrderMessage(Message):
    order_items: List[OrderItem]
    shipping_address: str
    customer_notes: Optional[str] = None
```

2. **Error Handling**

```python
from pydantic_ai import Agent, AgentError

class RobustAgent(Agent):
    async def process(self, message: Message):
        try:
            response = await self.think(message.content)
            return response
        except AgentError as e:
            logger.error(f"Agent error: {e}")
            return "I apologize, but I encountered an error processing your request."
        except Exception as e:
            logger.critical(f"Unexpected error: {e}")
            raise
```

3. **Memory Management**

```python
from pydantic_ai import Memory, Message

class ManagedMemory(Memory):
    async def store(self, message: Message, response: str):
        # Implement custom storage logic
        await self.db.insert({
            'message': message.dict(),
            'response': response,
            'timestamp': datetime.now()
        })
    
    async def get_context(self, message: Message):
        # Retrieve relevant context
        recent_messages = await self.db.find({
            'customer_id': message.customer_id,
            'timestamp': {'$gt': datetime.now() - timedelta(hours=24)}
        })
        return recent_messages
```

4. **Agent Configuration**

```python
from pydantic_ai import Agent, Config

class ConfigurableAgent(Agent):
    def __init__(self, config: Config):
        self.config = config
        self.temperature = config.temperature
        self.max_tokens = config.max_tokens
        self.model = config.model
    
    async def think(self, prompt: str):
        return await self.llm.complete(
            prompt,
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            model=self.model
        )
```

5. **Team Coordination**

```python
from pydantic_ai import Team, Agent, Message
from typing import Dict

class CoordinatedTeam(Team):
    def __init__(self, agents: Dict[str, Agent]):
        self.agents = agents
        self.coordinator = CoordinatorAgent()
    
    async def process(self, message: Message):
        # Let coordinator decide which agent should handle the message
        assigned_agent = await self.coordinator.assign_agent(message)
        
        # Process with assigned agent
        response = await self.agents[assigned_agent].process(message)
        
        # Post-process if needed
        if assigned_agent != 'customer_service':
            response = await self.agents['customer_service'].format_response(response)
        
        return response
```

## Advanced Features

### 1. Chain of Thought Processing

Chain of Thought allows agents to break down complex tasks into smaller steps:

```python
from pydantic_ai import Agent, ChainOfThought

class AnalyticsAgent(Agent):
    async def process_with_cot(self, message: Message):
        chain = ChainOfThought([
            "Understand the data request",
            "Validate data availability",
            "Process raw data",
            "Generate insights",
            "Format response"
        ])
        
        async for step, result in chain.process(message):
            # Log intermediate steps
            self.logger.info(f"Step {step}: {result}")
            
            # You can modify the chain based on intermediate results
            if step == "Validate data availability" and not result.success:
                return "Required data is not available"
        
        return chain.final_result
```

### 2. Prompt Templates

Sophisticated prompt management using templates:

```python
from pydantic_ai import PromptTemplate, Agent

class SophisticatedAgent(Agent):
    def __init__(self):
        self.templates = {
            'customer_service': PromptTemplate("""
                As a customer service agent, help the customer with their query.
                Previous interactions: {history}
                Customer type: {customer_type}
                Current query: {query}
                Tone: {tone}
                Response format: {format}
            """),
            'technical_support': PromptTemplate("""
                As a technical support specialist, assist with the technical issue.
                System details: {system_info}
                Error logs: {logs}
                User description: {description}
                Priority level: {priority}
            """)
        }
    
    async def process(self, message: Message):
        template = self.templates[message.category]
        prompt = template.format(
            history=await self.get_history(message.customer_id),
            customer_type=await self.get_customer_type(message.customer_id),
            query=message.content,
            tone="professional",
            format="step-by-step"
        )
        return await self.think(prompt)
```

### 3. Advanced Memory Systems

Implementing sophisticated memory management:

```python
from pydantic_ai import Memory, VectorStore, Message
from typing import List, Dict

class AdvancedMemory(Memory):
    def __init__(self):
        self.vector_store = VectorStore()
        self.short_term = []
        self.long_term = {}
    
    async def store(self, message: Message, response: str):
        # Store in vector database for semantic search
        await self.vector_store.add({
            'text': message.content + " " + response,
            'embedding': await self.get_embedding(message.content),
            'metadata': message.dict()
        })
        
        # Keep in short-term memory
        self.short_term.append({
            'message': message,
            'response': response,
            'timestamp': datetime.now()
        })
        
        # Manage short-term memory size
        if len(self.short_term) > 10:
            self.short_term.pop(0)
        
        # Update long-term memory
        customer_id = message.customer_id
        if customer_id not in self.long_term:
            self.long_term[customer_id] = []
        self.long_term[customer_id].append({
            'interaction': {'message': message, 'response': response},
            'timestamp': datetime.now()
        })
    
    async def get_context(self, message: Message) -> Dict:
        # Get semantic similar messages
        similar = await self.vector_store.search(
            query=message.content,
            num_results=5
        )
        
        # Get recent interactions
        recent = self.short_term[-5:]
        
        # Get customer history
        customer_history = self.long_term.get(message.customer_id, [])[-5:]
        
        return {
            'semantic_similar': similar,
            'recent_interactions': recent,
            'customer_history': customer_history
        }
```

### 4. Integration with External Services

#### a. OpenAI Integration

```python
from pydantic_ai import Agent
import openai

class OpenAIAgent(Agent):
    def __init__(self, api_key: str):
        openai.api_key = api_key
        
    async def think(self, prompt: str) -> str:
        response = await openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=150
        )
        return response.choices[0].message.content
```

#### b. Database Integration

```python
from pydantic_ai import Agent
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

class DatabaseAgent(Agent):
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def get_customer_data(self, customer_id: str):
        query = select(Customer).where(Customer.id == customer_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
    
    async def process(self, message: Message):
        # Get customer data
        customer = await self.get_customer_data(message.customer_id)
        
        # Enhance message with customer data
        enhanced_prompt = f"""
        Customer: {customer.name}
        Membership: {customer.membership_level}
        Query: {message.content}
        """
        
        return await self.think(enhanced_prompt)
```

### 5. Advanced Team Patterns

#### a. Hierarchical Team Structure

```python
from pydantic_ai import Team, Agent
from typing import Dict, List

class Department(Team):
    def __init__(self, name: str, agents: List[Agent]):
        self.name = name
        self.agents = agents
        self.lead = self.assign_lead()
    
    def assign_lead(self) -> Agent:
        # Logic to select department lead
        return max(self.agents, key=lambda a: a.experience_level)

class Organization(Team):
    def __init__(self):
        self.departments: Dict[str, Department] = {
            'customer_service': Department('CS', [
                CustomerServiceAgent(),
                SupportAgent(),
                BillingAgent()
            ]),
            'technical': Department('Tech', [
                TechnicalAgent(),
                DevOpsAgent(),
                SecurityAgent()
            ])
        }
        self.ceo = ExecutiveAgent()
    
    async def process(self, message: Message):
        # Let CEO delegate to appropriate department
        department = await self.ceo.delegate(message)
        
        # Get department response
        response = await self.departments[department].process(message)
        
        # CEO reviews and modifies if needed
        final_response = await self.ceo.review(response)
        
        return final_response
```

#### b. Collaborative Problem Solving

```python
from pydantic_ai import Team, Agent, Message
from typing import List

class CollaborativeTeam(Team):
    def __init__(self, agents: List[Agent]):
        self.agents = agents
    
    async def brainstorm(self, problem: Message) -> List[str]:
        # Each agent generates ideas
        ideas = []
        for agent in self.agents:
            idea = await agent.think(problem.content)
            ideas.append(idea)
        return ideas
    
    async def evaluate(self, ideas: List[str]) -> Dict[str, float]:
        # Each agent scores each idea
        scores = {}
        for idea in ideas:
            score = 0
            for agent in self.agents:
                score += await agent.evaluate_idea(idea)
            scores[idea] = score / len(self.agents)
        return scores
    
    async def process(self, message: Message):
        # Generate ideas
        ideas = await self.brainstorm(message)
        
        # Evaluate ideas
        scores = await self.evaluate(ideas)
        
        # Select best idea
        best_idea = max(scores.items(), key=lambda x: x[1])[0]
        
        # Refine the solution
        final_solution = await self.refine_solution(best_idea)
        
        return final_solution
    
    async def refine_solution(self, solution: str) -> str:
        refined = solution
        for agent in self.agents:
            refined = await agent.improve(refined)
        return refined
```

### 6. Monitoring and Analytics

```python
from pydantic_ai import Agent, Metrics
from prometheus_client import Counter, Histogram

class MonitoredAgent(Agent):
    def __init__(self):
        self.metrics = Metrics(
            counters={
                'requests': Counter('agent_requests_total', 'Total requests processed'),
                'errors': Counter('agent_errors_total', 'Total errors encountered')
            },
            histograms={
                'latency': Histogram('agent_latency_seconds', 'Request latency')
            }
        )
    
    async def process(self, message: Message):
        start_time = time.time()
        self.metrics.counters['requests'].inc()
        
        try:
            response = await super().process(message)
            return response
        except Exception as e:
            self.metrics.counters['errors'].inc()
            raise
        finally:
            latency = time.time() - start_time
            self.metrics.histograms['latency'].observe(latency)
```

### 7. Testing Patterns

```python
import pytest
from pydantic_ai import Agent, Message

class TestAgent:
    @pytest.fixture
    def agent(self):
        return CustomerServiceAgent()
    
    @pytest.mark.asyncio
    async def test_simple_query(self, agent):
        message = Message(content="When will my order arrive?")
        response = await agent.process(message)
        assert "order" in response.lower()
        assert len(response) > 0
    
    @pytest.mark.asyncio
    async def test_memory_retention(self, agent):
        # First interaction
        msg1 = Message(content="My order number is 12345")
        await agent.process(msg1)
        
        # Second interaction should remember order number
        msg2 = Message(content="What's the status?")
        response = await agent.process(msg2)
        assert "12345" in response
    
    @pytest.mark.asyncio
    async def test_error_handling(self, agent):
        message = Message(content="")  # Empty message
        with pytest.raises(ValueError):
            await agent.process(message)
```

## Retrieval Augmented Generation (RAG)

### 1. Basic RAG Implementation

```python
from pydantic_ai import Agent, VectorStore, Document
from typing import List

class RAGAgent(Agent):
    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store
    
    async def retrieve(self, query: str, k: int = 3) -> List[Document]:
        # Get relevant documents
        docs = await self.vector_store.similarity_search(
            query=query,
            k=k
        )
        return docs
    
    async def process(self, message: Message) -> str:
        # Get relevant context
        docs = await self.retrieve(message.content)
        
        # Format context for the prompt
        context = "\n".join([doc.content for doc in docs])
        
        # Create augmented prompt
        prompt = f"""Using the following context, answer the question.
        
        Context:
        {context}
        
        Question: {message.content}
        
        Answer:"""
        
        return await self.think(prompt)
```

### 2. Advanced RAG with Chunking and Reranking

```python
from pydantic_ai import Agent, VectorStore, Document, Reranker
from typing import List
import numpy as np

class AdvancedRAGAgent(Agent):
    def __init__(self, vector_store: VectorStore, reranker: Reranker):
        self.vector_store = vector_store
        self.reranker = reranker
        self.chunk_size = 500
        self.chunk_overlap = 50
    
    async def chunk_document(self, doc: Document) -> List[Document]:
        # Split document into overlapping chunks
        text = doc.content
        chunks = []
        
        for i in range(0, len(text), self.chunk_size - self.chunk_overlap):
            chunk = text[i:i + self.chunk_size]
            chunks.append(Document(
                content=chunk,
                metadata={**doc.metadata, 'chunk_index': len(chunks)}
            ))
        
        return chunks
    
    async def retrieve_and_rerank(self, query: str, k: int = 10) -> List[Document]:
        # Initial retrieval
        docs = await self.vector_store.similarity_search(query, k=k)
        
        # Rerank results
        reranked = await self.reranker.rerank(
            query=query,
            documents=docs,
            top_k=3
        )
        
        return reranked
    
    async def process(self, message: Message) -> str:
        docs = await self.retrieve_and_rerank(message.content)
        context = "\n".join([doc.content for doc in docs])
        
        prompt = f"""Answer based on the following context. If the context doesn't contain relevant information, say so.
        
        Context:
        {context}
        
        Question: {message.content}
        
        Answer:"""
        
        return await self.think(prompt)
```

## Tool-Using Agents

### 1. Weather Agent Example

```python
from pydantic_ai import Agent, Tool
from typing import List
import aiohttp

class WeatherTool(Tool):
    name = "weather"
    description = "Get weather information for a location"
    
    async def run(self, location: str) -> dict:
        api_key = "your_api_key"
        url = f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={location}"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                data = await response.json()
                return {
                    'temperature': data['current']['temp_c'],
                    'condition': data['current']['condition']['text'],
                    'humidity': data['current']['humidity']
                }

class WeatherAgent(Agent):
    def __init__(self):
        self.tools = [WeatherTool()]
    
    async def process(self, message: Message) -> str:
        # Extract location from message
        location = await self.extract_location(message.content)
        
        # Get weather data
        weather_data = await self.tools[0].run(location)
        
        # Format response
        response = f"The weather in {location} is {weather_data['condition']} "
        response += f"with a temperature of {weather_data['temperature']}°C "
        response += f"and {weather_data['humidity']}% humidity."
        
        return response
    
    async def extract_location(self, text: str) -> str:
        prompt = f"Extract the location from: {text}"
        location = await self.think(prompt)
        return location.strip()
```

### 2. Web Scraping Agent

```python
from pydantic_ai import Agent, Tool
from bs4 import BeautifulSoup
import aiohttp
from typing import List, Dict

class WebScraperTool(Tool):
    name = "web_scraper"
    description = "Scrape content from web pages"
    
    async def run(self, url: str) -> Dict[str, str]:
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                html = await response.text()
                
        soup = BeautifulSoup(html, 'html.parser')
        
        # Remove scripts and styles
        for script in soup(["script", "style"]):
            script.decompose()
        
        return {
            'title': soup.title.string if soup.title else '',
            'text': soup.get_text(separator='\n'),
            'links': [a.get('href') for a in soup.find_all('a', href=True)]
        }

class WebScrapingAgent(Agent):
    def __init__(self):
        self.tools = [WebScraperTool()]
    
    async def process(self, message: Message) -> str:
        # Extract URL from message
        url = await self.extract_url(message.content)
        
        # Scrape content
        content = await self.tools[0].run(url)
        
        # Analyze content based on user's query
        prompt = f"""Analyze the following webpage content in relation to the user's query.
        
        Webpage Title: {content['title']}
        Content: {content['text'][:1000]}  # First 1000 chars for brevity
        
        User Query: {message.content}
        
        Analysis:"""
        
        analysis = await self.think(prompt)
        return analysis
    
    async def extract_url(self, text: str) -> str:
        prompt = f"Extract the URL from: {text}"
        url = await self.think(prompt)
        return url.strip()
```

### 3. SQL Generation Agent

```python
from pydantic_ai import Agent, Tool
from typing import List, Dict
import sqlalchemy as sa
from sqlalchemy.ext.asyncio import AsyncSession

class SQLTool(Tool):
    name = "sql_generator"
    description = "Generate and execute SQL queries"
    
    def __init__(self, session: AsyncSession, metadata: sa.MetaData):
        self.session = session
        self.metadata = metadata
    
    async def get_schema_info(self) -> str:
        tables = []
        for table in self.metadata.tables.values():
            columns = [f"{c.name} ({c.type})" for c in table.columns]
            tables.append(f"Table {table.name}:\n  " + "\n  ".join(columns))
        return "\n\n".join(tables)
    
    async def run(self, query: str) -> List[Dict]:
        try:
            result = await self.session.execute(sa.text(query))
            return [dict(row) for row in result]
        except Exception as e:
            return [{"error": str(e)}]

class SQLAgent(Agent):
    def __init__(self, session: AsyncSession, metadata: sa.MetaData):
        self.tools = [SQLTool(session, metadata)]
    
    async def process(self, message: Message) -> str:
        # Get schema information
        schema = await self.tools[0].get_schema_info()
        
        # Generate SQL query
        prompt = f"""Given the following database schema and user question, generate a SQL query.
        
        Schema:
        {schema}
        
        Question: {message.content}
        
        SQL Query:"""
        
        query = await self.think(prompt)
        
        # Execute query
        results = await self.tools[0].run(query)
        
        # Format results
        if "error" in results[0]:
            return f"Error executing query: {results[0]['error']}"
        
        # Generate natural language response
        response_prompt = f"""Convert these SQL results to a natural language response:
        
        Question: {message.content}
        Results: {results}
        
        Response:"""
        
        return await self.think(response_prompt)
```

### 4. Multi-Tool Agent

```python
from pydantic_ai import Agent, Tool
from typing import List, Dict

class MultiToolAgent(Agent):
    def __init__(self):
        self.tools = [
            WeatherTool(),
            WebScraperTool(),
            SQLTool(),
            CalculatorTool(),
            DateTimeTool()
        ]
    
    async def select_tool(self, query: str) -> Tool:
        prompt = f"""Given the following tools and user query, select the most appropriate tool:
        
        Tools:
        {[f"- {tool.name}: {tool.description}" for tool in self.tools]}
        
        Query: {query}
        
        Selected tool:"""
        
        tool_name = await self.think(prompt)
        return next(tool for tool in self.tools if tool.name == tool_name.strip())
    
    async def process(self, message: Message) -> str:
        # Select appropriate tool
        tool = await self.select_tool(message.content)
        
        # Extract necessary parameters
        params_prompt = f"""Extract parameters for the {tool.name} tool from: {message.content}"""
        params = await self.think(params_prompt)
        
        # Execute tool
        result = await tool.run(params)
        
        # Format response
        response_prompt = f"""Convert this tool result to a natural language response:
        
        Tool: {tool.name}
        Result: {result}
        Original query: {message.content}
        
        Response:"""
        
        return await self.think(response_prompt)
```

## Specific Agent Examples

### 1. Customer Service Agent

```python
from pydantic_ai import Agent, Message

class CustomerServiceAgent(Agent):
    name = "customer_service"
    description = "Handles customer queries about orders"

    async def process(self, message: Message) -> str:
        # Agent logic here
        response = await self.think(f"How should I respond to: {message.content}")
        return response
```

### 2. Technical Support Agent

```python
from pydantic_ai import Agent, Message

class TechnicalSupportAgent(Agent):
    name = "technical_support"
    description = "Assists with technical issues"

    async def process(self, message: Message) -> str:
        # Agent logic here
        response = await self.think(f"How should I respond to: {message.content}")
        return response
```

### 3. Billing Agent

```python
from pydantic_ai import Agent, Message

class BillingAgent(Agent):
    name = "billing"
    description = "Handles billing-related queries"

    async def process(self, message: Message) -> str:
        # Agent logic here
        response = await self.think(f"How should I respond to: {message.content}")
        return response
```

## Message History

### 1. Basic Message History

```python
from pydantic_ai import MessageHistory, Message
from typing import List

class ConversationHistory(MessageHistory):
    def __init__(self):
        self.messages: List[Message] = []
    
    async def add_message(self, message: Message):
        self.messages.append(message)
    
    async def get_context(self, k: int = 5) -> List[Message]:
        return self.messages[-k:]
    
    async def clear(self):
        self.messages = []
```

### 2. Persistent Message History

```python
from pydantic_ai import MessageHistory, Message
import aiosqlite

class SQLiteMessageHistory(MessageHistory):
    def __init__(self, db_path: str):
        self.db_path = db_path
    
    async def setup(self):
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute("""
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY,
                    role TEXT,
                    content TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            """)
            await db.commit()
    
    async def add_message(self, message: Message):
        async with aiosqlite.connect(self.db_path) as db:
            await db.execute(
                "INSERT INTO messages (role, content) VALUES (?, ?)",
                (message.role, message.content)
            )
            await db.commit()
    
    async def get_context(self, k: int = 5) -> List[Message]:
        async with aiosqlite.connect(self.db_path) as db:
            cursor = await db.execute(
                "SELECT role, content FROM messages ORDER BY timestamp DESC LIMIT ?",
                (k,)
            )
            rows = await cursor.fetchall()
            return [Message(role=row[0], content=row[1]) for row in reversed(rows)]
```

## Results and Error Handling

### 1. Result Types

```python
from pydantic_ai import Result, Success, Error
from typing import TypeVar, Generic

T = TypeVar('T')

class AgentResult(Result, Generic[T]):
    data: T | None = None
    error: str | None = None
    
    @classmethod
    def success(cls, data: T) -> 'AgentResult[T]':
        return cls(data=data, error=None)
    
    @classmethod
    def failure(cls, error: str) -> 'AgentResult[T]':
        return cls(data=None, error=error)

# Usage Example
class DataProcessor(Agent):
    async def process(self, message: Message) -> AgentResult[dict]:
        try:
            data = await self.process_data(message.content)
            return AgentResult.success(data)
        except Exception as e:
            return AgentResult.failure(str(e))
```

### 2. Error Handling

```python
from pydantic_ai import Agent, AgentError, ValidationError

class RobustAgent(Agent):
    async def safe_process(self, message: Message) -> Result:
        try:
            # Validate input
            if not message.content:
                raise ValidationError("Empty message content")
            
            # Process message
            result = await self.process(message)
            
            # Validate output
            if not self.is_valid_response(result):
                raise AgentError("Invalid response format")
            
            return Success(data=result)
            
        except ValidationError as e:
            return Error(error=f"Validation error: {str(e)}")
        except AgentError as e:
            return Error(error=f"Agent error: {str(e)}")
        except Exception as e:
            return Error(error=f"Unexpected error: {str(e)}")
    
    def is_valid_response(self, response: str) -> bool:
        return bool(response and len(response) <= 1000)
```

## Dependencies and Configuration

### 1. Dependency Injection

```python
from pydantic_ai import Agent, Depends
from typing import Annotated

class Database:
    async def query(self, sql: str):
        # Database implementation
        pass

class Cache:
    async def get(self, key: str):
        # Cache implementation
        pass

def get_db():
    return Database()

def get_cache():
    return Cache()

class DependentAgent(Agent):
    def __init__(
        self,
        db: Annotated[Database, Depends(get_db)],
        cache: Annotated[Cache, Depends(get_cache)]
    ):
        self.db = db
        self.cache = cache
    
    async def process(self, message: Message):
        # Check cache first
        cached = await self.cache.get(message.content)
        if cached:
            return cached
        
        # Query database
        result = await self.db.query(f"SELECT response FROM responses WHERE query = '{message.content}'")
        return result
```

### 2. Configuration Management

```python
from pydantic_ai import BaseConfig
from pydantic import Field

class AgentConfig(BaseConfig):
    model: str = Field(default="gpt-4", description="Model to use for completion")
    temperature: float = Field(default=0.7, ge=0, le=1)
    max_tokens: int = Field(default=150, gt=0)
    stop_sequences: list[str] = Field(default_factory=list)
    
    class Config:
        env_prefix = "AGENT_"  # Will load from AGENT_MODEL, AGENT_TEMPERATURE, etc.

class ConfigurableAgent(Agent):
    def __init__(self, config: AgentConfig):
        self.config = config
    
    async def think(self, prompt: str) -> str:
        return await self.llm.complete(
            prompt,
            model=self.config.model,
            temperature=self.config.temperature,
            max_tokens=self.config.max_tokens,
            stop=self.config.stop_sequences
        )
```

## Pydantic Models Integration

### 1. Model Definition

```python
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    id: str = Field(..., description="User's unique identifier")
    name: str = Field(..., min_length=1)
    email: str = Field(..., pattern=r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
    created_at: datetime = Field(default_factory=datetime.now)
    preferences: Optional[dict] = Field(default_factory=dict)

class Order(BaseModel):
    id: str
    user_id: str
    items: List[str]
    total: float = Field(..., ge=0)
    status: str = Field(..., pattern=r"^(pending|processing|shipped|delivered)$")
```

### 2. Model Usage in Agents

```python
from pydantic_ai import Agent, Message
from typing import List

class UserAgent(Agent):
    async def process_user(self, message: Message) -> User:
        # Extract user information from message
        user_data = await self.extract_user_info(message.content)
        
        # Validate and create user model
        try:
            user = User(**user_data)
            return user
        except ValueError as e:
            raise ValidationError(f"Invalid user data: {str(e)}")
    
    async def process_order(self, message: Message, user: User) -> Order:
        # Extract order information
        order_data = await self.extract_order_info(message.content)
        
        # Add user information
        order_data['user_id'] = user.id
        
        # Validate and create order model
        try:
            order = Order(**order_data)
            return order
        except ValueError as e:
            raise ValidationError(f"Invalid order data: {str(e)}")
```

## API Reference Summary

### Agent API
- `Agent`: Base class for all agents
- `process(message: Message) -> Any`: Main processing method
- `think(prompt: str) -> str`: LLM interaction method
- `validate(message: Message) -> bool`: Input validation

### Tools API
- `Tool`: Base class for tools
- `run(*args, **kwargs) -> Any`: Tool execution method
- `validate_input(*args, **kwargs) -> bool`: Input validation
- `validate_output(result: Any) -> bool`: Output validation

### Result API
- `Result[T]`: Generic result type
- `Success[T]`: Successful result container
- `Error`: Error result container
- `is_success() -> bool`: Check if result is successful
- `is_error() -> bool`: Check if result is error

### Messages API
- `Message`: Base message class
- `UserMessage`: User input message
- `SystemMessage`: System message
- `AssistantMessage`: Assistant response message
- `PromptPart`: Message component
- `UserPromptPart`: User prompt component
