package domain

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	ID              uint           `gorm:"primaryKey" json:"id"`
	Phone           string         `gorm:"uniqueIndex" json:"phone"`
	IsPhoneVerified bool           `json:"is_phone_verified"`
	Name            string         `json:"name"`
	Email           *string        `gorm:"uniqueIndex" json:"email"` // pointer to allow null since it's added later
	Password        string         `json:"-"`
	Role            string         `json:"role"` // customer, driver, pharmacy_owner
	CreatedAt       time.Time      `json:"created_at"`
	UpdatedAt       time.Time      `json:"updated_at"`
	DeletedAt       gorm.DeletedAt `gorm:"index" json:"-"`
}

type Pharmacy struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `json:"name"`
	Address   string         `json:"address"`
	Lat       float64        `json:"lat"`
	Lng       float64        `json:"lng"`
	OwnerID   uint           `json:"owner_id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
}

type Product struct {
	ID                  uint    `gorm:"primaryKey" json:"id"`
	PharmacyID          uint    `json:"pharmacy_id"`
	Name                string  `json:"name"`
	Description         string  `json:"description"`
	Price               float64 `json:"price"`
	RequiresPrescription bool   `json:"requires_prescription"`
	ImageURL            string  `json:"image_url"`
}

type Order struct {
	ID             uint        `gorm:"primaryKey" json:"id"`
	CustomerID     uint        `json:"customer_id"`
	PharmacyID     uint        `json:"pharmacy_id"`
	DriverID       *uint       `json:"driver_id"` // nullable
	Status         string      `json:"status"` // pending, accepted, ready, out_for_delivery, delivered
	TotalAmount    float64     `json:"total_amount"`
	PrescriptionURL string     `json:"prescription_url"` // If any
	CreatedAt      time.Time   `json:"created_at"`
	UpdatedAt      time.Time   `json:"updated_at"`
	OrderItems     []OrderItem `json:"order_items"`
}

type OrderItem struct {
	ID        uint    `gorm:"primaryKey" json:"id"`
	OrderID   uint    `json:"order_id"`
	ProductID uint    `json:"product_id"`
	Quantity  int     `json:"quantity"`
	Price     float64 `json:"price"` // Price at time of order
}
