package models

import (
	"encoding/json"
	"math/rand"
	"time"
)

type Card struct {
	Name        string `json:"name"`
	Power       int    `json:"power"`
	Description string `json:"description"`
	EffectText  string `json:"effectText"`
}

const (
	gameStart      MessageKind = "GameStart"
	gameUserAction MessageKind = "GameUserAction"
	gameReadAction MessageKind = "GameReadAction"
)

type GameMessage struct {
	Message
	Name string      `json:"name"`
	Type MessageType `json:"type"`
	Kind MessageKind `json:"kind"`
	Body string      `json:"body"`
}

func (g *GameMessage) marshal() []byte {
	s, _ := json.Marshal(g)
	return s
}

type State struct {
	Name string `json:"name"`
}

type UserStatus struct {
	LifePoint  int     `json:"lifePoint"`
	MagicPoint int     `json:"magicPoint"`
	States     []State `json:"states"`
}

func NewUserStatus() UserStatus {
	var states []State
	return UserStatus{
		LifePoint:  100,
		MagicPoint: 50,
		States:     states,
	}
}

// marshalしたとき、大文字じゃないと表示されない
func NewUserStatusList(count int) []UserStatus {
	var userStatusList []UserStatus
	for i := 0; i < count; i++ {
		userStatusList = append(userStatusList, NewUserStatus())
	}
	return userStatusList
}

type GameBody struct {
	GameInfo       *GameInfo    `json:"gameInfo"`
	Cards          []Card       `json:"cards"`
	UserStatusList []UserStatus `json:"userStatusList"`
}

func (g *GameBody) marshal() []byte {
	s, _ := json.Marshal(g)
	return s
}

type GameInfo struct {
	TurnCount  int    `json:"turnCount"`
	TurnUserId string `json:"turnUserId"`
}

func GameHandleAll(r *room) {
	switch {
	case r.message.Kind == gameStart:
		r.gameInfo.TurnCount = 1
		r.gameInfo.TurnUserId = getUserTurn(r)
	case r.message.Kind == gameUserAction:
		r.gameInfo.TurnCount += 1
		r.gameInfo.TurnUserId = getUserTurn(r)
	}
}

func getUserTurn(r *room) string {
	var clients []*client
	for c, _ := range r.clients {
		clients = append(clients, c)
	}
	return clients[r.gameInfo.TurnCount%len(clients)].user.id
}

func (g *GameMessage) handle(r *room, c *client) *GameMessage {
	switch {
	case g.Kind == gameStart:
		// カード配る
		g.Kind = gameReadAction
		gBody := &GameBody{
			GameInfo:       r.gameInfo,
			Cards:          g.startGame(),
			UserStatusList: NewUserStatusList(len(r.clients)),
		}
		g.Body = string(gBody.marshal())
	case g.Kind == gameUserAction:
		// カード配る
		g.Kind = gameReadAction
		gBody := &GameBody{
			GameInfo:       r.gameInfo,
			Cards:          g.startGame(),
			UserStatusList: NewUserStatusList(len(r.clients)),
		}
		g.Body = string(gBody.marshal())
	}
	return g
}

func (g *GameMessage) startGame() []Card {
	initNumber := 3
	rand.Seed(time.Now().UnixNano())

	var cards = []Card{
		{
			Name:        "勇者の剣",
			Power:       rand.Intn(100), // 1 - 99
			Description: "偉大なる力で全てを破壊する",
			EffectText:  "",
		},
		{
			Name:        "勇者のタンクトップ",
			Power:       rand.Intn(100), // 1 - 99
			Description: "染み込んだ汗は勝利の証",
			EffectText:  "",
		},
		{
			Name:        "勇者の魔法",
			Power:       30,
			Description: "染み込んだ汗は勝利の証",
			EffectText:  "相手のHPを30減らす",
		},
	}
	var userCards []Card
	for i := 0; i < initNumber; i++ {
		userCards = append(userCards, cards[rand.Intn(2)])
	}
	return userCards
}
