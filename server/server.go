package main

import (
  "log"
  "net/http"
)

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("dist/"))))
	http.HandleFunc("/", defHandler)

	log.Println("Listening...")
	http.ListenAndServe(":8080", nil)
}