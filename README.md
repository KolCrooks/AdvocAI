# AdvocAI
## Your AI Lawyer
Have you ever wished you could instantly ask for legal advice? The wait is over - AdvocAI is at your service! 
<br><br>

# Purpose
AdvocAI is trained with data collected from thousands of legal advice-related posts from real users on Reddit. Why ask thousands of people when you can ask a designated AI once? From the data, AvocAI generates the most appropriate advice and presents it to the user - YOU!
<br><br>

# Technologies 
Artificial intelligence is a tuned OpenAI GPT-3 Model, trained on thousands of posts and comments from Reddit's [r/legaladvice](https://www.reddit.com/r/legaladvice/). 

Over 1000 posts of rating greater or equal to 20 were scraped and 4 comments were extracted from each post. The AI was trained for "good" and "bad" responses: the "good" comments are the two most upvoted comments, while the "bad" advice are the 2 most downvoted comments.

We implemented the back-end with FastAPI to serve completion requests. The front-end is achieved through React and Tailwind. Finally, we deployed the domain on Heroku.
<br><br>

# Future
The future for AdvocAI is promising! The current model only uses training from approximately 4000 most upvoted comments on the posts to give recommendations. 

Given more time, more posts and comments can be scraped from the interet. The current deployed version of the AdvocAI model provides fairly relevant recommendations regardless of the absurdity of the question. However, with additional data, more precise and relevant responses can be achieved. 

Additionally, the most downvoted comments were used for model training purposes, but they are not deployed for consumer use yet. In the future, we can refine and deploy the evil twin of AdvocAI. 
