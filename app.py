from flask import Flask, request, jsonify
from flask_cors import CORS
import bs4 as bs
import requests
import newspaper
from newspaper import Article
import nltk
from pymongo import MongoClient
import re
import os
import base64

nltk.download('punkt')
import requests

app = Flask(__name__)
CORS(app) 

def is_gallery_in_url(url):
    lowercase_url = url.lower()

    return 'gallery' in lowercase_url

def is_live_in_url(url):
    lowercase_url = url.lower()

    return 'live' in lowercase_url

def is_av_in_url(url):
    lowercase_url = url.lower()
    
    

    return 'av' in lowercase_url

def is_shows_in_url(url):
    lowercase_url = url.lower()

    return 'shows' in lowercase_url
def select_video(avatar_url, background_url):
    # Example mapping of avatar and background to video
    print("\n")
    print(os.getcwd())
    print("\n")
    
    video_mapping = {
        ('iris.png', 'Background1.jpg'): 'VIDS/AVATAR4/TalkTales4.mp4',
        ('iris.png', 'Background2.jpg'): 'VIDS/AVATAR4/TalkTales1.mp4',
        ('iris.png', 'Background3.jpg'): 'VIDS/AVATAR4/TalkTales.mp4',
        ('iris.png', 'Background4.jpg'): 'VIDS/AVATAR4/TalkTales2.mp4',
        ('iris.png', 'Background5.jpg'): 'VIDS/AVATAR4/TalkTales3.mp4',
        ('sam.png', 'Background1.jpg'): 'VIDS/AVATAR1/TalkTales.mp4',
        ('sam.png', 'Background2.jpg'): 'VIDS/AVATAR1/TalkTales1.mp4',
        ('sam.png', 'Background3.jpg'): 'VIDS/AVATAR1/TalkTales2.mp4',
        ('sam.png', 'Background4.jpg'): 'VIDS/AVATAR1/TalkTales3.mp4',
        ('sam.png', 'Background5.jpg'): 'VIDS/AVATAR1/TalkTales4.mp4',
        ('isabella.png', 'Background1.jpg'): 'VIDS/AVATAR3/TalkTales4.mp4',
        ('isabella.png', 'Background2.jpg'): 'VIDS/AVATAR3/TalkTales3.mp4',
        ('isabella.png', 'Background3.jpg'): 'VIDS/AVATAR3/TalkTales2.mp4',
        ('isabella.png', 'Background4.jpg'): 'VIDS/AVATAR3/TalkTales.mp4',
        ('isabella.png', 'Background5.jpg'): 'VIDS/AVATAR3/TalkTales1.mp4',
        ('stewart.png', 'Background1.jpg'): 'VIDS/AVATAR2/TalkTales.mp4',
        ('stewart.png', 'Background2.jpg'): 'VIDS/AVATAR2/TalkTales1.mp4',
        ('stewart.png', 'Background3.jpg'): 'VIDS/AVATAR2/TalkTales2.mp4',
        ('stewart.png', 'Background4.jpg'): 'VIDS/AVATAR2/TalkTales3.mp4',
        ('stewart.png', 'Background5.jpg'): 'VIDS/AVATAR2/TalkTales4.mp4',
        # Add more mappings as needed
    }
    
    # Check if the combination exists in the mapping
    if (avatar_url, background_url) in video_mapping:
        return video_mapping[(avatar_url, background_url)]
    else:
        # Default video if no specific combination is found
        return 'no video found'

@app.route('/submit-data', methods=['POST'])


