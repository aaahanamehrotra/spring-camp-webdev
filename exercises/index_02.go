package cars

// CalculateWorkingCarsPerHour calculates how many working cars are
// produced by the assembly line every hour.
func CalculateWorkingCarsPerHour(productionRate int, successRate float64) float64 {
    return successRate*float64(productionRate)/float64(100.0)
}

// CalculateWorkingCarsPerMinute calculates how many working cars are
// produced by the assembly line every minute.
func CalculateWorkingCarsPerMinute(productionRate int, successRate float64) int {
    var result int = int(successRate*float64(productionRate)/float64(6000))
    return result
}

// CalculateCost works out the cost of producing the given number of cars.
func CalculateCost(carsCount int) uint {
    var groups int = carsCount/10
    var singles int = carsCount - groups*10
    var cost = groups*95000+singles*10000
    return uint(cost)
}
