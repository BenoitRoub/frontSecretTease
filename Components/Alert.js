import React, { useState, useEffect } from 'react'

import { Text, View, TouchableOpacity, StyleSheet } from "react-native"

import { MaterialIcons } from '@expo/vector-icons';


export default function Alert(props) {


	const [alert, setAlert] = useState()

	useEffect(() => {
		props.room.on('Alert', alert => {
			setAlert(alert)
			props.handleOpenChange(true)
			props.handleOpenMission(false)
		})
	},[])

	if (!props.open) {
		return (
			null
			)
	}
	else return(
		<View style={styles.container}>
			<Text style={styles.textAlert}>{alert ? alert : "Pas d'alerte pour le moment"}</Text>
			
			{
				alert &&
				<TouchableOpacity
					onPress={() => {setAlert(); props.handleOpenChange(false)}}
				>
					<MaterialIcons size={32} color={"#defaf6"} name="check" />
				</TouchableOpacity>
			}			

			<TouchableOpacity 
				style={{position: "absolute", bottom: -8, left: 16}}
				onPress={() => props.handleOpenChange(false)}>
				<MaterialIcons size={32} color={"#defaf6"} name="arrow-back" />
			</TouchableOpacity>
		</View>
	)		
	
		
		
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		alignItems:"center",
		justifyContent: "center",
		marginBottom: 16
	},
	textAlert: {
		fontSize: 14,
		color: "white",
		marginBottom: 12
	},
	textButton: {
		fontSize: 14,
		color: "white"
	}
});