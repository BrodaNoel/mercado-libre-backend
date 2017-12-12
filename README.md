# Mercado Libre Backend test
It's going to be running over port 9001. Try opening `localhost:9001/api/items`.

## Some usual questions
* Why `isomorphic-fetch` and `es6-promise`? Because for this little implementation, I prefer to use `fetch` instead of another robust alternative (like my favorite: `axios`).

## Contrib - Dev time
Run `npm run dev`. Everytime you change a file, `nodemon` will do a hot-reloading, so, it will not be necessary to restart manually the node execution.

## Production time
Run `npm start`
