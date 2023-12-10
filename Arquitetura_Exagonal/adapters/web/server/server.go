package server

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/MatheusLeal/go-hexagonal/adapters/web/handler"
	"github.com/MatheusLeal/go-hexagonal/application"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

type WebServer struct {
	Service application.ProductServiceInterface
}

func MakeNewWebServer() *WebServer {
	return &WebServer{}
}

func (w WebServer) Serve() {

	r := mux.NewRouter()
	n := negroni.New(
		negroni.NewLogger(),
	)

	handler.MakeProductHandlers(r, n, w.Service)
	http.Handle("/", r)

	server := &http.Server{
		Addr:              ":8080",
		WriteTimeout:      10 * time.Second,
		ReadHeaderTimeout: 10 * time.Second,
		Handler:           http.DefaultServeMux,
		ErrorLog:          log.New(os.Stderr, "log: ", log.Lshortfile),
	}

	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
