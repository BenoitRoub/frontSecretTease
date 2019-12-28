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
				<ScrollView>
					<TouchableOpacity
						onPress={() => props.openCard()}
						style={styles.cardOutside}
					>
						<View style={styles.cardInside} />
					</TouchableOpacity>
					<View style={{ flexDirection: "row" }}>
						{allPlayers.map(
							player =>
								props.selfId !== player.id && (
									<TouchableOpacity
										key={player.id}
										onPress={() =>
											setPlayerSelected(player.id)
										}
										style={styles.cardOutside}
									>
										<View style={styles.cardInside}>
											{playerSelected === player.id && (
												<MaterialCommunityIcons
													size={32}
													color={"red"}
													name={"circle"}
												/>
											)}
											<Text>{player.name}</Text>
										</View>
									</TouchableOpacity>
								)
						)}
					</View>
				</ScrollView>
			</View>
		);
	else return null;
}

const styles = StyleSheet.create({
	cardOutside: {
		width: Dimensions.get("window").width / 5,
		height: Dimensions.get("window").width / 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		padding: 4,
		backgroundColor: "#d9d9d9",
		borderWidth: 1,
		borderColor: "black",
		margin: 16
	},
	cardInside: {
		flex: 1,
		width: "100%",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#75490f"
	}
});
