# import replicate
# import requests
# import os
# from pydub import AudioSegment
# from pydub.playback import play

# # Run the Replicate model to get the audio URL
# output = replicate.run(
#     "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0",
#     input={
#         "task_name": "T2ST (Text to Speech translation)",
#         "input_text": "Welcome to TalkTales, where news meets truth.",
#         "input_text_language": "English",
#         "max_input_audio_length": 60,
#         "target_language_text_only": "Urdu",
#         "target_language_with_speech": "Urdu"
#     }
# )

# # Print the output for debugging purposes
# print(output)

# # Extract the URL of the generated audio file
# audio_url = output['audio_output']  # Adjust based on the actual output structure
# print(audio_url)
# # Download the audio file
# # response = requests.get(audio_url)
# # audio_file_path = 'output_audio.wav'

# # with open(audio_file_path, 'wb') as f:
# #     f.write(response.content)

# output = replicate.run(
#     "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef",
#     input={
#         "fps": 25,
#         "face": "https://imgur.com/C2cLsa1.mp4",
#         "pads": "0 10 0 0",
#         "audio": audio_url,
#         "smooth": True,
#         "resize_factor": 1
#     }
# )
# print(output)


# import replicate
# import requests
# import os
# from pydub import AudioSegment
# from pydub.playback import play

# # Set the first API key for the first request
# os.environ['REPLICATE_API_TOKEN'] = 'r8_RmnopnuSu5qWssLC9PTbYv7WaWIQ7wb2K4qNQ'

# # Run the Replicate model to get the audio URL
# output_audio = replicate.run(
#     "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0",
#     input={
#         "task_name": "T2ST (Text to Speech translation)",
#         "input_text": "Welcome to TalkTales, where news meets truth.",
#         "input_text_language": "English",
#         "max_input_audio_length": 60,
#         "target_language_text_only": "Urdu",
#         "target_language_with_speech": "Urdu"
#     }
# )

# # Print the output for debugging purposes
# print(output_audio)

# # Extract the URL of the generated audio file
# audio_url = output_audio['audio_output']  # Adjust based on the actual output structure
# print(audio_url)


# # Set the second API key for the second request
# os.environ['REPLICATE_API_TOKEN'] = 'r8_RmfIONcyGt91wjH9YPNj40pmQ1eUkYR3C9wja'

# # Run the Replicate model to generate the video with lip sync
# output_video = replicate.run(
#     "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef",
#     input={
#         "fps": 25,
#         "face": "https://imgur.com/C2cLsa1.mp4",
#         "pads": "0 10 0 0",
#         "audio": audio_url,
#         "smooth": True,
#         "resize_factor": 1
#     }
# )

# # Print the output for debugging purposes
# print(output_video)

# Extract the URL of the generated video file
# video_url = output_video['video']

# # Download the video file
# response = requests.get(video_url)
# video_file_path = 'output_video.mp4'

# with open(video_file_path, 'wb') as f:
#     f.write(response.content)

# print(f"Video saved to {video_file_path}")





# import replicate
# import requests
# import os
# import time
# from pydub import AudioSegment
# from pydub.playback import play

# def run_replicate_model(api_token, model_name, input_params, max_retries=5):
#     os.environ['REPLICATE_API_TOKEN'] = api_token
#     for attempt in range(max_retries):
#         try:
#             output = replicate.run(model_name, input=input_params)
#             return output
#         except replicate.exceptions.ModelError as e:
#             if '429' in str(e):
#                 print(f"Rate limit exceeded, retrying... (Attempt {attempt + 1} of {max_retries})")
#                 time.sleep(10)  # Wait for 10 seconds before retrying
#             else:
#                 raise e
#     raise Exception(f"Failed to run the Replicate model after {max_retries} attempts")

# # Set the first API key and run the audio generation model
# audio_model_name = "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0"
# audio_input_params = {
#     "task_name": "T2ST (Text to Speech translation)",
#     "input_text": "Welcome to TalkTales, where news meets truth.",
#     "input_text_language": "English",
#     "max_input_audio_length": 60,
#     "target_language_text_only": "Urdu",
#     "target_language_with_speech": "Urdu"
# }
# output_audio = run_replicate_model('r8_RmnopnuSu5qWssLC9PTbYv7WaWIQ7wb2K4qNQ', audio_model_name, audio_input_params)

# # Print the output for debugging purposes
# print(output_audio)

# # Extract the URL of the generated audio file
# audio_url = output_audio['audio_output']
# print(audio_url)


# # Set the second API key and run the video generation model
# video_model_name = "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef"
# video_input_params = {
#     "fps": 25,
#     "face": "https://imgur.com/C2cLsa1.mp4",
#     "pads": "0 10 0 0",
#     "audio": audio_url,
#     "smooth": True,
#     "resize_factor": 1
# }
# output_video = run_replicate_model('r8_RmfIONcyGt91wjH9YPNj40pmQ1eUkYR3C9wja', video_model_name, video_input_params)

