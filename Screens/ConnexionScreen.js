import React, { useState, useEffect } from "react"

import { Text, View, TextInput, TouchableOpacity } from 'react-native'

import io from 'socket.io-client'

import { LinearGradient } from 'expo-linear-gradient';

import MainScreen from "./MainScreen"

export default function ConnexionScreen(props) {


	const [socket, setSocket] = useState()	
	const [allRoom, setAllRoom] = useState([])
	//https://backend-secret-tease.herokuapp.com/ 
	useEffect(() => {
	 	setSocket(io("http://192.168.0.14:8080/"))	 	
	},[])

	useEffect(() => {
		if (socket)
			socket.on("newRoom", allRoom => {
			 	setAllRoom(allRoom)
			})
	},[socket])

	const [username, setUsername] = useState()
	const [room, setRoom] = useState()


	return(
		<View style={{flex:1, width: "100%", justifyContent: "center"}}>
		<LinearGradient
			style={{flex:1, width: "100%", justifyContent: "center"}}
			colors={["#3f4347", "#1a1b1c"]}
			start={[0.1, 0]}
			end={[0.9, 0.9]}
		>
		{
			!room ?		
			<View>

				<View>
					<Text>Choississez un pseudo</Text>
					<TextInput 
						value={username}
						onChangeText={text => setUsername(text)}
						style={{backgroundColor: "white", height: 50}}
					/>
				</View>

				{
					allRoom.length > 0 &&
					allRoom.map(room => (
						<TouchableOpacity
							onPress={() => setRoom(room)}
						>
							<Text>{room}</Text>
						</TouchableOpacity>
					))
				}
			</View>
			:
			<MainScreen room={room} username={username}/> 
		}
		</LinearGradient>
		</View>
		)
}