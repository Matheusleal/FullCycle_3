package db_test

import (
	"database/sql"
	"log"
	"testing"

	"github.com/MatheusLeal/go-hexagonal/adapters/db"
	"github.com/stretchr/testify/require"
)

var Db *sql.DB

func setUpDb() {
	Db, _ = sql.Open("sqlite3", ":memory:")
	createTable(Db)
	createProduct(Db)
}

func createTable(db *sql.DB) {
	table := `CREATE TABLE products (
						id string NOT NULL,
						name string NOT NULL,
						price float NOT NULL,
						status string NOT NULL);`

	stmt, err := db.Prepare(table)
	if err != nil {
		log.Fatal(err.Error())
	}

	_, err = stmt.Exec()
	if err != nil {
		log.Fatal(err.Error())
	}
}
func createProduct(db *sql.DB) {
	insert := `INSERT INTO products(id, name, price, status) VALUES("abc", "Product Test", 0, "disabled");`

	stmt, err := db.Prepare(insert)
	if err != nil {
		log.Fatal(err.Error())
	}

	_, err = stmt.Exec()
	if err != nil {
		log.Fatal(err.Error())
	}
}

func TestProductDb_Get(t *testing.T) {
	setUpDb()
	defer Db.Close()

	productDb := db.NewProductDb(Db)
	product, err := productDb.Get("abc")
	require.Nil(t, err)
	require.Equal(t, "Product Test", product.GetName())
	require.Equal(t, 0.0, product.GetPrice())
	require.Equal(t, "disabled", product.GetStatus())
}
