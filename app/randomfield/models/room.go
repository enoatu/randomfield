package models

import (
	"github.com/labstack/echo/v4"
	"golang.org/x/net/websocket"
	"randomfield/services"
)

type room struct {
	// forwardは他のクライアントに転送するためのメッセージを保持するチャネルです。
	forward chan []byte
	// joinはチャットルームに参加しようとしているクライアントのためのチャネルです。
	join chan *user
	// leaveはチャットルームから退室しようとしているクライアントのためのチャネルです
	leave chan *user
	// usersには在室しているすべてのクライアントが保持されます。
	users map[*user]bool
	// tracerはチャットルーム上で行われた操作のログを受け取ります。

	tracer services.Tracer
}

// newRoomはすぐに利用できるチャットルームを生成して返します。
func NewRoom() *room {
	return &room{
		forward: make(chan []byte),
		join:    make(chan *user),
		leave:   make(chan *user),
		users:   make(map[*user]bool),
		tracer:  services.OffTracer(),
	}
}

func (r *room) Run() {
	for {
		select {
		case user := <-r.join:
			// 参加
			r.users[user] = true
			r.tracer.Trace("新しいクライアントが参加しました")
		case user := <-r.leave:
			// 退室
			delete(r.users, user)
			close(user.send)
			r.tracer.Trace("クライアントが退室しました")
		case msg := <-r.forward:
			r.tracer.Trace("メッセージを受信しました: ", string(msg))
			// すべてのクライアントにメッセージを転送
			for user := range r.users {
				select {
				case user.send <- msg:
					// メッセージを送信
					r.tracer.Trace(" -- クライアントに送信されました")
				default:
					// 送信に失敗
					delete(r.users, user)
					close(user.send)
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
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		user := &user{
			socket: ws,
			send:   make(chan []byte, messageBufferSize),
			room:   r,
		}

		r.join <- user
		defer func() { r.leave <- user }()
		go user.write()
		user.read()
	}).ServeHTTP(c.Response(), c.Request())
	return nil
}
