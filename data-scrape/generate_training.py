import os
import json
import pandas as pd

data = []
for file in os.listdir('./submissions'):
    if file.endswith('.json'):
        with open(f'./submissions/{file}', 'r') as f:
            data += json.load(f)

transformed_data = []

for d in data:
    d['comments'].sort(key=lambda x: x['score'])
    cnt = 0
    selected = []
    if len(d['comments']) < 5:
        continue
    for i in range(2):
        c_good = d['comments'][-i-1]
        if c_good['body'] != "[removed]" and not c_good['body'].startswith('**No Clear Legal Question**'):
            selected.append((c_good, "GOOD"))
        c_bad = d['comments'][i]
        if c_bad['body'] != "[removed]" and not c_bad['body'].startswith('**No Clear Legal Question**'):
            selected.append((c_bad, "BAD"))

    # WE MUST REMOVE '###' from the DATA
    d['title'] = d['title'].replace('###', '').replace(
        'END', '').replace('Q:', '').replace('T:', '').replace('B:', '')
    # WE MUST REMOVE 'END' from the DATA
    d['body'] = d['body'].replace('###', '').replace(
        'END', '').replace('Q:', '').replace('T:', '').replace('B:', '')
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
