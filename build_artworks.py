import os
import sys
root = os.path.dirname(os.path.abspath(__file__)) + "/art-3699"
sys.path.insert(0,root)
from netpbm import netpbm

REPO_PATH = "https://github.com/henryrobbins/art-3699/tree/master"

artworks = {}
for root, subdirs, files in os.walk('art-3699'):
    if "works.txt" in files:
        with open("%s/works.txt" % root, 'r') as f:
            works = f.read().split("\n")
            works = list(filter(lambda x: x != "", works))
            works = ["%s/%s" % (root, work) for work in works]
            tmp = []
            for work in works:
                if work.split(".")[-1] in ["pbm", "pgm", "ppm"]:
                    from_path = work
                    to_path = "art/" + '/'.join(from_path[:-3].split('/')[1:]) + "png"
                    img = netpbm.read(from_path)
                    netpbm.write_png(to_path, img)
                    tmp.append(to_path)
                else:
                    tmp.append(work)
            artworks[root] = tmp

for work in artworks:
    # parse README
    readme = "%s/README.md" % work
    with open(readme, 'r') as f:
        artist, title_date, medium, *description = f.readlines()
        artist = artist[:-6].strip('*')
        title, date = title_date.split(' ')
        title = title.strip('*')
        date = date[:-6].strip('()')
        medium = medium.strip('\n')
        stop = "To compile this work, use the following commands.\n"
        try:
            i = description.index(stop)
            description = ''.join(description[:i])
        except ValueError:
            description = ''.join(description)

    # write artwork layout markdown
    md = "_artworks/%s.md" % work.split('/')[-1]
    with open(md, 'w') as f:
        f.write('---\n')
        f.write('layout: artwork\n')
        f.write('artist: %s\n' % artist)
        f.write('title: %s\n' % title)
        f.write('date: %s\n' % date)
        f.write('medium: %s\n' % medium)
        f.write('link: %s/%s\n' % (REPO_PATH, '/'.join(work.split('/')[1:])))
        f.write('works: [%s]\n' % ', '.join(artworks[work]))
        f.write('---\n')
        f.write(description)

print("artwork compilation success.")
