import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	Modal,
	TextInput,
	TouchableHighlight,
	Alert,
	TouchableOpacity,
	Button
} from "react-native";
// test
import io from "socket.io-client";
import { MaterialIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import Selector from "../Components/Selector";
import ConnexionScreen from "./ConnexionScreen";

export default function RoomSelectionScreen(props) {
	const [socket, setSocket] = useState();
	const [allRoom, setAllRoom] = useState([]);
	const [room, setRoom] = useState("");
	const [newRoom, setNewRoom] = useState("");
	const [newRoomPassword, setNewRoomPassword] = useState("");
	const [openPasswordRequest, setOpenPasswordRequest] = useState(false);
	const [connected, setConnected] = useState(false);
	const [openNewRoom, setOpenNewRoom] = useState(false);

	const [password, setPassword] = useState("");

	//https://backend-secret-tease.herokuapp.com/
	useEffect(() => {
		setSocket(io("http://192.168.0.14:8080"));
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("room:getAll", allRooms => {
				console.log(allRooms);
				setAllRoom(allRooms);
			});
			socket.on("room:connected", room => {
				setOpenPasswordRequest(false);
				setConnected(true);
			});
			socket.on("room:connectionError", room => {
				console.log("error connection");
				setOpenPasswordRequest(false);
				Alert.alert("Mauvais mot de passe");
			});
			socket.on("room:createError", room => {
				Alert.alert("Choisir un autre nom de room");
				setNewRoomPassword();
				setNewRoom();
			});
		}
	}, [socket]);

	return (
		<View style={{ flex: 1, width: "100%", justifyContent: "center" }}>
			<LinearGradient
				style={{ flex: 1, width: "100%", justifyContent: "center" }}
				colors={["#3f4347", "#1a1b1c"]}
				start={[0.1, 0]}
				end={[0.9, 0.9]}
			>
				{connected ? (
					<ConnexionScreen
						room={room}
						socket={socket}
						connected={connected}
						disconnect={() => setConnected(false)}
					/>
				) : (
					<View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={openPasswordRequest}
							onRequestClose={() => {
								setOpenPasswordRequest(false);
								setPassword("");
							}}
						>
							<View
								style={{
									width: "100%",
									height: "100%",
									backgroundColor: "#ffffff40",
									alignItems: "center",
									justifyContent: "center"
								}}
							>
								<View
									style={{
										width: 300,
										backgroundColor: "#3f4347"
									}}
								>
									<TextInput
										value={password}
										placeholder={"Mot de passe"}
										onChangeText={text => setPassword(text)}
										style={{
											backgroundColor: "grey",
											margin: 10,
											height: 50,
											borderRadius: 8,
											paddingLeft: 20
										}}
									/>
									<Button
										title="Valider"
										color="grey"
										disabled={password.length === 0}
										onPress={() => {
											socket.emit("room:tryPassword", {
												name: room,
												password: password
											});
										}}
									/>
								</View>
							</View>
						</Modal>
						<View
							style={{
								margin: 10,
								width: "90%"
							}}
						>
							<View>
								<Selector
									items={allRoom}
									icon={() => (
										<TouchableOpacity
											onPress={() => setOpenNewRoom(true)}
										>
											<MaterialIcons
												name="add"
												size={24}
												color={"black"}
											/>
										</TouchableOpacity>
									)}
									renderItem={(item, index) => (
										<TouchableOpacity
											style={{
												borderRadius: 5,
												elevation: 5,
												marginTop: 15
											}}
											key={index}
											onPress={() => {
												setOpenPasswordRequest(true);
												setRoom(item);
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
													{item}
												</Text>
											</LinearGradient>
										</TouchableOpacity>
									)}
								/>
								<Modal
									animationType="fade"
									transparent={true}
									visible={openNewRoom}
									onRequestClose={() => {
										setOpenNewRoom(false);
										setNewRoomPassword("");
										setNewRoom("");
									}}
								>
									<View
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#ffffff40",
											alignItems: "center",
											justifyContent: "center"
										}}
									>
										<View
											style={{
												width: 300,
												backgroundColor: "#3f4347"
											}}
										>
											<TextInput
												placeholder={"Nom"}
												value={newRoom}
												onChangeText={text =>
													setNewRoom(text)
												}
												style={{
													backgroundColor: "grey",
													margin: 10,
													height: 50,
													borderRadius: 8,
													paddingLeft: 20
												}}
											/>
											<TextInput
												value={newRoomPassword}
												placeholder={"Mot de passe"}
												onChangeText={text =>
													setNewRoomPassword(text)
												}
												style={{
													backgroundColor: "grey",
													height: 50,
													margin: 10,
													borderRadius: 8,
													paddingLeft: 20
												}}
											/>

											<Button
												title="Valider"
												disabled={
													newRoomPassword.length ===
														0 ||
													newRoom.length === 0
												}
												color="grey"
												onPress={() => {
													socket.emit("Add Room", {
														name: newRoom,
														password: newRoomPassword
													});
													setOpenNewRoom(false);
												}}
											/>
										</View>
									</View>
								</Modal>
							</View>
						</View>
					</View>
				)}
			</LinearGradient>
		</View>
	);
}
