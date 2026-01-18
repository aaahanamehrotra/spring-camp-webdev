package partyrobot
import "fmt"
import "strconv"

// Welcome greets a person by name.
func Welcome(name string) string {
    return "Welcome to my party, " + name + "!"
}

// HappyBirthday wishes happy birthday to the birthday person and exclaims their age.
func HappyBirthday(name string, age int) string {
    return "Happy birthday " + name + "! You are now " + strconv.Itoa(age) + " years old!"
}

// AssignTable assigns a table to each guest.
func AssignTable(name string, table int, neighbor, direction string, distance float64) string {
    return fmt.Sprintf(
		"Welcome to my party, %s!\n"+
		"You have been assigned to table %03d. Your table is %s, exactly %.1f meters from here.\n"+
		"You will be sitting next to %s.",
		name,
		table,
		direction,
		distance,
		neighbor,
	)
}
