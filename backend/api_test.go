package main

import (
	"bytes"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestDelivery(t *testing.T) {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.POST("/delivery", LunarDelivery)

	var jsonStr = []byte(`{
		"shipment_time": "2015-01-23T12:33:00-05:00",
		"warehouse_to_earth_station": 1,
		"earth_station_to_lunar_colony": 3
	}`)

	req, err := http.NewRequest(http.MethodPost, "/delivery", bytes.NewBuffer(jsonStr))
	if err != nil {
		t.Fatalf("Couldn't create request: %v\n", err)
	}

	// Create a response recorder so you can inspect the response
	w := httptest.NewRecorder()

	// Perform the request
	r.ServeHTTP(w, req)
	body, _ := io.ReadAll(w.Body)
	expectedResponse := `{"lst_delivery_time":"47-12-01 21:37:56","lst_shipment_time":"47-11-27 20:06:23","utc_delivery_time":"2015-01-27 12:33:00","utc_shipment_time":"2015-01-23 12:33:00"}`
	if w.Code == http.StatusOK && string(body) == expectedResponse {
		t.Logf("Expected to get status %d is same ast %d\n", http.StatusOK, w.Code)
	} else {
		t.Fatalf("Expected to get status %d but instead got %d\n", http.StatusOK, w.Code)
	}
}
