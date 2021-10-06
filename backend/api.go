package main

import (
	"encoding/json"
	"lunar/middleware"
	"lunar/utils"

	"github.com/gin-gonic/gin"
)

type LunarShipment struct {
	ShipmentTime              string `json:"shipment_time"`
	WarehouseToEarthStation   int    `json:"warehouse_to_earth_station"`
	EarthStationToLunarColony int    `json:"earth_station_to_lunar_colony"`
}

func LunarDelivery(c *gin.Context) {
	var l LunarShipment
	err := json.NewDecoder(c.Request.Body).Decode(&l)
	if err != nil {
		c.JSON(500, gin.H{
			"message": "Internal Server Error",
		})
	}
	result := utils.GetDeliveryTime(l.ShipmentTime, l.WarehouseToEarthStation+l.EarthStationToLunarColony)
	c.JSON(200, gin.H{
		"utc_shipment_time": result.UtcShipmentTime,
		"utc_delivery_time": result.UtcDeliveryTime,
		"lst_shipment_time": result.LstShipmentTime,
		"lst_delivery_time": result.LstDeliveryTime,
	})
}

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())
	r.POST("/delivery", LunarDelivery)
	r.Run(":8005")
}
