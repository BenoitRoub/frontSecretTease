import React, { useState, useEffect, Component } from "react";

import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Button,
	Alert,
	SafeAreaView,
	ScrollView,
	Animated
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function ConnexionScreen() {
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
		outputRange: [0.25, 1]
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
	const width = 10;
	const height = 20;
	const startX = 30;
	const startY = 30;
	const initialScale = 1;
	const endX = 100;
	const endY = 100;
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
	return (
		<View style={{ marginTop: 100 }}>
			{open ? (
				<Animated.View style={position}>
					<AnimatedTouchable
						style={{
							width: 320,
							height: 320,
							top: -120,
							transform: [{ scale: scale2 }]
						}}
						onPress={() => flipCard()}
					>
						<Animated.View
							style={{
								width: 320,
								height: 320,
								top: -120,
								transform: [{ scale: scale2 }]
							}}
						>
							<Animated.View
								style={{
									width: 320,
									height: 320,
									backgroundColor: "#253237",
									backfaceVisibility: "hidden",
									transform: [
										{ rotateX: frontInterpolate },
										{ perspective: 1000 }
									]
								}}
							>
								<Text>devant</Text>
							</Animated.View>
							<Animated.View
								style={{
									width: 320,
									height: 320,
									position: "absolute",
									top: 0,
									backgroundColor: "#250037",
									alignItems: "center",
									justifyContent: "center",
									transform: [
										{ rotateX: backInterpolate },
										{ perspective: 1000 }
									],
									backfaceVisibility: "hidden"
								}}
							>
								<Text>derriere</Text>
							</Animated.View>
						</Animated.View>
					</AnimatedTouchable>
				</Animated.View>
			) : (
				<Animated.View style={position}>
					<AnimatedTouchable
						style={{
							width: 80,
							height: 80,
							transform: [{ scale: scale }]
						}}
						onPress={() => flipCard()}
					>
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
									backgroundColor: "#253237",
									backfaceVisibility: "hidden",
									transform: [
										{ rotateX: frontInterpolate },
										{ perspective: 1000 }
									]
								}}
							>
								<Text>devant</Text>
							</Animated.View>
							<Animated.View
								style={{
									width: 80,
									height: 80,
									position: "absolute",
									top: 0,
									backgroundColor: "#250037",
									alignItems: "center",
									justifyContent: "center",
									transform: [
										{ rotateX: backInterpolate },
										{ perspective: 1000 }
									],
									backfaceVisibility: "hidden"
								}}
							>
								<Text>derriere</Text>
							</Animated.View>
						</Animated.View>
					</AnimatedTouchable>
				</Animated.View>
			)}
		</View>
	);
}
