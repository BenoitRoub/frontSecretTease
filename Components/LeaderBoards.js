import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function LeaderBoards(props) {
	const [allPlayers, setAllPlayers] = useState([]);

	useEffect(() => {
		props.socket.on("player:list", playersList => {
			setAllPlayers(playersList);
		});
	});

	if (props.open)
		return (
			<View
				style={{
					width: "100%",
					height: "100%",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<View style={{ height: 100 }}></View>
				<TouchableOpacity onPress={() => props.openListPlayer()}>
					<Text>Return</Text>
				</TouchableOpacity>
				<ScrollView>
					{allPlayers.map((player, index) => (
						<View style={{ flexDirection: "row" }} key={player.id}>
							{index === 0 && (
								<Ionicons
									size={16}
									color={"black"}
									name={"md-trophy"}
								/>
							)}
							<Text style={{ marginLeft: 16 }}>
								{index + 1}. {player.score}
							</Text>
						</View>
					))}
				</ScrollView>
			</View>
		);
	else return null;
}
