package models

import (
	"github.com/google/uuid"
)

type user struct {
	Name string `json:"name"`
	Id   string `json:"id"`
	GameData *GameData `json:"gameData"`
}

func NewUser(name string) *user {
	var gameData *GameData
	return &user{
		Name: name,
		Id:   uuid.NewString(),
		GameData: gameData,
	}
}
