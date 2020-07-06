package handler

import (
	"fmt"
	"net/http"

	"github.com/mmcdole/gofeed"
)

// Handler “Hello, World!” to console
func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	fp := gofeed.NewParser()

	query := r.URL.Query()
	filters, present := query["url"] //filters=["color", "price", "brand"]
	if !present || len(filters) == 0 {
		fmt.Println("url not present")
		fmt.Fprintf(w, "<h1>url not present</h1>")
	} else {
		fmt.Println("7 is odd")
		fmt.Println(filters[0])

		// feed, _ := fp.ParseURL("http://feeds.twit.tv/twit.xml")
		// feed, _ := fp.ParseURL("https://trends.google.com/trends/hottrends/atom/hourly")
		feed, _ := fp.ParseURL(filters[0])

		fmt.Fprintln(w, feed)
	}

	// fmt.Println(feed)
	// fmt.Fprintf(w, feed)
	// fmt.Fprintf(w, "<h1>coolness from Go on Now!</h1>")
}
