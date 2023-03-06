package models

import (
	"encoding/json"
	"math/rand"
	"time"
	"github.com/google/uuid"

)

type Card struct {
	Id          string `json:"id"`
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

type GameData struct {
	LifePoint  int     `json:"lifePoint"`
	MagicPoint int     `json:"magicPoint"`
	States     []State `json:"states"`
	Cards      []Card  `json:"cards"`
}

type State struct {
	Name string `json:"name"`
}

func NewGameData() *GameData {
	var states []State
	return &GameData{
		LifePoint:  100,
		MagicPoint: 50,
		States:     states,
		Cards:      NewCards(),
	}
}

type GameBody struct {
	GameInfo     *GameInfo      `json:"gameInfo"`
	MyData       user   `json:"myData"`
	OthersData   map[string]user `json:"othersData"`
}

func NewGameBodyString (r *room, c *client) string {
	othersData := make(map[string]user)
	for c := range r.clients {
		othersData[c.user.Id] = *c.user
	}

	gb := &GameBody{
		GameInfo: r.gameInfo,
		MyData: *c.user,
		OthersData: othersData,
	}
	return string(gb.marshal())
}

func (g *GameBody) marshal() []byte {
	s, _ := json.Marshal(g)
	return s
}

type GameInfo struct {
	TurnCount  int    `json:"turnCount"`
	TurnUserId string `json:"turnUserId"`
}
func NewGameInfo() *GameInfo {
	return &GameInfo{
		TurnCount: 1,
	}
}

func InitGame(r *room) {
	for c := range r.clients {
		c.user.GameData = NewGameData()
	}
	r.gameInfo = NewGameInfo()
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
	for c := range r.clients {
		clients = append(clients, c)
	}
	return clients[r.gameInfo.TurnCount % len(clients)].user.Id
}

func (g *GameMessage) handle(r *room, c *client) *GameMessage {
	switch {
	case g.Kind == gameStart:
		InitGame(r);
		// カード配る
		g.Kind = gameReadAction
		g.Body = NewGameBodyString(r, c)
	case g.Kind == gameUserAction:
		// カード配る
		g.Kind = gameReadAction
		g.Body = NewGameBodyString(r, c)
	}
	return g
}

func NewCards() []Card {
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
		userCard := cards[rand.Intn(2)]
		// Id追加
		userCard.Id = uuid.NewString()
		userCards = append(userCards, userCard)
	}
	return userCards
}