def submit_data():
    data = request.get_json()

    selected_image_url = data.get('selectedImageName', '') + '.png'
    selected_back_url = data.get('selectedBackName', '') + '.jpg'
    keyword = data.get('userText', '').strip()
    url_text = data.get('urlText', '')
    lang_name = data.get('selectedlangName', '') 

    print(f"Selected Image Name: {selected_image_url}")
    print(f"Selected Back Name: {selected_back_url}")
    print(f"Keyword: {keyword}")
    print(f"User URL: {url_text}")
    print(f"Language: {lang_name}")
    # audio_file_path = 'english_female.wav'
    # with open(audio_file_path, 'rb') as audio_file:
    #     audio_data = audio_file.read()
    # audio_base64 = base64.b64encode(audio_data).decode('utf-8')
    
    # # Prepare the JSON payload
    # payload = {
    #     'audio': audio_base64,
    #     'lang_name': lang_name,
    #     # Add other data as needed
    # }
    # video_url = select_video(selected_image_url, selected_back_url)
    # print(f"Video URL: {video_url}")
    # with open(video_url, 'rb') as video_file:
    #     video_data = video_file.read()
    # video_base64 = base64.b64encode(video_data).decode('utf-8')
    
    # # Prepare the JSON payload
    # payload = {
    #     'video': video_base64,
    #     'lang_name': lang_name,
    #     # Add other data as needed
    # }
    # ngrok_url='https://e090-35-247-118-43.ngrok-free.app/receive_audio'
    # response = requests.post(ngrok_url, json=payload)
    # print(response.text)
    # response_data = response.json()
    # received_video_base64 = response_data.get('video', '')
    # if received_video_base64:
    #     # Decode the base64 string back into bytes
    #     received_video_bytes = base64.b64decode(received_video_base64)

    #     # Save the video file
    #     received_video_filename = "received_video.mp4"
    #     with open(received_video_filename, 'wb') as received_video_file:
    #         received_video_file.write(received_video_bytes)
    #     print(f"Received video saved as {received_video_filename}")
    # else:
    #     print("No video data received in the response.")
    client = MongoClient('localhost', 27017)
    print(client)
    db = client.article_data1
    collection = db.cnn
    collection2 = db.bbc
    collection3 = db.geo
    # print(collection)
    # print(collection2)
    # print(collection3)
    user_text = re.split(r'\s+', keyword)
    # print(user_text)
    # Use sets to avoid duplicates
    titles_and_links = {
        'CNN': {'titles': set(), 'links': set()},
        'BBC': {'titles': set(), 'links': set()},
        'GEO': {'titles': set(), 'links': set()}
    }
    
    for kw in user_text:
        query = {"title": {"$regex": kw, "$options": "i"}}
        articles = collection.find(query)
        for article in articles:
            titles_and_links['CNN']['titles'].add(article.get('title', ''))
            titles_and_links['CNN']['links'].add(article.get('link', ''))

    for kw in user_text:
        query = {"title": {"$regex": kw, "$options": "i"}}
        articles = collection2.find(query)
        for article in articles:
            titles_and_links['BBC']['titles'].add(article.get('title', ''))
            titles_and_links['BBC']['links'].add(article.get('link', ''))

    for kw in user_text:
        query = {"title": {"$regex": kw, "$options": "i"}}
        articles = collection3.find(query)
        for article in articles:
            titles_and_links['GEO']['titles'].add(article.get('title', ''))
            titles_and_links['GEO']['links'].add(article.get('link', ''))

    response_data = {'message': 'Data received successfully', 'articles': []}
    # print("Here are the links:",titles_and_links)
    # Convert sets back to lists and add them to response_data
    for source, data in titles_and_links.items():
        titles = list(data['titles'])
        links = list(data['links'])
        for title, link in zip(titles, links):
            response_data['articles'].append({'title': title, 'link': link, 'source': source})
    print(response_data)
    return jsonify(response_data)


