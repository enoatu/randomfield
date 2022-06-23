package services

import "github.com/go-redis/redis"

func NewRedisClient() (*redis.Client, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "7sdfaZ7asfgaq", // no password set
		DB:       0,               // use default DB
	})
	_, err := client.Ping().Result()
	return client, err
}
