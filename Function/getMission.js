import React from 'react'

export default function getMission(players) {

	function getOnePlayer() {
		const id = Math.floor(Math.random() * Math.floor(players.length - 1))
		return players[id]
	}

	const missions = [
		{
			text: `Tu dois placer un mot dans la poche de ${getOnePlayer().username}`,
			rewardPoint: 10,
			giveDrink: 7,
			actualityText: "Quelqu'un à accepté une mission faisant appel à du papier",
			textSpotted: "à trouver le fameux bout de papier"
		},
		{
			text: `Convaincs ${getOnePlayer().username} de faire un cul-sec`,
			rewardPoint: 10,
			giveDrink: 5,
			actualityText: "Une mission qui met en jeu beaucoup d'alcool",
			textSpotted: "mission spotted"
		}
	]

	const id = Math.floor(Math.random() * Math.floor(missions.length))
	return missions[id]
}