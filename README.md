
## How to run

1) `npm install` to install all dependencies
2) `npm start` Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Assumptions and Tradeoffs

* I assumed that the ultimate goal is to find a specific movie title. Therefore, I limited the results to 10 results. If a user does not find the desired movie title based on the current query length, then they'll continue entering more on the search box to get a more accurate set of results. Although this means less results, ultimately, the user will spend less time scrolling, which can go on for a while considering the large number of movies inside the database. 

* The library I used also had a pagination option, which I used in order to decrease load time (since more data = more time to load).

* Instead of adding the director name below each title in the suggestions list, I added the year instead. This means less calls to the server since the search result did not return the director name. Also, I believe having the year is more user friendly than having the director name below the title because not many users know the directors of movies they search for. Also, having the year is helpful for movie titles that have different versions/remakes.

* When a query is less than 3, don't make any API calls. This simply returns "false too many results", which is a waste of time making a call to the server.
