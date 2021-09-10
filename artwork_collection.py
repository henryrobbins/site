import os
from pathlib import Path

REPO_PATH = "https://github.com/henryrobbins/artwork/tree/master"

for root, _, files in os.walk('artwork'):
    if "README.md" in files:
        path = Path(root)
        work = path.name

        # Parse the README
        readme_path = path / 'README.md'
        with open(readme_path, 'r') as f:
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
        files.remove('README.md')

        # Parse vimeo.txt for any videos
        videos = []
        vimeo_path = path / 'vimeo.txt'
        if vimeo_path.exists():
            with open(vimeo_path, 'r') as f:
                videos = [v.strip('\n').split("=") for v in f.readlines()]
            files.remove('vimeo.txt')

        # Remaining files are all images
        images = [str(path / image) for image in files]

        # Write artwork layout markdown
        md = "_artworks/%s.md" % work
        with open(md, 'w') as f:
            f.write('---\n')
            f.write('layout: artwork\n')
            f.write('artist: %s\n' % artist)
            f.write('title: %s\n' % title)
            f.write('date: %s\n' % date)
            f.write('medium: %s\n' % medium)
            f.write('link: %s/%s\n' % (REPO_PATH, path.relative_to('artwork')))
            f.write('images: [%s]\n' % ', '.join(images))
            videos_str = ', '.join(['[%s]' % ", ".join(i) for i in (videos)])
            f.write('videos: [%s]\n' % videos_str)
            f.write('---')
            f.write(description)
