import os
import json
import yaml

REPO_PATH = "https://github.com/henryrobbins/artwork/tree/master"
template_file = open("artwork_template.py").read()
TEMPLATE = compile(template_file, '<fstring_from_file>', 'eval')

for path in [x[0] for x in os.walk('artwork')][1:]:

    label = json.load(open(f"{path}/label.json"))
    description = open(f"{path}/description.md").read()

    images = {}
    for work in label["works"]:
        base, ext = os.path.splitext(work)
        if ext != ".mp4":
            images[work] = f"{path}/{base}.png"

    videos = label.get("vimeo", {})

    def get_yaml(dict):
        if len(dict) == 0: return ""
        lines = yaml.dump(dict).strip('\n').split('\n')
        return "\n" + "\n".join(["  " + line for line in lines])

    images = get_yaml(images)
    videos = get_yaml(videos)

    md = f"_artworks/{label['date']}-{path.split('/')[1]}.md"
    with open(md, 'w') as f:
        f.write(eval(TEMPLATE))
