from flask import Flask, render_template, request
import os 
from google import genai
from google.genai import types

API_KEY = "AIzaSyDGynJ26T6eFt7HvszpcCpT6hbqxVoFk-8"

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

import base64
from email.mime.text import MIMEText

from uuid import uuid4

dir_path = os.path.dirname(os.path.realpath(__file__))
cwd = os.getcwd()
print(dir_path)
print(cwd)

# If modifying these scopes, delete the file token.json.
SCOPES = ["https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/calendar.addons.current.event.write",
            "https://www.googleapis.com/auth/calendar.events.owned"
]


token = {
    "token": "ya29.a0AS3H6NwU6Dlhy7Z2S4-OWox41LtGCJfDUCszG7TKgMLTRyzhiSgsL8pN4H6FCKDCrwZPvTG7bPsp47_djIVuqWpygwNEGJ1rRdOn4R7uREoEeHgDIcs1WQLzyqukHGVbe1RSAU_YyONcB__WewXykUsm-T8E8-dStb3IRTKWaCgYKAfYSARASFQHGX2MiDhN3EH54KszTZzXuuOOq4Q0175", 
    "refresh_token": "1//03yKylmOB17smCgYIARAAGAMSNwF-L9Ir9BGJP6aQY9CSfXWexvbnb2QrWRRdJZcKHY2or3-zaUF36aHGlf8L6WuaXwmij32a3QM", 
    "token_uri": "https://oauth2.googleapis.com/token", 
    "client_id": "369801294760-u2q32oja7co87k35blf5848dp7tqqj7t.apps.googleusercontent.com", 
    "client_secret": "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", 
    "scopes": ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.addons.current.event.write", "https://www.googleapis.com/auth/calendar.events.owned"], 
    "universe_domain": "googleapis.com", 
    "account": "", 
    "expiry": "2025-06-29T07:25:30Z"
}

creds = Credentials.from_authorized_user_info(token, SCOPES)

"""
creds = None
# The file token.json stores the user's access and refresh tokens, and is
# created automatically when the authorization flow completes for the first
# time.
if os.path.exists("token.json"):
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)



# If there are no (valid) credentials available, let the user log in.
if not creds or not creds.valid:
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
    else:
        flow = InstalledAppFlow.from_client_secrets_file(
            "credentials.json", SCOPES
        )
        creds = flow.run_local_server(port=0)
# Save the credentials for the next run
#with open("token.json", "w") as token:
#    token.write(creds.to_json())
"""

# Define the function declaration for the model
schedule_meeting_function = {
    "name": "schedule_meeting",
    "description": "I send you an invitation for a meeting about a topic with Bastian Scharnagl a given time and date. You have to provide your email, the date, time and topic of the meeting.",
    "parameters": {
        "type": "object",
        "properties": {
            "email": {
                "type": "string",
                "description": "Your email",
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
        "required": ["email", "date", "time", "topic"],
    },
}


def schedule_meeting(email, date, time, topic):
    """
    Function to schedule a meeting.
    In a real application, this would interact with a calendar API or database.
    Here, it simply returns a confirmation message.
    """
    try:
        service = build("calendar", "v3", credentials=creds)

        start_datetime = f"{date}T{time}:00"
        end_datetime = f"{date}T{int(time.split(':')[0]) + 1}:{time.split(':')[1]}:00"  # Assuming a 1-hour meeting

        event = {
        "conferenceData": {
            "createRequest": {
            "requestId": f"{uuid4().hex}", 
            "conferenceSolutionKey": {
                "type": "hangoutsMeet"
            }
            }
        },
        "attendees": [
            {"email": "bastian.scharnagl@hof-university.de"}, 
            {"email": email}
        ],
        "start": {
            "dateTime": start_datetime, 
            'timeZone': 'Europe/Berlin'
        },
        "end": {
            "dateTime": end_datetime, 
            'timeZone': 'Europe/Berlin'
        },
        "summary": topic,
        "reminders": {"useDefault": True}
        }
                    
        event = service.events().insert(calendarId='primary', sendNotifications=True, body=event, conferenceDataVersion=1).execute()
        return f"Der Online-Termin am {date} um {time} zum Thema {topic} wurde geplant. Sie erhalten in Kürze eine Einladung per E-Mail an die Adresse {email}."

    except HttpError as error:
        print(f"An error occurred: {error}")
        return error.message

# Configure the client and tools
client = genai.Client(api_key=API_KEY)
tools = types.Tool(function_declarations=[schedule_meeting_function])

def create_cache(contents):
    """Create a cache for the given contents."""
    return client.caches.create(
        model='gemini-2.5-flash',
        config=types.CreateCachedContentConfig(
            contents=contents,
        ),
    )

def create_config(contents):
    """Create a configuration for the model with the given cache."""
    return types.GenerateContentConfig(
        tools=[tools],
        system_instruction="Du bist BS-3PO, ein netter, Protokolldroide und nimmst gerne Anfragen an. Du kannst Termine für Online Meetings mit Bastian Scharnagl planen. Du besitzt den Funktionsaufruf Meeting erstellen. Du denkst selber mit und kannst die Anfragen entsprechend umformulieren und verarbeiten.",
        cached_content=create_cache(contents).name if contents else None,
    )

config = types.GenerateContentConfig(tools=[tools], system_instruction="Du bist BS-3PO, ein netter, Protokolldroide und nimmst gerne Anfragen an. Du kannst Termine für Online Meetings mit Bastian Scharnagl planen. Du besitzt den Funktionsaufruf Meeting erstellen. Du denkst selber mit und kannst die Anfragen entsprechend umformulieren und verarbeiten.")

app = Flask(__name__)

prompts = []
contents = []

def get_completion(prompt):
    # Send request with function declarations
    prompts.append(prompt)

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompts,
        config=config,
    )
    contents.append(types.Content(
        role="user", parts=[types.Part(text=prompt)]
    ))  # Append user input to contents
    
    print(f"Response: {response}")
    return response

@app.route("/")
def home():
  return render_template("index.html")

@app.route("/get")
def get_bot_response():
    # Check for a function call
    response = get_completion(request.args.get("msg"))
    for candidate in response.candidates:
        for part in candidate.content.parts:
            if part.function_call:


                #    if response.candidates[0].content.parts[0].function_call:
                function_call = part.function_call
                print(f"Function to call: {function_call.name}")
                print(f"Arguments: {function_call.args}")
                #  In a real app, you would call your function here:
                #  result = schedule_meeting(**function_call.args)
                # Create a function response part
                # Extract tool call details, it may not be in the first part.
                tool_call = part.function_call

                if tool_call.name == "schedule_meeting":
                    result = schedule_meeting(**tool_call.args)
                    print(f"Function execution result: {result}")
                    return result

                
                function_response_part = types.Part.from_function_response(
                    name=tool_call.name,
                    response={"result": result},
                )

                # Append function call and result of the function execution to contents
                contents.append(response.candidates[0].content) # Append the content from the model's response.
                contents.append(types.Content(role="user", parts=[function_response_part])) # Append the function response

                final_response = client.models.generate_content(
                    model="gemini-2.5-flash",
                    config=config,
                    contents=contents,
                )
                print(f"Final response: {final_response}")
                return final_response.text
        
    else:
        print("No function call found in the response.")
        print(response.text)
        return response.text

if __name__ == "__main__":
  app.run()