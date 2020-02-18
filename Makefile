all: packages/web/public/favicon.ico packages/web/public/apple-touch-icon.png

packages/web/public/favicon.ico: app.png
	convert $< -resize 64x64 $@

packages/web/public/apple-touch-icon.png: app.png
	convert $< -resize 180x180 $@

.PHONY: all