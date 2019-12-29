import React, { useState, useEffect } from "react";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import getCardById from ".././Function/getCardById";

export default function CardRole(props) {
	const [card, setCard] = useState({
		name: "Mistigri",
		info: "Vous êtes le mistigri"
	});

	useEffect(() => {
		props.socket.on("card:update", newCard => {
			setCard(getCardById(newCard));
			setFaceCard(true);
			props.handleOpen();
		});
	}, []);

	const [faceCard, setFaceCard] = useState(true);

	if (faceCard && props.open)
		return (
			<View>
				<TouchableOpacity onPress={() => setFaceCard(false)}>
					<Ionicons
						name="md-information-circle"
						size={32}
						color={"black"}
					/>
				</TouchableOpacity>
				<View>
					<Text>{card.name}</Text>
				</View>
				<TouchableOpacity
					style={{
						borderRadius: 2,
						borderWidth: 1,
						borderColor: "grey",
						padding: 8
					}}
					onPress={() => props.openListPlayer()}
				>
					<Text>Ok</Text>
				</TouchableOpacity>
			</View>
		);
	else if (!faceCard && props.open)
		return (
			<View>
				<TouchableOpacity onPress={() => setFaceCard(true)}>
					<Ionicons name="md-arrow-back" size={32} color={"black"} />
				</TouchableOpacity>
				<Text>{card.info}</Text>
			</View>
		);
	else return null;
}
