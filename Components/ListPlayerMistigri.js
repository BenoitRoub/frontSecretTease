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
			<PersonnalCard
				role={props.role}
				faceCard={props.faceCard}
				handleFaceCard={bool => props.handleFaceCard(bool)}
			/>
			<View style={{ flexDirection: "row" }}>
				{props.allPlayers.map(player => (
					<BackCard
						player={player}
						selectPlayer={playerId =>
							props.setPlayerSelected(playerId)
						}
						playerSelected={props.playerSelected}
						width={80}
						height={80}
					/>
				))}
			</View>
		</View>
	);
}
