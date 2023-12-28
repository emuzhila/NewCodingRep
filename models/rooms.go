package models

type Room struct {
  RoomNumber string `gorm:"unique;not null"`
  RoomType   string `gorm:"not null"`
  Price      int `gorm:"not null"`
}