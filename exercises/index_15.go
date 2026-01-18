package raindrops
import "strconv"

func Convert(number int) string {
    rain := ""
    if number % 3 == 0{
        rain = rain + "Pling"
    }
    if number % 5 == 0{
        rain = rain + "Plang"
    }
    if number % 7 == 0{
        rain = rain + "Plong"
    }
    if rain == ""{
        return strconv.Itoa(number)
    }
    return rain
}
