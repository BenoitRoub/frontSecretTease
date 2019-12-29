import React, { useState, useEffect } from "react";

import { Text, View, TouchableOpacity, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Actuality(props) {
	const [actuality, setActuality] = useState([]);

	useEffect(() => {
		props.socket.on("New Actuality", actuality => setActuality(actuality));
	}, []);

	const [players, setPlayers] = useState([]);

	useEffect(() => {
		props.socket.on("New Player", players => {
			setPlayers(players);
		});
	}, []);
	useEffect(() => {
		console.log(actuality);
	}, [actuality]);
	if (!props.openList)
		return (
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<View style={{ height: 16 }} />
				{actuality.length > 0 &&
					actuality.map((actu, index) =>
						actu.type === "startMission" ? (
							<TouchableOpacity
								style={{
									borderRadius: 5,
									margin: 10,
									width: "90%",
									elevation: 5
								}}
								key={index}
								onPress={() => {
									props.handleOpenList(true);
									props.handleMissionPicked(actu);
								}}
							>
								<LinearGradient
									colors={["#242625", "#2c2e2e"]}
									start={[0.1, 0]}
									end={[0.9, 0.9]}
									style={{ padding: 14 }}
								>
									<Text
										style={{
											color: "white",
											textAlign: "center",
											fontSize: 15
										}}
									>
										{actu.text}
									</Text>
								</LinearGradient>
							</TouchableOpacity>
						) : actu.type === "spottedMission" ? (
							<View
								style={{
									margin: 10,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row"
								}}
							>
								<MaterialCommunityIcons
									name="alert"
									size={32}
									color="#eb9bba"
								/>
								<Text
									style={{
										color: "rgba(255,255,255,0.7)",
										textAlign: "center",
										fontSize: 14,
										marginLeft: 16
									}}
								>
									{actu.text}
								</Text>
							</View>
						) : actu.type === "succesMission" ? (
							<View
								style={{
									margin: 10,
									alignItems: "center",
									justifyContent: "center",
									flexDirection: "row"
								}}
							>
								<MaterialCommunityIcons
									name="thumb-up"
									size={16}
									color={
										actu.team === 0 ? "#91e3d6" : "#eb9bba"
									}
								/>
								<Text
									style={{
										color: "rgba(255,255,255,0.7)",
										textAlign: "center",
										fontSize: 10,
										marginLeft: 16
									}}
								>
									{actu.text}
								</Text>
							</View>
						) : null
					)}
				<View style={{ height: 24 }} />
			</ScrollView>
		);
	else return null;
}
