import React, { useState, useEffect } from "react"

import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from '@expo/vector-icons';

export default function Score(props) {

	const [scoreGood ,setScoreGood] = useState(0)
	const [scoreBad ,setScoreBad] = useState(0)
	useEffect(() => {
		props.room.on('New Score', score => {
			setScoreGood(score[0])
			setScoreBad(score[1])
		})
	},[])


	const [openScore, setOpenScore] = useState(true)

	
	//
					//<Text style={[styles.score, {color: "#91e3d6"}]}>{scoreGood}</Text>
					//<Text style={[styles.score, {color: "#eb9bba"}]}>{scoreBad}</Text>
					//<Text style={styles.title}>SCORE</Text>

	return (
		<TouchableOpacity onPress={() => setOpenScore(!openScore)} style={{width: "100%"}}>
		<LinearGradient
			style={styles.container}
			//colors={["#8d9fa8", "#99a8b0", "#8d9fa8", "#99a8b0"]}
			colors={["#defaf6", "#fae3ec"]}
			start={[0, 0]}
      		end={[1, 1]}
			//locations={[0, 0.3, 0.6, 0.9]}
		>	
		{
			openScore &&
			<View style={{height: 100}}></View>

		}	
		
			<View style={styles.scoreContainer}>

				<View>
					<Text style={[styles.score, {color: "#7ddbcc"}]}>{scoreGood}</Text>
				</View>

				{
					openScore ?
					<Ionicons style={{marginLeft: "20%", marginRight: "20%"}} name="ios-arrow-down" size={25} color={"grey"} />
					:
					<Ionicons style={{marginLeft: "20%", marginRight: "20%"}} name="ios-arrow-up" size={25} color={"grey"} />
				}
				
				<View>
					<Text style={[styles.score, {color: "#eb9bba"}]}>{scoreBad}</Text>
				</View>

			</View>

		</LinearGradient>
		</TouchableOpacity>
		)
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		elevation: 5
	},

	scoreContainer: {
		marginTop: 24,
		flexDirection:"row", 
		justifyContent: "center",
		alignItems: "center"
	},

	score: {
		textAlign: "center",
		color: "grey",
		fontSize: 24,
		fontWeight: "700",
		textShadowColor: 'grey',
		textShadowRadius: 1,
		margin: 12
	},

	title: {
		color: "grey", 
		fontSize: 16, 
		fontWeight: "700", 
		textAlign:"center"
	}
})