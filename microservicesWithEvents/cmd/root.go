package cmd

import (
	"log"
	"microservices-wallet-core/adapters/driving/http"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"os"

	"github.com/spf13/cobra"
)

var Database *infraDataSchema.Database
var dbms string = "sqlite3"

var rootCmd = &cobra.Command{
	Use:   "microservices-wallet-core",
	Short: "Microsservices with events study project",
	Long:  "Microsservices with events study project",
	Run: func(cmd *cobra.Command, args []string) {
		if err := createApplicationNeeds(); err != nil {
			log.Fatal(err)
		}
	},
}

func createApplicationNeeds() error {
	if err := CreateDatabaseConnection(); err != nil {
		return err
	}

	if Database.IsSqliteConnection() {
		if err := CreateSqliteTables(); err != nil {
			return err
		}
	}

	server := http.NewHttpServer(Database)

	if err := server.Start(); err != nil {
		return err
	}

	return nil
}

func CreateDatabaseConnection() error {
	database, err := infraDataSchema.NewDatabase(dbms)

	if err != nil {
		return err
	}

	Database = database

	return nil
}

func CreateSqliteTables() error {
	if err := CreateClientTable(); err != nil {
		return err
	}

	return nil
}

func CreateClientTable() error {
	connection := Database.Connection

	table := "CREATE TABLE IF NOT EXISTS client(id string, name string, email string, createdAt string);"

	statement, err := connection.Prepare(table)

	if err != nil {
		panic(err.Error())
	}

	_, err = statement.Exec()

	if err != nil {
		panic(err.Error())
	}

	return nil
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
