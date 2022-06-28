package models

import (
	"github.com/google/uuid"
	"log"
)

type user struct {
	name string
	id   string
}

func NewUser(name string) *user {
	log.Print(uuid.NewString())
	return &user{
		name: name,
		id:   uuid.NewString(),
	}
}
