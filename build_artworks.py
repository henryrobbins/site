REPO_PATH = "https://github.com/henryrobbins/art-3699/tree/master"

with open('artwork.txt', 'r') as f:
    artworks = [work.strip('\n') for work in f.readlines()]

for work in artworks:
    # parse README
    readme = "art-3699/%s/README.md" % work
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
        f.write('link: %s/%s\n' % (REPO_PATH, work))
        f.write('---\n')
        f.write(description)

print("artwork compilation success.")
