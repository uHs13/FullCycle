package cmd

import (
	"log"
	"microservices-wallet-core/adapters/driving/http"
	"os"

	"github.com/spf13/cobra"
)

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
	server := http.NewHttpServer()

	if err := server.Start(); err != nil {
		return err
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
