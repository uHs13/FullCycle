package mainOriginal

import (
	"fmt"
	"goHexagonal/infra/database"
	"goHexagonal/infra/dotEnv"
)

func MainOriginal() {
	if err := dotEnv.Load(); err != nil {
		panic(err)
	}

	database, err := database.NewDatabase(database.MysqlConnectionConst)

	if err != nil {
		panic(err)
	}

	fmt.Println(database)

	fmt.Println("Hello World")
}
