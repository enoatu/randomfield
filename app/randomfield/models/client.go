package models

import (
	"bytes"
	"fmt"
	"golang.org/x/net/websocket"
	"randomfield/services"
)

// clientはチャットを行っている1人のユーザーを表します。
type client struct {
	user *user
	// socketはこのクライアントのためのWebSocketです。
	socket *websocket.Conn
	// sendはメッセージが送られるチャネルです。
	send chan []byte
	// roomはこのクライアントが参加しているチャットルームです。
	room *room
}

func (c *client) read() {
	for {
		msg := []byte("")
		if err := websocket.Message.Receive(c.socket, &msg); err == nil {
			c.room.forward <- msg
		} else {
			break
		}
	}
	c.socket.Close()
}

func (c *client) write() {
	for msg := range c.send {
		err := websocket.Message.Send(c.socket, fmt.Sprintf("%s", msg))

		var buffer bytes.Buffer
		services.NewTracer(&buffer).Trace(msg)
		if err != nil {
			break
		}
	}
	c.socket.Close()
}
