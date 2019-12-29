import React, { useState, useEffect } from "react";

import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import getMission from ".././Function/getMission";
import ListPlayer from "./ListPlayer";

export default function PopUpMission(props) {
	const [mission, setMission] = useState();

	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		props.socket.on("Mission Discover", () => {
			setMission();
			props.changeTimer(10);
		});
	}, []);

	useEffect(() => {
		if (props.timer === 0) {
			setConfirmed(false);
			setMission(getMission(props.players));
			props.handleOpenChange(true);
			props.handleOpenAlert(false);
			props.changeTimer(1000);
		}
	}, [props.timer]);

	const [openList, setOpenList] = useState(false);
	function confirm() {
		if (!confirmed) {
			setConfirmed(true);
			props.socket.emit("New Actuality", {
				text: mission.actualityText,
				idPlayer: props.selfId,
				usernamePlayer: props.selfUsername,
				type: "startMission"
			});
			props.handleOpenChange(false);
			//Compte a rebours avant fin de mission
			props.changeTimer(10 * 60);
		} else {
			props.socket.emit("Succes Mission", {
				rewardPoint: mission.rewardPoint,
				team: props.team,
				selfId: props.selfId
			});
			props.socket.emit("Delete Actuality", props.selfId);
			setMission();
			setConfirmed(false);
			props.handleOpenList("fromMission");
			props.handleOpenChange(false);
			//Compte a rebours avant procahine mission
			props.changeTimer(10);
		}
	}

	function cancel() {
		if (!confirmed) {
			props.socket.emit("Delete Actuality", props.selfId);
			setMission();
			props.handleOpenChange(false);
			//Compte a rebours avant procahine de mission PETIT
			props.changeTimer(10);
		} else {
			setConfirmed(false);
			props.socket.emit("Delete Actuality", props.selfId);
			setMission();
			props.handleOpenChange(false);
			//Compte a rebourd normal
			props.changeTimer(15);
		}
	}

	if (props.open && mission) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>{mission.text}</Text>

				{!confirmed ? (
					<Text style={styles.text}>Acceptez-vous la mission ?</Text>
				) : (
					<Text style={styles.text}>Mission effectué ?</Text>
				)}

				<View style={{ flexDirection: "row", marginTop: 20 }}>
					<TouchableOpacity
						style={{ marginRight: 40 }}
						onPress={() => confirm()}
					>
						<MaterialIcons
							name="check-circle"
							size={48}
							color="#defaf6"
						/>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => cancel()}>
						<MaterialIcons
							name="cancel"
							size={48}
							color="#fae3ec"
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					style={{ position: "absolute", bottom: -8, left: 16 }}
					onPress={() => props.handleOpenChange(false)}
				>
					<MaterialIcons
						size={32}
						color={"#defaf6"}
						name="arrow-back"
					/>
				</TouchableOpacity>
			</View>
		);
	} else if (props.open && !mission)
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center", color: "white" }}>
					Vous n'avez pas de mission pour le moment
				</Text>
				<TouchableOpacity
					style={{ position: "absolute", bottom: -8, left: 16 }}
					onPress={() => props.handleOpenChange(false)}
				>
					<MaterialIcons
						size={32}
						color={"#defaf6"}
						name="arrow-back"
					/>
				</TouchableOpacity>
			</View>
		);
	else return null;
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16
	},
	text: {
		fontSize: 14,
		color: "white",
		margin: 12
	}
});
