// Package weather forecasts conditions at a given location.
package weather

var (
    // CurrentCondition contains wearther condition of the place.
	CurrentCondition string
    // CurrentLocation contains the location.
	CurrentLocation  string
)
// Forecast takes city and condition as input and returns the data in a string.
func Forecast(city, condition string) string {
	CurrentLocation, CurrentCondition = city, condition
	return CurrentLocation + " - current weather condition: " + CurrentCondition
}