@app.route('/fetch-article', methods=['POST'])
def fetch_article():
    data = request.get_json()
    print(f"Data from page: {data}")
    article_link = data.get('links', '')
    print("Article links:",article_link)
    articles_content = []
    # for link in article_link:
    #     try:
    #         print(link)
    #         article = Article(link)
    #         article.download()
    #         article.parse()
    #         print(article.text)
    #         cleaned_text = article.text.replace('\n', '')
    #         cleaned_text = cleaned_text.replace('CNN', '')
    #         articles_content.append({
    #             'link': link,
    #             'title': article.title,
    #             'text': cleaned_text
    #         })
    #         print("\n")
    #         # print("Here is the text:\n")
    #         # print(cleaned_text)
    #         # for article in articles_content:
    #         #     print(articles_content['text'])
    #         # ngrok_public_url = 'https://7557-39-58-143-214.ngrok-free.app/process-input'
    #         # response = requests.get(ngrok_public_url, json={'context': cleaned_text})
    #         # print("Here is the response:",response)
    #         # if response.status_code == 200:
    #         #     print(response.text)
    #         #     return jsonify({'message': response.text})
    #         # else:
    #         #     return jsonify({'error': f'Error sending data to ngrok: {response.text}'})

             
    #     except Exception as e:
    #         print(f"Failed to process article at {link}: {e}")
    
    cleaned_text = ""  # Initialize cleaned_text as an empty string
    for link in article_link:
        try:
            print(link)
            article = Article(link)
            article.download()
            article.parse()
            print(article.text)
            text_to_append = article.text.replace('\n', '').replace('CNN', '')  # Clean text for current article
            cleaned_text += text_to_append  # Append text of current article to cleaned_text
            print("\n")
            articles_content.append({
                'link': link,
                'title': article.title,
                'text': text_to_append  # Append cleaned text of current article to articles_content
            })
            print("\n")
            print("Here is the text:\n")
            print(cleaned_text)
            ngrok_url='https://42f1-35-233-224-81.ngrok-free.app/process-input'
            response = requests.post(ngrok_url, json={'context': cleaned_text})
            print(response.text)
            if response.status_code == 200:
                # response.text = response.text.replace('\n', '').strip()
                # response.text = response.text.replace('result:', '').strip()
                # response.text = response.text.replace('1. Introduction:', '').strip()
                # response.text = response.text.replace('2. Body', '').strip()
                # response.text = response.text.replace('3. Conclusion:', '').strip()
                return jsonify({'message': response.text})
            else:
                return jsonify({'error': f'Error sending data to ngrok: {response.text}'})

            # print("Response from Colab API:", response.json())
            # ngrok_public_url = 'https://7557-39-58-143-214.ngrok-free.app/process-input'
            # response = requests.get(ngrok_public_url, json={'context': cleaned_text})
            # print("Here is the response:",response)
            # if response.status_code == 200:
            #     print(response.text)
            #     return jsonify({'message': response.text})
            # else:
            #     return jsonify({'error': f'Error sending data to ngrok: {response.text}'})

        except Exception as e:
            print(f"Error processing article from link {link}: {e}")
        # print("\n")
        # print("Here is the cleaned_text:",cleaned_text)
        return jsonify({'message': 'Articles fetched successfully', 'articles': articles_content})
# @app.route('/fetch-article', methods=['POST'])
# def fetch_article():
#     try:
#         data = request.get_json()
#         links = data.get('links', [])
#         articles_data = []

#         for link in links:
#             article = Article(link)
#             article.download()
#             article.parse()
#             articles_data.append({
#                 'title': article.title,
#                 'text': article.text
#             })

#         return jsonify({'articles': articles_data}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
@app.route('/edited-text', methods=['POST'])
def handle_edited_text():
    edited_text = request.json.get('editedText')
    print(f"Received edited text: {edited_text}")
    ngrok_url='https://42f1-35-233-224-81.ngrok-free.app/editable-text'
    response = requests.post(ngrok_url, json={'context': edited_text})
    print(response.text)
    if response.status_code == 200:
        # response.text = response.text.replace('\n', '').strip()
        # response.text = response.text.replace('result:', '').strip()
        # response.text = response.text.replace('1. Introduction:', '').strip()
        # response.text = response.text.replace('2. Body', '').strip()
        # response.text = response.text.replace('3. Conclusion:', '').strip()
        return jsonify({'message': response.text})
    else:
        return jsonify({'error': f'Error sending data to ngrok: {response.text}'})
    return jsonify({'message': 'Data received successfully'})
    # ngrok_url='https://5d99-35-199-50-131.ngrok-free.app/editable-text'
    # response = requests.post(ngrok_url, json={'context': edited_text})
    # print(response.text)
    # if response.status_code == 200:
    #     # response.text = response.text.replace('\n', '').strip()
    #     # response.text = response.text.replace('result:', '').strip()
    #     # response.text = response.text.replace('1. Introduction:', '').strip()
    #     # response.text = response.text.replace('2. Body', '').strip()
    #     # response.text = response.text.replace('3. Conclusion:', '').strip()
    #     return jsonify({'message': response.text})
    # else:
    #     return jsonify({'error': f'Error sending data to ngrok: {response.text}'})
