package main

import (
  "log"
  "net/http"
  "github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("dist/")))
	http.Handle("/", r)
	
	log.Println("Listening...")
	http.ListenAndServe(":8080", nil)
}