package main

import (
	"log"
  "hotel/setup"
  "hotel/models"
  
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

const (
	username = "admin"
	password = "test"
)

func main() {
setup.Database()
DB := setup.DB
	engine := html.New("./views", ".html")
	app := fiber.New(fiber.Config{
		Views: engine,
	})
	app.Static("/", "./public")

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Render("login", fiber.Map{})
	})
	app.Get("/index", func(c *fiber.Ctx) error {
		return c.Render("index", fiber.Map{})
	})
	
	app.Get("/dashboard", func(c *fiber.Ctx) error {
		return c.Render("dashboard", fiber.Map{})
	})
	app.Get("/test", func(c *fiber.Ctx) error {
		return c.Render("test", fiber.Map{})
	})
	
	app.Post("/auth", func(c *fiber.Ctx) error {
		var req map[string]string
		if err := c.BodyParser(&req); err != nil {
			log.Println("parsing err")
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "invalid req"})
		}
		if req["username"] == username && req["password"] == password {
			return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "login successful"})

		}
		
		log.Println("login faileds")
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"err": "wrong credentials"})
	})
	app.Post("/upload", func(c *fiber.Ctx) error {
    var room models.Room
    
    if err := c.BodyParser(&room); err != nil {
			log.Println("parsing err")
    }
    newRoom := models.Room{
      RoomNumber: room.RoomNumber,
      RoomType:room.RoomType,
      Price: room.Price,
    }
    DB.Create(&newRoom)
    return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "room added"})
})
app.Get("/getdata", func(c *fiber.Ctx) error {
	var rooms []models.Room
	result := DB.Find(&rooms)
	if result.Error != nil {
		// Handle the error, log it, and return a meaningful response
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": result.Error.Error()})
	}
	return c.JSON(rooms)
})



	log.Fatal(app.Listen(":3000"))
}
