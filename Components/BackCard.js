import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Animated,
	TouchableWithoutFeedback
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function BackCard(props) {
	useEffect(() => {
		if (props.timer === 0) {
			props.socket.emit("player:vote", { targetId: playerSelected });
			props.openLeaderBoards();
		}
	}, [props.timer]);

	const AnimatedTouchable = Animated.createAnimatedComponent(
		TouchableWithoutFeedback
	);

	return (
		<TouchableWithoutFeedback
			key={props.player.id}
			onPress={() => props.selectPlayer(props.player.id)}
		>
			<View
				style={{
					width: props.width || Dimensions.get("window").width / 5,
					height: props.height || Dimensions.get("window").width / 5,
					borderRadius: 5,
					alignItems: "center",
					justifyContent: "center",
					padding: 4,
					backgroundColor: "#d9d9d9",
					borderWidth: 1,
					borderColor: "black",
					margin: 8
				}}
			>
				<Animated.View style={styles.cardInside}>
					{props.playerSelected === props.player.id && (
						<MaterialCommunityIcons
							size={32}
							color={"red"}
							name={"circle"}
						/>
					)}
					<Animated.Text>{props.player.name}</Animated.Text>
				</Animated.View>
			</View>
		</TouchableWithoutFeedback>
	);
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
		borderColor: "black"
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
