import os
import sys
from shutil import copyfile
root = os.path.dirname(os.path.abspath(__file__)) + "/art-3699"
sys.path.insert(0,root)
from dmtools import netpbm

VIMEO_ID = {
    "format.mp4" : "543896900",
    "faces_mod_animation.mp4" : "544012195",
    "water_cup_mod_animation.mp4" : "544012231",
    "stewart_pinches_chaos.mp4" : "544260565",
    "stewart_rgb_chaos.mp4" : "544260549",
    "stewart_clip.mp4" : "544260538",
    "stewart_mod.mp4" : "544260328",
    "stewart_film.mp4" : "544732299",
    "node_conway_animation.mp4" : "544390242",
    "node_reverse_conway_animation.mp4" : "544390256",
    "rhizomes_conway_animation.mp4" : "544645491",
    "rhizomes_reverse_conway_animation.mp4" : "544649676"
}

REPO_PATH = "https://github.com/henryrobbins/art-3699/tree/master"

IGNORE = []

artworks = {}
for root, subdirs, files in os.walk('art-3699'):
    if "works.txt" in files:
        with open("%s/works.txt" % root, 'r') as f:
            works = f.read().split("\n")
            works = list(filter(lambda x: x != "", works))
            if root in IGNORE:
                continue
            works = ["%s/%s" % (root, work) for work in works]
            images = []
            videos = []
            for work in works:
                if work.split(".")[-1] == 'png':
                    to_path = "art/" + '/'.join(work.split('/')[1:])
                    dirs = '/'.join(to_path.split('/')[:-1])
                    os.makedirs(dirs, exist_ok=True)
                    copyfile(work, to_path)
                    images.append(to_path)
                elif work.split(".")[-1] in ["pbm", "pgm", "ppm"]:
                    from_path = work
                    to_path = "art/" + '/'.join(from_path[:-3].split('/')[1:]) + "png"
                    if not os.path.exists(to_path):
                        img = netpbm.read(from_path)
                        netpbm.write_png(to_path, img, 600)
                    images.append(to_path)
                elif work.split(".")[-1] == 'mp4':
                    name = work.split('/')[-1]
                    videos.append([name, VIMEO_ID[name]])
                else:
                    print("%s NOT written." % work)
                print("%s written." % work)
            artworks[root] = {"images":images, "videos":videos}

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
        f.write('images: [%s]\n' % ', '.join(artworks[work]["images"]))
        f.write('videos: [%s]\n' % ', '.join(['[%s]' % ", ".join(i) for i in (artworks[work]["videos"])]))
        f.write('---')
        f.write(description)

print("artwork compilation success.")
