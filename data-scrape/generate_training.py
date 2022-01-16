import os
import json
import pandas as pd

data = []
for file in os.listdir('./submissions'):
    if file.endswith('.json'):
        with open(f'./submissions/{file}', 'r') as f:
            data += json.load(f)

transformed_data = []


def filter_post(s: str):
    for start in ["**No Clear", "*Your", "**Generally", "**Bad", "[removed]", "[deleted]"]:
        if s.startswith(start):
            return False
    return True


def sanitize(s):
    return s.replace('###', '').replace(
        'END', '').replace('Q:', '').replace('T:', '').replace('B:', '')


for d in data:
    d['comments'].sort(key=lambda x: x['score'])
    cnt = 0
    selected = []
    if len(d['comments']) < 5:
        continue
    for i in range(2):
        c_good = d['comments'][-i-1]
        if filter_post(c_good['body']):
            selected.append((c_good, "GOOD"))
        c_bad = d['comments'][i]
        if filter_post(c_bad['body']):
            selected.append((c_bad, "BAD"))

    d['title'] = sanitize(d['title'])
    d['body'] = sanitize(d['body'])

    transformed_data += [{
        'prompt': f" Q: {d['title']}\nT: {type}\nB: {d['body']}\n\n###\n\n",
        'completion': f"{comment['body']} END",
    } for comment, type in selected]

print("STATISTICS:")
print(f"Total Examples: {len(transformed_data)}")
print(
    f"Total Characters: {sum([len(d['prompt']) + len(d['completion']) for d in transformed_data])}")
pd.DataFrame(transformed_data).to_csv('./training_data.csv', index=False)

print('Done!')
