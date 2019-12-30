import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	Button,
	SafeAreaView,
	Animated
} from "react-native";

import CardRole from "./CardRole";
import BackCard from "./BackCard";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ListPlayerMistigri(props) {
	const [animatedValue] = useState(new Animated.Value(0));
	const [animatedTranslateValue] = useState(new Animated.Value(0));
	const [open, setOpen] = useState(false);

	const [value, setValue] = useState(0);
	animatedValue.addListener(({ value }) => {
		setValue(value);
	});
	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "180deg"]
	});
	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["180deg", "360deg"]
	});

	const scale = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 4]
	});

	const scale2 = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 4]
	});

	function flipCard() {
		if (value > 0.5) {
			Animated.timing(animatedValue, {
				toValue: 0,
				duration: 800
			}).start(() => setOpen(false));
		} else {
			Animated.timing(animatedValue, {
				toValue: 1,
				duration: 800
			}).start(() => setOpen(true));
		}
	}

	function startScaleAnimation() {
		Animated.timing(animatedTranslateValue, {
			toValue: 2,
			timing: 1200
		}).start(() => {
			Animated.timing(animatedTranslateValue, {
				toValue: 1,
				duration: 1200
			}).start();
		});
	}
	const frontAnimatedStyle = {
		transform: [{ rotateX: frontInterpolate }]
	};

	const AnimatedTouchable = Animated.createAnimatedComponent(
		TouchableWithoutFeedback
	);

	const backAnimatedStyle = {
		transform: [{ rotateX: backInterpolate }]
	};

	const position = {
		transform: [
			{
				translateY: animatedValue.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 200]
				})
			}
		]
	};

	const position2 = {
		transform: [
			{
				translateY: animatedValue.interpolate({
					inputRange: [0, 1],
					outputRange: [-200, 0]
				})
			}
		]
	};

	return (
		<View
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				alignItems: "center",
				top: 100,
				zIndex: 10
			}}
		>
			{open ? (
				<TouchableOpacity
					style={{
						width: 320,
						height: 400,
						position: "absolute",
						zIndex: 100
					}}
					onPress={() => {
						flipCard();
					}}
				></TouchableOpacity>
			) : (
				<TouchableWithoutFeedback
					onPress={() => {
						flipCard();
					}}
				>
					<View
						style={{
							width: 80,
							height: 80,
							position: "absolute",
							zIndex: 100
						}}
					></View>
				</TouchableWithoutFeedback>
			)}
			<Animated.View style={position}>
				<Animated.View
					style={{
						width: 80,
						height: 80,
						transform: [{ scale: scale }]
					}}
				>
					<Animated.View
						style={{
							width: 80,
							height: 80,
							backfaceVisibility: "hidden",
							transform: [
								{ rotateX: frontInterpolate },
								{ perspective: 1000 }
							]
						}}
					>
						<View style={styles.cardOutside}>
							<View style={styles.cardInside}></View>
						</View>
					</Animated.View>
					<Animated.View
						style={{
							width: 80,
							height: 80,
							position: "absolute",
							top: 0,
							alignItems: "center",
							justifyContent: "center",
							transform: [
								{ rotateX: backInterpolate },
								{ perspective: 1000 }
							],
							backfaceVisibility: "hidden"
						}}
					>
						<CardRole
							width={80}
							height={80}
							role={props.role}
							faceCard={props.faceCard}
							handleFaceCard={bool => props.handleFaceCard(bool)}
						/>
					</Animated.View>
				</Animated.View>
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	cardOutside: {
		width: 80 || Dimensions.get("window").width / 5,
		height: 80 || Dimensions.get("window").width / 5,
		borderRadius: 5,
		alignItems: "center",
		justifyContent: "center",
		padding: 4,
		backgroundColor: "#d9d9d9",
		borderWidth: 1,
		borderColor: "black",
		elevation: 5
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
