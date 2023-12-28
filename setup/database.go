package setup

import (
  "gorm.io/gorm"
  "github.com/glebarez/sqlite"
  "hotel/models"
)

var DB *gorm.DB

func Database() {
  var err error
  DB, err = gorm.Open(sqlite.Open("rooms.db"), &gorm.Config{})
  if err != nil {
    panic("failed to connect database")
  }
  DB.AutoMigrate(&models.Room{})
}
