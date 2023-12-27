package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
)

const (
	username = "admin"
	password = "test"
)

func main() {
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
	log.Fatal(app.Listen(":3000"))
}
