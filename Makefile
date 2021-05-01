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