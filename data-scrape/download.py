import pandas as pd
import pmaw
from pmaw import PushshiftAPI
import datetime as dt
api = PushshiftAPI()

before = int(dt.datetime(2021, 1, 1).timestamp())
after = int(dt.datetime(2020, 1, 1).timestamp())

subreddit = "LegalAdvice"
limit = 100

submission_gen = api.search_submissions(
    subreddit=subreddit, before=before, after=after, score='=>19')

subs = []
for s in submission_gen:

    try:
        subs.append({'id': s['id'], 'title': s['title'], 'body': s['selftext'],
                    'score': s['score']})
    except:
        pass

    if len(subs) == 100:
        for s in subs:
            ids = [i for i in api.search_submission_comment_ids(
                ids=s['id'])]
            s['comments'] = [c for c in api.search_comments(
                ids=ids, filterFn=lambda c: c['link_id'][:2] == 't3')]

        df = pd.DataFrame(subs)
        df.to_csv(f'./submissions/{dt.datetime.now()}.csv', header=True, index=False,
                  columns=list(df.axes[1]))
        subs = []
