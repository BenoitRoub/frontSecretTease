import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackCard from "./BackCard";
import PersonnalCard from "./PersonnalCard";
export default function ListPlayerMistigri(props) {
	const [playerSelected, setPlayerSelected] = useState();

	const [allPlayers, setAllPlayers] = useState([
		{
			id: "miophiohh",
			name: "Fel",
			ready: true,
			room: "Room2",
			score: 0
		},
		{
			id: "bdgsefvssfes",
			name: "Gauth",
			ready: true,
			room: "Room2",
			score: 0
		},
		{
			id: "azfafafza",
			name: "Pauline",
			ready: true,
			room: "Room2",
			score: 0
		}
	]);

	// useEffect(() => {
	// 	props.socket.on("player:list", playersList => {
	// 		setAllPlayers(playersList);
	// 	});
	// }, []);

	useEffect(() => {
		if (props.timer === 0) {
			props.socket.emit("player:vote", { targetId: playerSelected });
			props.openLeaderBoards();
		}
	}, [props.timer]);

	if (props.open)
		return (
			<View
				style={{
					flex: 1,
					margin: 20,
					width: "100%",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<PersonnalCard socket={props.socket} open />
				<View style={{ flexDirection: "row" }}>
					{allPlayers.map(player => (
						<BackCard
							player={player}
							selectPlayer={playerId =>
								setPlayerSelected(playerId)
							}
							playerSelected={playerSelected}
							width={80}
							height={80}
						/>
					))}
				</View>
			</View>
		);
	else return null;
}
