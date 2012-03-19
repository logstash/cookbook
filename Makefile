serve:
	bundle exec foreman start

publish:
	git checkout gh-pages
	-sh update.sh
	git checkout master

semicomplete:
	jekyll --no-auto --base-url /logging /tmp/generate-lol-logging
	rsync -av --exclude .git /tmp/generate-lol-logging/ semicomplete.com:s/logging

heroku: WORKDIR=/tmp/heroku-lol-logging
heroku:
	jekyll --no-auto --base-url / $(WORKDIR)
	(
		cd $(WORKDIR); \
		git init; \
		git add .; \
		git commit -am "."; \
		git remote add heroku 
		... something
	)

