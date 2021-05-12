build:
# update art-3699 module
	git -C art-3699/ fetch
	git -C art-3699/ merge
# generate artwork layout markdown files
	python build_artworks.py
# jekyll build
	bundle exec jekyll build

serve:
	bundle exec jekyll serve --livereload
# (5/11/2021)
# Error loading file when running `make serve`
# gem update --system | updates gem files on the system
# gem cleanup         | remove old versions of gems