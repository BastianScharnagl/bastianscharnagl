from flask import Flask, render_template, request

from google import genai
from google.genai import types

API_KEY = "AIzaSyDGynJ26T6eFt7HvszpcCpT6hbqxVoFk-8"

# Define the function declaration for the model
schedule_meeting_function = {
    "name": "schedule_meeting",
    "description": "Schedules a meeting about a topic with me at a given time and date. You have to provide your name, the date, time and topic of the meeting.",
    "parameters": {
        "type": "object",
        "properties": {
            "name": {
                "type": "string",
                "items": {"type": "string"},
                "description": "Your name",
            },
            "date": {
                "type": "string",
                "description": "Date of the meeting (e.g., '2024-07-29')",
            },
            "time": {
                "type": "string",
                "description": "Time of the meeting (e.g., '15:00')",
            },
            "topic": {
                "type": "string",
                "description": "The subject or topic of the meeting.",
            },
        },
        "required": ["name", "date", "time", "topic"],
    },
}

def schedule_meeting(attendees, date, time, topic):
    """
    Function to schedule a meeting.
    In a real application, this would interact with a calendar API or database.
    Here, it simply returns a confirmation message.
    """
    return f"Meeting scheduled with {', '.join(attendees)} on {date} at {time} about '{topic}'."

# Configure the client and tools
client = genai.Client(api_key=API_KEY)
tools = types.Tool(function_declarations=[schedule_meeting_function])
config = types.GenerateContentConfig(tools=[tools], system_instruction="Du bist Bastian Scharnagl, ein Softwareentwickler und nimmst gerne Anfragen an. Du kannst Funktionen ausführen, um Anfragen zu bearbeiten. Antworte auf Anfragen mit den entsprechenden Funktionen, wenn nötig. Antworte aus der Perspektive von Bastian Scharnagl.")

app = Flask(__name__)

def get_completion(prompt):
    # Send request with function declarations
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=config,
    )
    print(f"Response: {response}")
    return response

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/get")
def get_bot_response():
    # Check for a function call
    response = get_completion(request.args.get("msg"))
    if response.candidates[0].content.parts[0].function_call:
        function_call = response.candidates[0].content.parts[0].function_call
        print(f"Function to call: {function_call.name}")
        print(f"Arguments: {function_call.args}")
        #  In a real app, you would call your function here:
        #  result = schedule_meeting(**function_call.args)
        # Create a function response part
        # Extract tool call details, it may not be in the first part.
        tool_call = response.candidates[0].content.parts[0].function_call

        if tool_call.name == "schedule_meeting":
            result = schedule_meeting(**tool_call.args)
            print(f"Function execution result: {result}")
            return result

        """
        function_response_part = types.Part.from_function_response(
            name=tool_call.name,
            response={"result": result},
        )

        # Append function call and result of the function execution to contents
        contents = [response.candidates[0].content] # Append the content from the model's response.
        contents.append(types.Content(role="user", parts=[function_response_part])) # Append the function response

        final_response = client.models.generate_content(
            model="gemini-2.5-flash",
            config=config,
            contents=contents,
        )
        print(f"Final response: {final_response}")
        return final_response.text
        """
    else:
        print("No function call found in the response.")
        print(response.text)
        return response.text

if __name__ == "__main__":
  app.run()