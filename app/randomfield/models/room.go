package models

import (
	"bytes"
	"github.com/labstack/echo/v4"
	"golang.org/x/net/websocket"
	"log"
	"randomfield/services"
)

type room struct {
	// forwardは他のクライアントに転送するためのメッセージを保持するチャネルです。
	forward chan []byte
	// joinはチャットルームに参加しようとしているクライアントのためのチャネルです。
	join chan *client
	// leaveはチャットルームから退室しようとしているクライアントのためのチャネルです
	leave chan *client
	// clientsには在室しているすべてのクライアントが保持されます。
	clients map[*client]bool
	// tracerはチャットルーム上で行われた操作のログを受け取ります。

	tracer services.Tracer
}

// newRoomはすぐに利用できるチャットルームを生成して返します。
func NewRoom() *room {
	log.Print("sssssss")
	var buffer bytes.Buffer
	return &room{
		forward: make(chan []byte),
		join:    make(chan *client),
		leave:   make(chan *client),
		clients: make(map[*client]bool),
		tracer:  services.NewTracer(&buffer),
	}
}

func (r *room) Run() {
	for {
		select {
		case client := <-r.join:
			// 参加
			r.clients[client] = true
			r.tracer.Trace("新しいクライアントが参加しました")
		case client := <-r.leave:
			// 退室
			delete(r.clients, client)
			close(client.send)
			r.tracer.Trace("クライアントが退室しました")
		case msg := <-r.forward:
			r.tracer.Trace("メッセージを受信しました: ", string(msg))
			// すべてのクライアントにメッセージを転送
			for client := range r.clients {
				select {
				case client.send <- msg:
					// メッセージを送信
					r.tracer.Trace(" -- クライアントに送信されました")
					log.Print("sssssss11111")
				default:
					// 送信に失敗
					delete(r.clients, client)
					close(client.send)
					r.tracer.Trace(" -- 送信に失敗しました。クライアントをクリーンアップします")
				}
			}
		}
	}
}

const (
	socketBufferSize  = 1024
	messageBufferSize = 256
)

func (r *room) Handle(c echo.Context) error {
	name := c.QueryParam("name")
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		client := &client{
			user:   &user{name: name},
			socket: ws,
			send:   make(chan []byte, messageBufferSize),
			room:   r,
		}

		r.join <- client
		defer func() { r.leave <- client }()
		go client.write()
		client.read()
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}
