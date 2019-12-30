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
	const [animatedTranslateValue] = useState(new Animated.Value(1));
	const [open, setOpen] = useState(false);

	const [value, setValue] = useState(0);
	animatedValue.addListener(({ value }) => {
		setValue(value);
	});

	const AnimatedTouchable = Animated.createAnimatedComponent(
		TouchableWithoutFeedback
	);

	function startScaleAnimation() {
		Animated.timing(animatedTranslateValue, {
			toValue: 1.05,
			timing: 1200
		}).start(() => {
			Animated.timing(animatedTranslateValue, {
				toValue: 1,
				duration: 1200
			}).start(() => startScaleAnimation());
		});
	}
	return (
		<View style={{ marginTop: 100 }}>
			<AnimatedTouchable
				style={{
					width: 320,
					height: 320,
					transform: [{ scale: animatedTranslateValue }]
				}}
				onPress={startScaleAnimation()}
			>
				<Animated.View
					style={{
						width: 320,
						height: 320,
						transform: [{ scale: animatedTranslateValue }]
					}}
				>
					<Animated.View
						style={{
							width: 320,
							height: 320,
							backgroundColor: "#253237",
							backfaceVisibility: "hidden"
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

							backfaceVisibility: "hidden"
						}}
					>
						<Text>derriere</Text>
					</Animated.View>
				</Animated.View>
			</AnimatedTouchable>
		</View>
	);
}
