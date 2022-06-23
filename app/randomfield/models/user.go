package models

import (
	"fmt"
	"golang.org/x/net/websocket"
)

// userはチャットを行っている1人のユーザーを表します。
type user struct {
	// socketはこのクライアントのためのWebSocketです。
	socket *websocket.Conn
	// sendはメッセージが送られるチャネルです。
	send chan []byte
	// roomはこのクライアントが参加しているチャットルームです。
	room *room
}

func (u *user) read() {
	for {
		msg := []byte("")
		if err := websocket.Message.Receive(u.socket, &msg); err == nil {
			u.room.forward <- msg
		} else {
			break
		}
	}
	u.socket.Close()
}

func (u *user) write() {
	for msg := range u.send {
		err := websocket.Message.Send(u.socket, fmt.Sprintf("Server: \"%s\" received!", msg))
		if err != nil {
			break
		}
	}
	u.socket.Close()
}
