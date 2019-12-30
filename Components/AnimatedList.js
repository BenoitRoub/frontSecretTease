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

const List = [
	{ value: 3, text: "Felix", color: "red" },
	{ value: 3, text: "Benoit", color: "blue" },
	{ value: 6, text: "Morgane", color: "#253237" }
];
const NewList = [
	{ value: 14, text: "Felix" },
	{ value: 11, text: "Benoit" },
	{ value: 9, text: "Morgane" }
];

export default function ConnexionScreen(props) {
	const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
	const [animatedTranslateValue] = useState(new Animated.Value(0));
	const [transitionList, setTransitionList] = useState(
		props.oldList.sort((list, _list) => {
			if (list.value > _list.value) return 1;
		})
	);

	const height = 50;
	useEffect(() => {
		const newTransitionList = transitionList.map((list, index) => ({
			...list,
			prevIndex: index,
			prevValue: list.value
		}));
		setTransitionList(newTransitionList);
	}, []);

	function startScaleAnimation(changed) {
		const newTransitionList = transitionList.sort((list, _list) => {
			if (list.value < _list.value) return 1;
			if (list.value === _list.value && list.prevIndex > _list.prevIndex)
				return 0;
			else return -1;
		});
		for (const i in newTransitionList) {
			if (
				newTransitionList[i].value <
				props.newList.find(
					list => list.text === newTransitionList[i].text
				).value
			) {
				newTransitionList[i].prevValue = newTransitionList[i].value;
				newTransitionList[i].value += 1;
				changed = true;
			} else {
				newTransitionList[i].prevValue = newTransitionList[i].value;
			}
		}
		if (changed) {
			const listtt = newTransitionList
				.map((list, index) => ({ ...list, prevIndex: index }))
				.sort((list, _list) => {
					if (list.value < _list.value) return 1;
					if (
						list.value === _list.value &&
						list.prevIndex > _list.prevIndex
					)
						return 0;
					else return -1;
				});
			setTransitionList(listtt);
			Animated.timing(animatedTranslateValue, {
				fromValue: 0,
				toValue: 1,
				duration: 500
			}).start(() => {
				if (changed) {
					startScaleAnimation(false);
				}
			});
		}
	}

	function getTranslation(index, prevIndex) {
		if (index < prevIndex) {
			return [
				{
					translateY: animatedTranslateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [0, -height * (prevIndex - index)]
					})
				}
			];
		}
		if (index > prevIndex) {
			return [
				{
					translateY: animatedTranslateValue.interpolate({
						inputRange: [0, 1],
						outputRange: [0, height * (index - prevIndex)]
					})
				}
			];
		}
		return;
	}

	function getAnimatedWidth(prevValue, value) {
		return animatedTranslateValue.interpolate({
			inputRange: [0, 1],
			outputRange: [prevValue * 10, value * 10]
		});
	}

	function getWidth() {
		return 50;
	}

	return (
		<View
			style={{
				marginTop: 100,
				position: "absolute",
				left: 40,
				top: 0
			}}
		>
			{transitionList
				.sort((list, _list) => {
					if (list.value < _list.value) return 1;
					if (
						list.value === _list.value &&
						list.prevIndex > _list.prevIndex
					)
						return 0;
					else return -1;
				})
				.map((list, index) => (
					<Animated.View
						key={list.text}
						style={{
							width: getAnimatedWidth(
								list.prevValue || 0,
								list.value
							),
							height: height,
							position: "absolute",
							top:
								height * (list.prevIndex + 1) ||
								height * (index + 1),
							backgroundColor: list.color,
							transform: getTranslation(index, list.prevIndex)
						}}
					>
						<Text>
							{list.text} {list.value}
						</Text>
					</Animated.View>
				))}
			<TouchableOpacity
				style={{ top: 300 }}
				onPress={() => startScaleAnimation(false)}
			>
				<Text>start</Text>
			</TouchableOpacity>
		</View>
	);
}
