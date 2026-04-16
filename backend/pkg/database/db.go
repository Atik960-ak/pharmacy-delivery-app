package database

import (
	"fmt"
	"log"

	"github.com/pharmacy_app/backend/internal/domain"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB(dsn string) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Connected to PostgreSQL successfully!")

	// Auto-Migrate the database models
	err = db.AutoMigrate(
		&domain.User{},
		&domain.Pharmacy{},
		&domain.Product{},
		&domain.Order{},
		&domain.OrderItem{},
	)
	if err != nil {
		log.Fatalf("Failed to auto-migrate database: %v", err)
	}

	fmt.Println("Database auto-migrated successfully!")
	DB = db
}
