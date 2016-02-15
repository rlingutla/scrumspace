package main

import (
  "log"
  "net/http"
)

func defHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "dist/index.html")
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("dist/"))))
	http.HandleFunc("/", defHandler)

	log.Println("Listening...")
	http.ListenAndServe(":8080", nil)
}