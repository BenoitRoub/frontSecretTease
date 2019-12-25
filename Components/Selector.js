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

import { EvilIcons, AntDesign } from "@expo/vector-icons";

export default function Selector(props) {
	const [searchFilter, setSearchFilter] = useState();
	const [searchedItems, setSearchedItems] = useState([]);

	useEffect(() => {
		let newSearchedItems = [];

		for (item in props.items) {
			if (props.items[item].includes(searchFilter)) {
				newSearchedItems.push(props.items[item]);
			}
		}
		if (searchFilter) {
			setSearchedItems(newSearchedItems);
		} else {
			setSearchedItems(props.items);
		}
	}, [searchFilter]);
	useEffect(() => {
		setSearchedItems(props.items);
	}, [props.items]);

	return (
		<View>
			<View
				style={{
					flexDirection: "row",
					width: "100%",
					padding: 7,
					backgroundColor: "white",
					borderRadius: 4,
					alignItems: "center",
					justifyContent: "space-between"
				}}
			>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<EvilIcons name="search" size={24} color={"black"} />
					<TextInput
						value={searchFilter}
						onChangeText={text => {
							props.setNewRoom(text);
							if (text.length > 0) setSearchFilter(text);
							else {
								setSearchFilter();
							}
						}}
						style={{ width: "auto" }}
					/>
				</View>
				{searchFilter && props.eraseIcon ? (
					<TouchableOpacity onPress={() => setSearchFilter()}>
						<AntDesign name="close" size={24} color={"black"} />
					</TouchableOpacity>
				) : null}
				{props.icon ? props.icon() : null}
			</View>
			<View style={{ maxHeight: 500 }}>
				<SafeAreaView>
					<ScrollView>
						{searchedItems.map((item, index) =>
							props.renderItem(item, index)
						)}
						<View style={{ hight: 30 }} />
					</ScrollView>
				</SafeAreaView>
			</View>
		</View>
	);
}
