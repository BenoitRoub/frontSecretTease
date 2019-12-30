import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Button,
	Alert,
	SafeAreaView,
	ScrollView
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { EvilIcons, AntDesign, Entypo } from "@expo/vector-icons";

import MainScreen from "./MainScreen";

export default function ConnexionScreen(props) {
	const [username, setUsername] = useState();
	const [enterUsername, setEnterUsername] = useState(true);

	const [openGame, setOpenGame] = useState(false);
	const [players, setPlayers] = useState([]);

	const [selfUsername, setSelfUsername] = useState();
	const [selfId, setSelfId] = useState();

	useEffect(() => {
		props.socket.on("game:enter", name => {
			setSelfUsername(name);
			setEnterUsername(false);
			setUsername();
		});
		props.socket.on("user:alreadyExists", () => {
			Alert.alert("Votre nom est déjà pris");
			setUsername("");
		});
		props.socket.on("player:list", playersList => {
			setPlayers(playersList);
		});
		props.socket.emit("player:getList");
	}, []);

	useEffect(() => {
		players.map(player => {
			if (player.username === selfUsername) {
				setSelfId(player.id);
			}
		});
	}, [selfUsername]);

	renderSelectReady = (ready, selected, socket) => {
		if (!selected) {
			if (ready)
				return <AntDesign name="check" size={24} color={"white"} />;
			return (
				<Entypo
					name="dots-three-horizontal"
					size={24}
					color={"white"}
				/>
			);
		}
		if (ready)
			return (
				<TouchableOpacity
					onPress={() => {
						props.socket.emit("player:readyAction", false);
					}}
				>
					<AntDesign name="check" size={24} color={"white"} />
				</TouchableOpacity>
			);
		return (
			<TouchableOpacity
				onPress={() => {
					props.socket.emit("player:readyAction", true);
				}}
			>
				<Entypo
					name="dots-three-horizontal"
					size={24}
					color={"white"}
				/>
			</TouchableOpacity>
		);
	};

	const [launch, setLaunch] = useState(false);
	useEffect(() => {
		props.socket.on("game:launch", bool => {
			setLaunch(bool);
			console.log(bool);
			if (bool) props.socket.emit("player:readyAction", true);
		});

		props.socket.emit("room:getStatusLaunch");
	}, []);

	useEffect(() => {
		if (players.length > 0) {
			if (
				players.map(player => player.ready).every(bool => bool === true)
			) {
				props.socket.emit("room:launch");
			}
		}
	}, [players]);

	if (!launch || !selfUsername)
		return (
			<View
				style={{
					margin: "5%",
					width: "90%"
				}}
			>
				<TouchableOpacity
					onPress={() => {
						props.socket.emit("room:disconnect");
						props.disconnect();
					}}
				>
					<AntDesign name="arrowleft" size={24} color={"white"} />
				</TouchableOpacity>
				<View>
					<View style={{ maxHeight: 400 }}>
						<SafeAreaView>
							<ScrollView>
								{players.length > 0 &&
									players.map((player, index) => (
										<LinearGradient
											colors={["#242625", "#242625"]}
											start={[0.1, 0]}
											end={[0.9, 0.9]}
											style={{
												padding: 14,
												marginTop: 10,
												flexDirection: "row",
												justifyContent: "space-between"
											}}
											key={player.name}
										>
											<Text
												style={{
													color: "white",
													textAlign: "center",
													fontSize: 15
												}}
											>
												{player.name}
											</Text>
											{player.id === props.socket.id ? (
												<View
													style={{
														flexDirection: "row"
													}}
												>
													<TouchableOpacity
														onPress={() => {
															props.socket.emit(
																"player:delete"
															);
															setEnterUsername(
																true
															);
														}}
													>
														<AntDesign
															name="close"
															size={24}
															color={"white"}
														/>
													</TouchableOpacity>
													{renderSelectReady(
														player.ready,
														(selected = true)
													)}
												</View>
											) : (
												renderSelectReady(player.ready)
											)}
										</LinearGradient>
									))}
								<View style={{ height: 30 }} />
							</ScrollView>
						</SafeAreaView>
					</View>
					{enterUsername ? (
						<View>
							<View
								style={{
									borderRadius: 5,
									elevation: 5,
									backgroundColor: "grey",
									height: 30,
									marginTop: 20
								}}
							>
								<Text style={{ textAlign: "center" }}>
									Choississez un pseudo
								</Text>
							</View>
							<TextInput
								value={username}
								onChangeText={text => setUsername(text)}
								style={{
									borderRadius: 5,
									elevation: 5,
									backgroundColor: "white",
									height: 50,
									marginTop: 10
								}}
							/>
							<View
								style={{
									marginTop: 10,
									borderRadius: 5,
									elevation: 5
								}}
							>
								<Button
									title="Entrer"
									color="#f194ff"
									onPress={() => {
										props.socket.emit("user:add", {
											name: username,
											room: props.room
										});
									}}
								/>
							</View>
						</View>
					) : null}
				</View>
			</View>
		);
	else
		return (
			<MainScreen
				socket={props.socket}
				players={players}
				selfId={selfId}
				selfUsername={selfUsername}
			/>
		);
}
