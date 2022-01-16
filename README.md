# AdvocAI
## Your AI Lawyer
Have you ever needed legal advice in a pinch? <br>
Maybe you simply cannot afford the high fees on quick legal consultations? <br>
Even worse, maybe you felt your question is a waste of a professional's time? <br>

If any of these questions resonate with you, then AdvocAI is at your service! 
<br><br>

## Getting Started
The easiest way to get started is to clone the repository:
```bash
# Get the latest snapshot
git clone https://github.com/KolCrooks/AdvocAI.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
npm run start
```

Make sure you have `npm` and Node.js v10+ installed. If you don't have them yet installed, we recommend using [`nvm`](https://github.com/creationix/nvm).
<br><br>

## Purpose
AdvocAI is tuned with data collected from thousands of legal advice-related discussions from real users on Reddit. It is a conversational machine learning based web application to provide contextual legal advice. From the data, AdvocAI quickly generates the most appropriate advice learned through ML and extrapolation, and presents it to the user - YOU!
<br> <br>

## Why Did We Create AdvocAI?
* A great foray into ML projects
* Shows potential in automating general starting steps of legal consultation
    * Help lower costs and increase accessibility
* Trained on Reddit comments, so fun results!
<br><br>

## Tools and Technologies 
### Data Collection
* Scrape over 1000 posts from Reddit's [r/legaladvice](https://www.reddit.com/r/legaladvice/)
* Posts have rating greater or equal to 20
* Four comments are extracted from each post - top two most upvoted comments ("good") and top two most downvoted comments ("bad")
    * The AI was trained for both "good" and "bad" responses
    * The final deployment only uses the good models. The "bad" models are used for AI training purposes

### AI Tuning
* The artificial intelligence of AdvocAI is a tuned OpenAI GPT-3 Model

### Frontend & Backend
* Frontend: React and Tailwind 
* Backend: Python web framework FastAPI

### Deployment
* Finally, we deployed our web applicatio on Heroku and Github Pages. 
<br><br>

## AdvocAI's Future 
The future for AdvocAI is promising! The current model only uses training from approximately 4000 post-comment pairs on the posts to give recommendations. 

### More Data Collection
Given more time, more posts and comments can be scraped from the internet. The current deployed version of the AdvocAI model provides fairly relevant recommendations regardless of the absurdity of the question. However, with additional data, more precise and relevant responses can be achieved. 

### Controversial Advice Model
Additionally, we think it would be fun to add a Controversial Advice Model using the most downvoted comments. Downvoted comments were used for model training purposes, but they are not deployed for consumer use. In the future, we can refine and deploy the "evil twin of AdvocAI". 
<br><br>

## The Creators
This project was created by Team Valley at NWHacks 2022. 
* Kol Crooks 
    * [Github](https://github.com/KolCrooks) | [LinkedIn](https://www.linkedin.com/in/kolcrooks/)
* Yeojun Han 
    * [Github](https://github.com/yeojunh) | [LinkedIn](https://www.linkedin.com/in/yeojun-han-3640571b3/)
* Cyrus Kalafchi 
    * [Github](https://github.com/cyruskalafchi) | [LinkedIn](https://www.linkedin.com/in/cyruskalafchi/)
* Lance Tan 
    * [Github](https://github.com/ltan02) | [LinkedIn](https://www.linkedin.com/in/lancetan02/)
