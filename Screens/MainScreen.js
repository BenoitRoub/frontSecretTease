import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	StyleSheet
} from "react-native";

import io from "socket.io-client";

import { LinearGradient } from "expo-linear-gradient";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import useInterval from ".././Function/useInterval";

import PopUpMission from ".././Components/PopUpMission";
import Alert from ".././Components/Alert";
import ListPlayer from ".././Components/ListPlayer";
import Score from ".././Components/Score";
import Actuality from ".././Components/Actuality";

export default function MainScreen(props) {
	// const [room, setRoom] = useState();
	// const [selfId, setSelfId] = useState();
	// const [selfUsername, setSelfUsername] = useState();

	// useEffect(() => {
	// 	if (room)
	// 		room.on("SelfId", res => {
	// 			setSelfId(res.id);
	// 			setSelfUsername(res.username);
	// 		});
	// }, [room]);

	// const [timer, setTimer] = useState(5);

	// useInterval(() => {
	// 	setTimer(timer - 1);
	// }, 1000);

	// const [niceTimer, setNiceTimer] = useState();
	// useEffect(() => {
	// 	var sec = timer % 60;
	// 	if (sec < 10) {
	// 		sec = "0" + sec;
	// 	}
	// 	var min = Math.floor(timer / 60);
	// 	setNiceTimer(`${min} : ${sec}`);
	// }, [timer]);

	// const [openMission, setOpenMission] = useState(false);
	// const [openAlert, setOpenAlert] = useState(false);

	// const [openList, setOpenList] = useState();
	// const [missionPicked, setMissionPicked] = useState();

	if (props.room)
		return (
			<View
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Score room={room} />

				<ListPlayer
					open={openList}
					room={room}
					missionPicked={missionPicked}
					selfId={selfId}
					selfUsername={selfUsername}
					handleOpenList={boolean => setOpenList(boolean)}
					handleMissionPicked={mission => setMissionPicked(mission)}
				/>

				<Actuality
					room={room}
					openList={openList}
					handleOpenList={boolean => setOpenList(boolean)}
					handleMissionPicked={mission => setMissionPicked(mission)}
				/>

				<LinearGradient
					style={{
						width: "100%",
						borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						alignItems: "center",
						justifyContent: "center"
					}}
					colors={["#292e2e", "#313636"]}
					start={[0.3, 0]}
					end={[0.7, 1]}
				>
					<View style={styles.bottomBar}>
						<TouchableOpacity
							style={{ marginRight: "30%" }}
							onPress={() => {
								setOpenMission(!openMission);
								setOpenAlert(false);
							}}
						>
							<Text
								style={{
									fontSize: 22,
									color: openMission ? "#91e3d6" : "#defaf6"
								}}
							>
								{niceTimer}
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								setOpenAlert(!openAlert);
								setOpenMission(false);
							}}
						>
							<MaterialIcons
								name="notifications"
								size={32}
								color={openAlert ? "#eb9bba" : "#fae3ec"}
							/>
						</TouchableOpacity>
					</View>

					<Alert
						room={room}
						open={openAlert}
						handleOpenChange={boolean => setOpenAlert(boolean)}
						handleOpenMission={boolean => setOpenMission(boolean)}
					/>

					<PopUpMission
						room={room}
						open={openMission}
						handleOpenChange={boolean => setOpenMission(boolean)}
						handleOpenAlert={boolean => setOpenAlert(boolean)}
						handleOpenList={boolean => setOpenList(boolean)}
						team={1}
						selfId={selfId}
						selfUsername={selfUsername}
						timer={timer}
						changeTimer={timer => setTimer(timer)}
					/>
				</LinearGradient>
			</View>
		);
	else return <View></View>;
}

const styles = StyleSheet.create({
	bottomBar: {
		height: 64,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});
