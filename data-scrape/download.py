import pandas as pd
import pmaw
from pmaw import PushshiftAPI
import datetime as dt
api = PushshiftAPI()

before = int(dt.datetime(2021, 1, 1).timestamp())
after = int(dt.datetime(2020, 1, 1).timestamp())

subreddit = "LegalAdvice"
limit = 100

_subs = api.search_submissions(subreddit=subreddit, before=before, after=after)
subs = [s for s in _subs]
print(subs[0])

# dataframe = pd.DataFrame(comments)
# dataframe.to_csv('./comments.csv', header=True, index=False, columns=list(dataframe.axes[1]))