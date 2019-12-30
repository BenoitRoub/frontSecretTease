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
import Timer from ".././Components/Timer";

import getRoleById from ".././Function/getCardById";

export default function MainScreen(props) {
	//
	//TIMER
	//

	const [timer, setTimer] = useState(-25);
	useInterval(() => {
		setTimer(timer - 1);
	}, 1000);

	const [round, setRound] = useState(1);

	useEffect(() => {
		props.socket.on("timer:update", newTimer => {
			setTimer(newTimer);
			setRound(round + 1);
		});
	}, []);

	//
	//PLAYERSLIST
	//

	const [playerSelected, setPlayerSelected] = useState();
	const [allPlayers, setAllPlayers] = useState([
		{
			name: "Fel",
			room: 2,
			id: "mpojjn",
			role: 1,
			score: 10
		},
		{
			name: "Gauth",
			room: 2,
			id: "ddzadqqz",
			role: 1,
			score: 9
		},
		{
			name: "Pau",
			room: 2,
			id: "mùjksmonn",
			role: 1,
			score: 9
		},
		{
			name: "Be",
			room: "Room2",
			id: "aKvQCTyHQr6CqIpzAAAB",
			score: 0,
			ready: true,
			role: 15
		}
	]);
	const [prevListPlayers, setPrevListPlayers] = useState([
		{
			name: "Fel",
			room: 2,
			id: "mpojjn",
			role: 1,
			score: 5
		},
		{
			name: "Gauth",
			room: 2,
			id: "ddzadqqz",
			role: 1,
			score: 8
		},
		{
			name: "Pau",
			room: 2,
			id: "mùjksmonn",
			role: 1,
			score: 9
		},
		{
			name: "Be",
			room: "Room2",
			id: "aKvQCTyHQr6CqIpzAAAB",
			score: 0,
			ready: true,
			role: 1
		}
	]);

	// useEffect(() => {
	// 	props.socket.on("player:list", playersList => {
	// 		setAllPlayers(playersList);
	// 	});
	// }, []);

	useEffect(() => {
		if (timer === 0) {
			props.socket.emit("player:vote", { targetId: playerSelected });
			handleOpen("DynamicList");
		}
		if (timer === -30) {
			props.socket.emit("timer:end", { round: round });
			setPrevListPlayers(allPlayers);
		}
	}, [timer]);

	//
	// ROLE
	//

	const [role, setRole] = useState({
		name: "nom",
		info: "info"
	});

	const [faceCard, setFaceCard] = useState(true);

	useEffect(() => {
		props.socket.on("role:update", newRole => {
			setRole(getRoleById(newRole));
			setFaceCard(true);
			handleOpen("ListPlayer");
		});
	}, []);

	const [open, setOpen] = useState();
	function handleOpen(text) {
		setOpen(text);
	}

	console.log(role);

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
			<Timer timer={timer} />

			{open !== "LeaderBoards" && (
				<TouchableOpacity
					onPress={() => handleOpen("LeaderBoards")}
					style={{
						position: "absolute",
						right: 100,
						top: 100
					}}
				>
					<Foundation name="crown" size={48} color={"white"} />
				</TouchableOpacity>
			)}

			{open === "LeaderBoards" && (
				<LeaderBoards
					open={text => handleOpen(text)}
					allPlayers={allPlayers}
					selfId={props.socket.id}
				/>
			)}

			{open === "ListPlayer" && (
				<ListPlayerMistigri
					open={text => handleOpen(text)}
					selfId={props.socket.id}
					playerSelected={playerSelected}
					allPlayers={allPlayers}
					role={role}
					faceCard={faceCard}
					handleFaceCard={bool => setFaceCard(bool)}
				/>
			)}

			{open === "DynamicList" && (
				<DynamicList newList={allPlayers} oldList={prevListPlayers} />
			)}

			<TouchableOpacity onPress={() => setDynamicListOpen(true)}>
				<Text>DynamicList</Text>
			</TouchableOpacity>
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