# import re
@app.route('/extract-image', methods=['POST'])
def extracted_image_text():

    generated_text = """
    Introduction:
    - Narration: "Welcome to TalkTales, where news meets truth."
    - Visual: [Image of a cryptocurrency exchange platform]
    subtitle: "Binance founder resigns, pleads guilty to money laundering charges"

    Paragraph 1:
    - Narration: "In a significant development for the cryptocurrency industry, Binance founder Changpeng Zhao has resigned and pleaded guilty to federal money laundering charges. The settlement, worth $4.3bn, is the biggest-ever corporate resolution involving criminal charges for an executive."
    - Visual: [Image of Changpeng Zhao]
    subtitle: "Binance's future at the top of the crypto world is now uncertain"

    Paragraph 2:
    - Narration: "US authorities accused Binance of allowing bad actors on the platform, enabling transactions linked to child sex abuse, narcotics, and terrorist financing."
    - Visual: [Image of a computer screen displaying illicit transactions]
    subtitle: "Binance faces criminal charges"

    Paragraph 3:
    - Narration: "The settlement reflects Binance's status as a systemically important institution, potentially too big to fail, according to experts. The news has caused investors to withdraw approximately $956m from Binance within the last 24 hours, according to data firm Nansen."
    - Visual: [Image of a graph showing the decrease in Binance's investment]
    subtitle: "Investors withdraw $956m from Binance"

    Conclusion:
    - Narration: "In conclusion, Binance founder Changpeng Zhao has resigned and pleaded guilty to federal money laundering charges, facing a maximum of 10 years behind bars. The settlement, worth $4.3bn, is the biggest-ever corporate resolution involving criminal charges for an executive. The news has caused investors to withdraw approximately $956m from Binance within the last 24 hours. Stay updated, stay with us."
    - Visual: [Image of a cryptocurrency exchange platform with a warning sign]
    subtitle: "Stay vigilant in the crypto world"

    End Script.
    """

    # Split text into segments
    segments = re.split(r'\n\n+', generated_text)

    # Initialize lists to store extracted data
    narration_list = []
    visual_list = []
    subtitle_list = []

    # Pattern for extracting required information
    pattern_narration = r'- Narration: "(.*?)"'
    pattern_visual = r'- Visual: \[(.*?)\]'
    pattern_subtitle = r'subtitle: "(.*?)"'

    # Loop through segments and extract required information
    for segment in segments:
        narration = re.search(pattern_narration, segment)
        visual = re.search(pattern_visual, segment)
        subtitle = re.search(pattern_subtitle, segment)

        if narration:
            narration_list.append(narration.group(1))

        if visual:
            visual_list.append(visual.group(1))

        if subtitle:
            subtitle_list.append(subtitle.group(1))

    # Display extracted information
    print("Narration:")
    for narration in narration_list:
        print(narration)
    print("\nVisual:")
    for visual in visual_list:
        print(visual)
    print("\nSubtitle:")
    for subtitle in subtitle_list:
        print(subtitle)
    # ngrok_url='https://dfb4-34-150-209-182.ngrok-free.app/process_prompts'






if __name__ == '__main__':
    app.run(debug=True)