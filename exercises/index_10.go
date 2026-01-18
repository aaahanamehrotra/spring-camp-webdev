package blackjack

// ParseCard returns the integer value of a card following blackjack ruleset.
func ParseCard(card string) int {
	switch card {
	case "ace":
		return 11
	case "two":
		return 2
	case "three":
		return 3
	case "four":
		return 4
	case "five":
		return 5
	case "six":
		return 6
	case "seven":
		return 7
	case "eight":
		return 8
	case "nine":
		return 9
	case "ten", "jack", "queen", "king":
		return 10
	default:
		return 0
	}
}

// FirstTurn returns the decision for the first turn, given two cards of the
// player and one card of the dealer.
func FirstTurn(card1, card2, dealerCard string) string {
    	playerTotal := ParseCard(card1) + ParseCard(card2)
	dealerValue := ParseCard(dealerCard)

	// 1. Pair of aces → Split
	if card1 == "ace" && card2 == "ace" {
		return "P"
	}

	// 2. Blackjack
	if playerTotal == 21 {
		if dealerCard != "ace" && dealerValue != 10 {
			return "W"
		}
		return "S"
	}

	// 3. Total 17–20 → Stand
	if playerTotal >= 17 {
		return "S"
	}

	// 4. Total 12–16
	if playerTotal >= 12 {
		if dealerValue >= 7 {
			return "H"
		}
		return "S"
	}

	// 5. Total 11 or less → Hit
	return "H"
}
