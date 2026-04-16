package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/pharmacy_app/backend/pkg/database"
)

func main() {
	fmt.Println("Starting Pharmacy Delivery Backend API...")

	// Database Connection setup
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "host=localhost user=postgres password=postgres dbname=pharmacy_app port=5432 sslmode=disable"
	}
	database.ConnectDB(dsn)

	// Initialize Gin router
	r := gin.Default()

	// Simple Health Check Endpoint
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "healthy",
			"message": "Pharmacy Delivery App API is running",
		})
	})

	// Start server on port 8080
	if err := r.Run(":8080"); err != nil {
		fmt.Printf("Error starting server: %s\n", err.Error())
	}
}
