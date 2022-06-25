package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"randomfield/models"
)

func main() {
	e := echo.New()
	e.Use(middleware.Logger())
	e.Static("/", "public")
	r := models.NewRoom()
	// チャットルームを開始します
	go r.Run()
	e.GET("/ws", r.Handle)
	e.Logger.Fatal(e.Start(":8080"))
}
