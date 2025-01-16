import asyncio
import os
import uuid

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import Client, create_client

from orchestrator_agent import AgentType, Orchestrator, TaskRequest

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


# Load environment variables
load_dotenv(".env.local")

# Initialize Supabase client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_API_KEY")
hyperbolic_api_key = os.getenv(
    "HYPERBOLIC_API_KEY"
)  # Add Hyperbolic API key to .env.local

if not supabase_url or not supabase_key:
    raise ValueError("Missing Supabase credentials in .env.local")

print(f"Initializing Supabase client with URL: {supabase_url}")
supabase: Client = create_client(supabase_url, supabase_key)

# Initialize Orchestrator
orchestrator = Orchestrator()


@app.route("/")
def health_check():
    return jsonify({"status": "healthy"}), 200


@app.route("/api/discover_session", methods=["GET"])
def discover_session():
    try:
        # Generate a unique session ID
        session_id = str(uuid.uuid4())
        print(f"Generated session ID: {session_id}")

        # Insert into Supabase with default values
        data = (
            supabase.table("canna_ui_state")
            .insert(
                {
                    "sessionId": session_id,
                    "home": "",
                    "about": "",
                    "products": "",
                    "current_route": "/products",  # default route
                }
            )
            .execute()
        )

        return jsonify({"session_id": session_id, "status": "success"})
    except Exception as e:
        print(f"Error in discover_session: {str(e)}")
        return jsonify({"error": str(e), "status": "error"}), 500


@app.route("/api/update_ui", methods=["POST"])
def update_ui():
    try:
        data = request.get_json()
        if not data or "sessionId" not in data or "view_portal" not in data:
            return (
                jsonify(
                    {
                        "error": "Missing required fields: sessionId and view_portal",
                        "status": "error",
                    }
                ),
                400,
            )

        session_id = data["sessionId"]
        view_portal = data["view_portal"]

        # Update the view_portal content in the database
        result = (
            supabase.table("canna_ui_state")
            .update(
                {"home": view_portal, "view_portal": view_portal}  # Store in home field
            )
            .eq("sessionId", session_id)
            .execute()
        )

        if not result.data:
            return jsonify({"error": "Session not found", "status": "error"}), 404

        return jsonify(
            {
                "status": "success",
                "message": "UI updated successfully",
                "sessionId": session_id,
            }
        )

    except Exception as e:
        print(f"Error in update_ui: {str(e)}")
        return jsonify({"error": str(e), "status": "error"}), 500


@app.route("/api/get_weather", methods=["POST"])
async def get_weather():
    try:
        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Missing query parameter"}), 400

        query = data["query"]
        task_request = TaskRequest(
            task=f"Get the weather forecast for {query}",
            input_data={},
            agent_type=AgentType.RESEARCH,
        )
        response = await orchestrator.delegate_task(task_request)
        return jsonify({"forecast": response})
    except Exception as e:
        print(f"Error processing weather request: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/ask_deepseekv3", methods=["POST"])
async def ask_deepseekv3():
    try:
        payload = request.get_json()
        if not payload:
            return jsonify({"error": "Missing payload"}), 400

        url = "https://api.hyperbolic.xyz/v1/chat/completions"
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {hyperbolic_api_key}",
        }
        data = {
            "messages": payload.get("messages", []),
            "model": payload.get("model", "deepseek-ai/DeepSeek-V3"),
            "max_tokens": payload.get("max_tokens", 512),
            "temperature": payload.get("temperature", 0.1),
            "top_p": payload.get("top_p", 0.9),
            "stream": payload.get("stream", False),
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=data)
            response.raise_for_status()
            return jsonify(response.json())

    except httpx.HTTPStatusError as e:
        print(f"HTTP error occurred: {e}")
        return jsonify({"error": str(e)}), e.response.status_code
    except Exception as e:
        print(f"Error in ask_deepseekv3: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/publisher', methods=['POST'])
def publisher():
    try:
        # Get JSON data from request
        data = request.get_json()
        
        if not data or 'app_name' not in data:
            return jsonify({'error': 'app_name is required'}), 400
            
        app_name = data['app_name']
        
        # Change to the specified directory
        os.chdir(f'/home/saabir/ai/websites/{app_name}')
        
        # Construct the command
        command = f"npm i && npm run build && pm2 delete {app_name} && pm2 start --name {app_name} npm -- run start && pm2 save"
        
        # Execute the command
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        
        # Check if command was successful
        if result.returncode == 0:
            return jsonify({
                'status': 'success',
                'message': 'Deployment completed successfully',
                'output': result.stdout
            })
        else:
            return jsonify({
                'status': 'error',
                'message': 'Deployment failed',
                'error': result.stderr
            }), 500
            
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': 'Internal server error',
            'error': str(e)
        }), 500


# Debug: Print all registered routes
print("Server running on port 8000")
print("Available endpoints:")
for rule in app.url_map.iter_rules():
    print(f"- {rule.methods} {rule}")


if __name__ == "__main__":
    app.run(port=8000, debug=True)
