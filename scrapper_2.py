import bs4 as bs
import requests
from pymongo import MongoClient

keywords_to_exclude = ['topics', 'av', 'business', 'technology', 'science_and_environment', 'entertainment_and_arts', 'health', 'world_radio_and_tv', 'in_pictures', 'reality_check', 'newsbeat', 'asia', 'middle_east', 'europe', 'wales', 'england','world/asia','uk','us_and_canada','latin_america','aisa/china','asia/india','world/middle_east','world/europe','live']

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

def contains_keywords(url):
    lowercase_url = url.lower()
    parts = lowercase_url.split('/news/')
    if len(parts) > 1:
        segment = parts[1]
        subparts = segment.split('-')  # Split by '-' to handle URLs like 'world-asia-68422821'
        for subpart in subparts:
            for keyword in keywords_to_exclude:
                if keyword in subpart:
                    return True
    return False



def get_bbc_article_links(sections):
    base_url = "https://www.bbc.com"
    article_links = []

    for section in sections:
        section_url = base_url + section
        response = requests.get(section_url)
        soup = bs.BeautifulSoup(response.text, 'html.parser')

        for link in soup.find_all('a', href=True):
            if '/article/' in link['href']:
                article_links.append(base_url + link['href'])

    return article_links

def get_bbc_news_links(sections):
    base_url = "https://www.bbc.com"
    article_links = []

    for section in sections:
        section_url = base_url + section
        response = requests.get(section_url)
        soup = bs.BeautifulSoup(response.text, 'html.parser')

        for link in soup.find_all('a', href=True):
            if '/news/' in link['href'] and not contains_keywords(link['href']):
                article_links.append(base_url + link['href'])

    return article_links

client = MongoClient('localhost', 27017)
db = client['article_data4']
collection = db['bbc']

sections = ['/news', '/sport', '/weather','/worklife','/travel','/culture','/future']
bbc_article_links = get_bbc_article_links(sections)
bbc_article_links.extend(get_bbc_news_links(sections))

for link in bbc_article_links:
    try:
        response = requests.get(link)
        soup = bs.BeautifulSoup(response.text, 'html.parser')
        title = soup.title.string.strip()
        
        # Check if article already exists in the collection
        if collection.find_one({'title': title}):
            print("Article already exists:", title)
            continue
        
        article = {
            'title': title,
            'source': 'BBC',
            'link': link
        }
        
        collection.insert_one(article)
        print("Article inserted:", article)
    except Exception as e:
        print("Error processing article:", e)


