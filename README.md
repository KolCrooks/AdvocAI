# AdvocAI
## Your AI Lawyer
Have you ever wished you could instantly ask for legal advAIce? The wait is over - AdvocAI is at your service! 
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
AdvocAI is tuned with data collected from thousands of legal advice-related posts from real users on Reddit. From the data, AdvocAI generates the most appropriate advice learned through machine learning and extrapolation, and presents it to the user - YOU!
<br><br>

## Technologies 
Artificial intelligence is a tuned OpenAI GPT-3 Model, trained on thousands of posts and comments from Reddit's [r/legaladvice](https://www.reddit.com/r/legaladvice/). 

Over 1000 posts of rating greater or equal to 20 were scraped and 4 comments were extracted from each post. The AI was trained for "good" and "bad" responses: the "good" comments are the two most upvoted comments, while the "bad" advice are the 2 most downvoted comments.

We implemented the back-end with FastAPI to serve completion requests. The front-end is achieved through React and Tailwind. Finally, we deployed the domain on Heroku.
<br><br>

## AdvocAI's Future 
The future for AdvocAI is promising! The current model only uses training from approximately 2000 most upvoted comments on the posts to give recommendations. 

Given more time, more posts and comments can be scraped from the internet. The current deployed version of the AdvocAI model provides fairly relevant recommendations regardless of the absurdity of the question. However, with additional data, more precise and relevant responses can be achieved. 

Additionally, the most downvoted comments were used for model training purposes, but they are not deployed for consumer use yet. In the future, we can refine and deploy the evil twin of AdvocAI. 
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
