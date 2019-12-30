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

import {
	MaterialIcons,
	MaterialCommunityIcons,
	Foundation
} from "@expo/vector-icons";

import useInterval from ".././Function/useInterval";

import DynamicList from "../Components/AnimatedList";
import PopUpMission from ".././Components/PopUpMission";
import Alert from ".././Components/Alert";
import ListPlayer from ".././Components/ListPlayer";
import Score from ".././Components/Score";
import Actuality from ".././Components/Actuality";
import PersonnalCard from "../Components/PersonnalCard";
import CardRole from ".././Components/CardRole";
import LeaderBoards from ".././Components/LeaderBoards";
import ListPlayerMistigri from ".././Components/ListPlayerMistigri";

export default function MainScreen(props) {
	const [timer, setTimer] = useState(-25);
	const [dynamicListOpen, setDynamicListOpen] = useState(false);
	useInterval(() => {
		setTimer(timer - 1);
	}, 1000);

	const [niceTimer, setNiceTimer] = useState();
	useEffect(() => {
		if (timer > 0) {
			var sec = timer % 60;
			if (sec < 10) {
				sec = "0" + sec;
			}
			var min = Math.floor(timer / 60);
			setNiceTimer(`${min} : ${sec}`);
		} else setNiceTimer("0");
	}, [timer]);

	const [round, setRound] = useState(1);

	useEffect(() => {
		props.socket.on("timer:update", newTimer => {
			setTimer(newTimer);
			setRound(round + 1);
		});
	}, []);

	useEffect(() => {
		if (timer === -30) {
			props.socket.emit("timer:end", { round: round });
		}
	}, [timer]);

	const [openCard, setOpenCard] = useState(false);
	const [openLeaderBoards, setOpenLeaderBoards] = useState(false);
	const [openListPlayer, setOpenListPlayer] = useState(true);

	return (
		<View
			style={{
				flex: 1,
				height: "100%",
				width: "100%",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<DynamicList
				open={dynamicListOpen}
				newList={[
					{ value: 14, text: "Felix" },
					{ value: 11, text: "Benoit" },
					{ value: 9, text: "Morgane" }
				]}
				oldList={[
					{ value: 3, text: "Felix", color: "red" },
					{ value: 3, text: "Benoit", color: "blue" },
					{ value: 6, text: "Morgane", color: "#253237" }
				]}
			/>
			{!openLeaderBoards && (
				<TouchableOpacity
					onPress={() => {
						setOpenCard(false),
							setOpenListPlayer(false),
							setOpenLeaderBoards(true);
					}}
					style={{
						position: "absolute",
						height: "100%",
						borderBottomLeftRadius: 20,
						borderTopLeftRadius: 20,
						right: 0,
						padding: 10,
						backgroundColor: "rgba(255,255,255,0.7)",
						paddingTop: 100
					}}
				>
					<Foundation name="crown" size={32} color={"white"} />
				</TouchableOpacity>
			)}
			<TouchableOpacity onPress={() => setDynamicListOpen(true)}>
				<Text> ici</Text>
			</TouchableOpacity>
			<Text style={{ marginTop: 50 }}>Timer : {niceTimer}</Text>
			<LeaderBoards
				socket={props.socket}
				open={openLeaderBoards}
				handleOpen={() => {
					setOpenCard(false),
						setOpenListPlayer(false),
						setOpenLeaderBoards(true);
				}}
				openListPlayer={() => {
					setOpenCard(false),
						setOpenListPlayer(true),
						setOpenLeaderBoards(false);
				}}
			/>
			<ListPlayerMistigri
				socket={props.socket}
				open={false}
				timer={timer}
				handleOpen={() => {
					setOpenCard(false),
						setOpenListPlayer(true),
						setOpenLeaderBoards(false);
				}}
				openLeaderBoards={() => {
					setOpenCard(false),
						setOpenListPlayer(false),
						setOpenLeaderBoards(true);
				}}
				openCard={() => {
					setOpenCard(true),
						setOpenListPlayer(false),
						setOpenLeaderBoards(false);
				}}
				selfId={props.selfId}
			/>
		</View>
	);
}
// const [openMission, setOpenMission] = useState(false);
// const [openAlert, setOpenAlert] = useState(false);

// const [openList, setOpenList] = useState();
// const [missionPicked, setMissionPicked] = useState();

/*if (props.socket)
		return (
			<View
				style={{
					flex: 1,
					width: "100%",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Score socket={props.socket} />

				<ListPlayer
					players={props.players}
					open={openList}
					socket={props.socket}
					missionPicked={missionPicked}
					selfId={props.selfId}
					selfUsername={props.selfUsername}
					handleOpenList={boolean => setOpenList(boolean)}
					handleMissionPicked={mission => setMissionPicked(mission)}
				/>

				<Actuality
					socket={props.socket}
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
						socket={props.socket}
						open={openAlert}
						handleOpenChange={boolean => setOpenAlert(boolean)}
						handleOpenMission={boolean => setOpenMission(boolean)}
					/>

					<PopUpMission
						socket={props.socket}
						open={openMission}
						handleOpenChange={boolean => setOpenMission(boolean)}
						handleOpenAlert={boolean => setOpenAlert(boolean)}
						handleOpenList={boolean => setOpenList(boolean)}
						team={"good"}
						selfId={props.selfId}
						selfUsername={props.selfUsername}
						timer={timer}
						changeTimer={timer => setTimer(timer)}
						players={props.players}
					/>
				</LinearGradient>
			</View>
		);
	else return <View></View>;
} */

const styles = StyleSheet.create({
	bottomBar: {
		height: 64,
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});
