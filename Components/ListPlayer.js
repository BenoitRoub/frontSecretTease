import React, { useState, useEffect } from 'react'

import { Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native"

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ListPlayer(props) {

	const [players, setPlayers] = useState([])
	useEffect(() => {
		props.room.on('New Player', players => {
			setPlayers(players)
		})	

	},[])

	const [firstSelected, setFirstSelected] = useState()
	const [secondSelected, setSecondSelected] = useState()

	function emitPlayerChoice() {
		props.room.emit('Player Selected After Succes', { playerSuffer: firstSelected, judge: secondSelected})
		setFirstSelected()
		setSecondSelected()
		props.handleOpenList(false)
	}


	function reportPlayer() {
		if (props.selfId === firstSelected.id) {
			props.room.emit('Alert', {alert: "5 gorgés pour le petit malin", idPlayer: props.selfId})
		}
		else if (firstSelected.id === props.missionPicked.idPlayer) {
			props.room.emit('Spotted Mission', {mission: props.missionPicked, selfId: props.selfId, selfUsername: props.selfUsername})
		}
		else if (firstSelected.id !== props.missionPicked.idPlayer) {
			props.room.emit('Alert', {alert: "Vous buvez 5 gorgés pour vous êtes trompé", idPlayer: props.selfId})
			props.selfId
		}
		setFirstSelected()
		setSecondSelected()
		props.handleOpenList(false)
		props.handleMissionPicked()
	}

	const item = {
		borderRadius: 2,
		padding: 16,
		backgroundColor: "rgba(112, 112, 112, 0.6)",
		margin: 4,
		elevation: 2,
		width: "60%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row"
	}

	const text = {
		fontSize: 12, 
		fontWeight: "700", 
		color: "#d6d6d6", 
		textAlign:"center"
	}



	if (players.length > 0 && props.open) {
		return (
			<ScrollView contentContainerStyle={{alignItems: "center", flexGrow: 1}} style={{width: "100%"}}>
				
				<TouchableOpacity 
					style={{position: "absolute", top: 8, left: 16}}
					onPress={() => props.handleOpenList(false)}>
					<MaterialIcons size={32} color={"#defaf6"} name="arrow-back" />
				</TouchableOpacity>

				<View style={{padding: 16}}>
					<Text style={text}>{
						!firstSelected && !props.missionPicked ? 
						"SELECTIONNER UNE CIBLE" : 
						!props.missionPicked ?
						"SELECTIONNER UN JUGE":
						"DENONCER QUELQU'UN"
					}</Text>
				</View>

				{players.map(player => (
			
					<TouchableOpacity
						onPress={
							!firstSelected ? () => setFirstSelected(player) 
							: firstSelected && props.missionPicked ? () => setFirstSelected(player)
							: () => setSecondSelected(player)}
						style={item}
						key={player.id}
					>
					{
						firstSelected && firstSelected.id === player.id &&
						<MaterialCommunityIcons size={24} color={"#fae3ec"} name="target" style={{marginRight: 12}}/>
					}
					{
						secondSelected && secondSelected.id === player.id &&
						<MaterialCommunityIcons size={24} color={"#defaf6"} name="hammer" style={{marginRight: 12}}/>
					}
						<Text style={text}>{player.username}</Text>
					</TouchableOpacity>
		
				))}

				{
					firstSelected && props.missionPicked ?
					<TouchableOpacity 
						onPress={() => reportPlayer()}
						style={{position: "absolute", top: Dimensions.get("window").height * 0.75 - 64 - 60, right: 8}}>
						<MaterialCommunityIcons size={48} color={"#defaf6"} name="check-circle" style={{marginRight: 12}}/>
					</TouchableOpacity>
					:
					firstSelected && secondSelected ?
					<TouchableOpacity 
						onPress={() => emitPlayerChoice()}
						style={{position: "absolute", bottom: 8, right: 8}}>
						<MaterialCommunityIcons size={48} color={"#defaf6"} name="check-circle" style={{marginRight: 12}}/>
					</TouchableOpacity>
					: null
				}
				

				
			</ScrollView>			
		)
	} else if (props.open) {
		return (
			<Text>Aucun Joueur</Text>
			)
	} else return null
}