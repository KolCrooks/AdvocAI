import pandas as pd
from pmaw import PushshiftAPI
from tqdm import tqdm
import datetime as dt
import json

api = PushshiftAPI(num_workers=8*5)

before = int(dt.datetime(2021, 1, 1).timestamp())
after = int(dt.datetime(2020, 1, 1).timestamp())

subreddit = "LegalAdvice"


submission_gen = api.search_submissions(
    subreddit=subreddit, before=before, after=after, score='>19', limit=1000)

subs = []
for s in submission_gen:
    try:
        subs.append({'id': s['id'], 'title': s['title'], 'body': s['selftext'],
                     'score': s['score']})
    except:
        pass

    if len(subs) == 100:
        for s in tqdm(subs, desc='collecting comments'):
            ids = [i for i in api.search_submission_comment_ids(
                ids=s['id'])]
            s['comments'] = [{'id': c['id'], 'body': c['body'], 'score': c['score']} for c in api.search_comments(
                ids=ids, filterFn=lambda c: c['parent_id'] == c['link_id'])]

        with open(f"./submissions/{dt.datetime.now()}.json", 'w') as f:
            json.dump(subs, f)

        subs = []
