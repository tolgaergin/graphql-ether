# graphql-ether

graphql ether
https://teamfox-ethereum-graphql.herokuapp.com/graphql

### Heroku

heroku git:clone -a teamfox-ethereum-graphql
heroku config:set NPM_CONFIG_PRODUCTION=false
heroku restart

### Git

git add .
git commit -am "make it better"
git push heroku master

#### to Rebuild on heroku

git commit --allow-empty -m "empty commit"
