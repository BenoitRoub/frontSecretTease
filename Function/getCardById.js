import React from "react";

export default function getRoleById(id) {
	const Role = [
		{
			name: "Bourgeois",
			info:
				"Votre but est de gagner en renommée, attirez vous les faveurs de la cour et gagnez 1 point par vote en votre faveur. Attention à vos realtions, la cour s'inquiète de vos influences, remportez 5 points points en soutenant un noble, et perdez en 5 pour fréquenter la vermine"
		},
		{
			name: "Vermine",
			info:
				"Ceux qui voteront pour la Vermine perdront en crédibilité, ils perdront 5 points de rennomé."
		},
		{
			name: "Noble",
			info:
				"Un noble qui courtise la cour perd de sa superbe, vous perdrez 1 point pour chaque vote que vous recolté."
		}
	];

	return Role[id - 1];
}
