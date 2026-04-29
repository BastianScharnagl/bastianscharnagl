"""
Reddit Analyzer for r/wallstreetbets
Analyzes stock mentions in the last 100 posts
"""

import requests
import re
import json
from collections import Counter
from urllib.parse import urlencode
from typing import Set
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Reddit API configuration
REDDIT_BASE_URL = "https://www.reddit.com"
SUBREDDIT = "wallstreetbets"
USER_AGENT = "WallStreetBetsAnalyzer/1.0"

# SEC API for valid tickers
SEC_HEADERS = {'User-Agent': 'Bastian Scharnagl bastian.scharnagl@gmail.com'}
SEC_TICKERS_URL = "https://www.sec.gov/files/company_tickers.json"

# Cache for valid tickers
valid_tickers: Set[str] = set()

app = FastAPI(
    title="Financial Data API",
    description="Access multi-year financial statements from SEC data",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_valid_tickers() -> Set[str]:
    """Fetch valid stock tickers from SEC"""
    global valid_tickers

    if valid_tickers:
        return valid_tickers
    try:
        response = requests.get(
            SEC_TICKERS_URL,
            headers=SEC_HEADERS
        )
        response.raise_for_status()
        data = response.json()
        
        # Extract ticker symbols from SEC data
        for company in data.values():
            if 'ticker' in company:
                valid_tickers.add(company['ticker'].upper())

        print(f"Loaded {len(valid_tickers)} valid tickers from SEC")
        return valid_tickers
    except requests.RequestException as e:
        print(f"Error fetching SEC tickers: {e}")
        return set()


def get_posts(limit=100):
    """Fetch the latest posts from r/wallstreetbets"""
    headers = {
        "User-Agent": USER_AGENT
    }

    params = {
        "limit": limit,
        "show": "all"
    }

    url = f"{REDDIT_BASE_URL}/r/{SUBREDDIT}/new.json?{urlencode(params)}"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()

        posts = []
        for child in data.get('data', {}).get('children', []):
            post = child.get('data', {})
            posts.append({
                'title': post.get('title', ''),
                'selftext': post.get('selftext', ''),
                'id': post.get('id', ''),
                'created_utc': post.get('created_utc', 0)
            })

        return posts
    except requests.RequestException as e:
        print(f"Error fetching posts: {e}")
        return []


def extract_tickers(text):
    """Extract valid stock tickers from text using SEC data"""
    # Pattern to match stock tickers (1-5 uppercase letters)
    pattern = r'[A-Z]{1,5}\b'
    
    words = re.findall(pattern, text.upper())
    
    # Filter to only include valid SEC tickers
    valid = get_valid_tickers()
    tickers = [w for w in words if w in valid]
    
    return tickers


@app.get("/analyze")
def analyze_posts(limit: int = 100):
    """Analyze posts for stock ticker mentions"""
    ticker_counts = []
    
    posts = get_posts(limit=limit)

    for post in posts:
        # Combine title and selftext for analysis
        text = f"{post['title']} {post['selftext']}"
        
        # Extract tickers
        tickers = extract_tickers(text)
        
        # Count each ticker
        for ticker in tickers:
            # Check if ticker is already in counts
            if ticker not in [t["name"] for t in ticker_counts]:
                ticker_counts.append({"name": ticker, "count": 1})
            else:
                for existing_ticker in ticker_counts:
                    if existing_ticker["name"] == ticker:
                        existing_ticker["count"] += 1
                        break

    # Sort tickers by count in descending order
    ticker_counts.sort(key=lambda x: x["count"], reverse=True)

    return ticker_counts


def test():
    print(f"Fetching latest 100 posts from r/{SUBREDDIT}...")
    
    # Load valid tickers from SEC
    get_valid_tickers()

    posts = get_posts(limit=100)
    
    if not posts:
        print("No posts retrieved. Please check your internet connection.")
        return
    
    print(f"Analyzed {len(posts)} posts\n")
    
    # Analyze tickers
    ticker_counts = analyze_posts(posts)
    
    # Display results
    print(f"{'='*50}")
    print(f"Stock Ticker Analysis - r/{SUBREDDIT}")
    print(f"{'='*50}")
    print(f"\nTop 100 Most Mentioned Stocks:")
    print(f"{'-'*30}")
    
    for rank, (ticker, count) in enumerate(ticker_counts.most_common(100), 1):
        print(f"{rank:2}. ${ticker:5} - {count:3} mentions")
    
    print(f"\n{'='*50}")
    print(f"Total unique tickers found: {len(ticker_counts)}")
    print(f"{'='*50}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
    