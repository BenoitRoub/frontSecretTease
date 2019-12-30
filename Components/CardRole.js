import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
	Animated
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function CardRole(props) {
	if (props.faceCard)
		return (
			<Animated.View
				style={{
					width: props.width,
					height: props.height,
					backgroundColor: "white"
				}}
			>
				<TouchableOpacity onPress={() => props.handleFaceCard(false)}>
					<Ionicons
						name="md-information-circle"
						size={32}
						color={"black"}
					/>
				</TouchableOpacity>
				<Animated.Text style={{ fontSize: 12 }}>
					{props.role.name}
				</Animated.Text>
			</Animated.View>
		);
	else
		return (
			<View>
				<TouchableOpacity onPress={() => props.handleFaceCard(true)}>
					<Ionicons name="md-arrow-back" size={32} color={"black"} />
				</TouchableOpacity>
				<Text>{props.role.info}</Text>
			</View>
		);
}
