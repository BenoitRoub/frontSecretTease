import React, { useState, useEffect } from "react";

import { Text, View } from "react-native";

import ProgressCircle from "react-native-progress-circle";

export default function Timer(props) {
	const [niceTimer, setNiceTimer] = useState();
	useEffect(() => {
		if (props.timer > 0) {
			var sec = props.timer % 60;
			if (sec < 10) {
				sec = "0" + sec;
			}
			var min = Math.floor(props.timer / 60);
			setNiceTimer(`${min} : ${sec}`);
		} else setNiceTimer("0");
	}, [props.timer]);

	const [percent, setPercent] = useState(100);

	useEffect(() => {
		if (props.timer > 0) setPercent((props.timer / 600) * 100);
		else setPercent(0);
	}, [props.timer]);

	return (
		<View>
			<ProgressCircle
				percent={percent}
				radius={48}
				borderWidth={48}
				color="grey"
				shadowColor="#999"
				bgColor="#999"
			></ProgressCircle>
			<View
				style={{
					position: "absolute",
					width: 96,
					height: 96,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text
					style={{
						fontSize: 18
					}}
				>
					{niceTimer}
				</Text>
			</View>
		</View>
	);
}
