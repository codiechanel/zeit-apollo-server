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
	// feed, _ := fp.ParseURL("http://feeds.twit.tv/twit.xml")
	feed, _ := fp.ParseURL("https://trends.google.com/trends/hottrends/atom/hourly")
	fmt.Fprintln(w, feed)
	// fmt.Println(feed)
	// fmt.Fprintf(w, feed)
	// fmt.Fprintf(w, "<h1>coolness from Go on Now!</h1>")
}
