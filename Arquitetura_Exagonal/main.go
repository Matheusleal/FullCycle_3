package main

import (
	"database/sql"

	"github.com/MatheusLeal/go-hexagonal/adapters/db"
	"github.com/MatheusLeal/go-hexagonal/application"
)

func main() {

	dbConn, _ := sql.Open("sqlite3", "sqlite.db")
	productDb := db.NewProductDb(dbConn)
	productService := application.NewProductService(productDb)

	product, _ := productService.Create("Product 1", 10)

	productService.Enable(product)
}
