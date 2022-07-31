.PHONY: artwork
artwork:
	rm -rf artwork
	cp -r ~/art/artwork/web_archive ./artwork
	python artwork_collection.py

build:
	bundle exec jekyll build

serve:
	bundle exec jekyll serve --livereload

# (5/11/2021)
# Error loading file when running `make serve`
# gem update --system | updates gem files on the system
# gem cleanup         | remove old versions of gems