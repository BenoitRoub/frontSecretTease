import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Animated
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import getRoleById from ".././Function/getCardById";

export default function CardRole(props) {
	const [role, setRole] = useState({
		name: "nom",
		info: "info"
	});

	// useEffect(() => {
	// 	props.socket.on("role:update", newRole => {
	// 		console.log(newRole);
	// 		console.log(getRoleById(newRole));
	// 		setRole(getRoleById(newRole));
	// 		setFaceCard(true);
	// 		props.handleOpen();
	// 	});
	// }, []);

	const [faceCard, setFaceCard] = useState(true);

	if (faceCard)
		return (
			<Animated.View
				style={{
					width: props.width,
					height: props.height,
					backgroundColor: "white"
				}}
			>
				<TouchableOpacity onPress={() => setFaceCard(false)}>
					<Ionicons
						name="md-information-circle"
						size={32}
						color={"black"}
					/>
				</TouchableOpacity>
				<Animated.Text style={{ fontSize: 12 }}>
					{role.name}
				</Animated.Text>
			</Animated.View>
		);
	else if (!faceCard && props.open)
		return (
			<View>
				<TouchableOpacity onPress={() => setFaceCard(true)}>
					<Ionicons name="md-arrow-back" size={32} color={"black"} />
				</TouchableOpacity>
				<Text>{role.info}</Text>
			</View>
		);
	else return null;
}
