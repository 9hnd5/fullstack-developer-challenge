from typing import List
from collections import Counter
from bs4 import BeautifulSoup
import requests

def get_website_text(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    return soup.get_text(" ", strip=True)


def compute_word_histogram(text: str) -> List[dict]:
    words = text.lower().split(" ")
    word_frequencies = Counter(words)
    sorted_words = sorted(word_frequencies.items(), key=lambda x: x[1], reverse=True)
    top_words = sorted_words[:100]
    return [{"word": word, "frequency": frequency} for word, frequency in top_words]