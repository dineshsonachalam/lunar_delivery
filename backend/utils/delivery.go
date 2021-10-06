package utils

import (
	"fmt"
	"math"
	"time"
)

type lunarDelivery struct {
	UtcShipmentTime string
	UtcDeliveryTime string
	LstShipmentTime string
	LstDeliveryTime string
}

func GetLunarTime(time int) string {
	unixSecondsSinceLunarEpoch := time + 14159025
	lunarTime := int(float64(unixSecondsSinceLunarEpoch) / (0.984352966667))
	years := int(float64(lunarTime/(31104000))) + 1
	days := int(math.Mod(float64(lunarTime), 31104000)/(30*24*60*60)) + 1
	cycles := int(math.Mod(float64(lunarTime), (30*24*60*60))/(24*60*60)) + 1
	hours := int(math.Mod(float64(lunarTime), (24*60*60)) / 3600)
	minutes := int(math.Mod(float64(lunarTime), (60*60)) / 60)
	seconds := int(math.Mod(float64(lunarTime), 60))
	return fmt.Sprintf("%02d-%02d-%02d %02d:%02d:%02d", int(years), int(days), int(cycles), int(hours), int(minutes), int(seconds))
}

func GetDeliveryTime(shipmentTime string, addDays int) lunarDelivery {
	fmt.Println("shipmentTime: ", shipmentTime)
	utcShipmentTime, err := time.Parse(time.RFC3339, shipmentTime)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("utcShipmentTime: ", utcShipmentTime)
	utcDeliveryTime := utcShipmentTime.AddDate(0, 0, +(addDays))
	fmt.Println("utcDeliveryTime: ", utcDeliveryTime)
	return lunarDelivery{
		UtcShipmentTime: utcShipmentTime.Format("2006-01-02 15:04:05"),
		UtcDeliveryTime: utcDeliveryTime.Format("2006-01-02 15:04:05"),
		LstShipmentTime: GetLunarTime(int(utcShipmentTime.Unix())),
		LstDeliveryTime: GetLunarTime(int(utcDeliveryTime.Unix())),
	}
}