# # Print the output for debugging purposes
# print(output_video)

# import replicate
# import requests
# import os
# import time
# from pydub import AudioSegment
# from pydub.playback import play
# import httpx

# def run_replicate_model(api_token, model_name, input_params, max_retries=5, timeout=500):
#     os.environ['REPLICATE_API_TOKEN'] = api_token
#     for attempt in range(max_retries):
#         try:
#             output = replicate.run(model_name, input=input_params, timeout=timeout)
#             return output
#         except replicate.exceptions.ModelError as e:
#             if '429' in str(e):
#                 print(f"Rate limit exceeded, retrying... (Attempt {attempt + 1} of {max_retries})")
#                 time.sleep(10)  # Wait for 10 seconds before retrying
#             else:
#                 raise e
#         except httpx.ReadTimeout as e:
#             print(f"Request timed out, retrying... (Attempt {attempt + 1} of {max_retries})")
#             time.sleep(10)  # Wait for 10 seconds before retrying
#     raise Exception(f"Failed to run the Replicate model after {max_retries} attempts")

# # Set the first API key and run the audio generation model
# audio_model_name = "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0"
# audio_input_params = {
#     "task_name": "T2ST (Text to Speech translation)",
#     "input_text": "Welcome to TalkTales, where news meets truth.",
#     "input_text_language": "English",
#     "max_input_audio_length": 60,
#     "target_language_text_only": "Urdu",
#     "target_language_with_speech": "Urdu"
# }
# output_audio = run_replicate_model('r8_RmnopnuSu5qWssLC9PTbYv7WaWIQ7wb2K4qNQ', audio_model_name, audio_input_params)

# # Print the output for debugging purposes
# print(output_audio)

# # Extract the URL of the generated audio file
# audio_url = output_audio['audio_output']
# print(audio_url)



# # Set the second API key and run the video generation model
# video_model_name = "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef"
# video_input_params = {
#     "fps": 25,
#     "face": "https://imgur.com/C2cLsa1.mp4",
#     "pads": "0 10 0 0",
#     "audio": audio_url,
#     "smooth": True,
#     "resize_factor": 1
# }
# output_video = run_replicate_model('r8_RmfIONcyGt91wjH9YPNj40pmQ1eUkYR3C9wja', video_model_name, video_input_params)

# # Print the output for debugging purposes
# print(output_video)


import replicate
import requests
import os
import time
import httpx
from pydub import AudioSegment
from pydub.playback import play

def run_replicate_model(api_token, model_name, input_params):
    os.environ['REPLICATE_API_TOKEN'] = api_token
    output = replicate.run(model_name, input=input_params)
    return output
      

# Set the first API key and run the audio generation model
audio_model_name = "cjwbw/seamless_communication:668a4fec05a887143e5fe8d45df25ec4c794dd43169b9a11562309b2d45873b0"
audio_input_params = {
    "task_name": "T2ST (Text to Speech translation)",
    "input_text": "Welcome to TalkTales, where news meets truth. The situation in Gaza has reached a critical point. The blame game continues as the UN human rights chief accuses Israel. The US calls for Israel to permit entry of UN agency chief and questions targeting of aid convoys. In conclusion, the situation in Gaza remains dire.",
    "input_text_language": "English",
    "max_input_audio_length": 60,
    "target_language_text_only": "Urdu",
    "target_language_with_speech": "Urdu",
    "speaker_id": 11  # Example value, replace with actual value for the desired gender

}
output_audio = run_replicate_model('r8_RmnopnuSu5qWssLC9PTbYv7WaWIQ7wb2K4qNQ', audio_model_name, audio_input_params)

# Print the output for debugging purposes
print(output_audio)

# Extract the URL of the generated audio file
audio_url = output_audio['audio_output']
print(audio_url)


# Set the second API key and run the video generation model
video_model_name = "devxpy/cog-wav2lip:8d65e3f4f4298520e079198b493c25adfc43c058ffec924f2aefc8010ed25eef"
video_input_params = {
    "fps": 25,
    "face": "https://talktalesvideo-c9b9f013d514.herokuapp.com/Videos/TalkTales.mp4",
    "pads": "0 10 0 0",
    "audio": audio_url,
    "smooth": True,
    "resize_factor": 1
}
output_video = run_replicate_model('r8_RmfIONcyGt91wjH9YPNj40pmQ1eUkYR3C9wja', video_model_name, video_input_params)

# Print the output for debugging purposes
print(output_video)

# Extract the URL of the generated video file
# video_url = output_video['video']

# # Download the video file
# response = requests.get(video_url)
# video_file_path = 'output_video.mp4'

# with open(video_file_path, 'wb') as f:
#     f.write(response.content)

# print(f"Video saved to {video_file_path}")
