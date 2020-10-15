all: public/favicon.ico public/apple-touch-icon.png

public/favicon.ico: app.png
	convert $< -resize 64x64 $@

public/apple-touch-icon.png: app.png
	convert $< -resize 180x180 $@

.PHONY: all