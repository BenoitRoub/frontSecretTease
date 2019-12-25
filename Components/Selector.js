import React, { useState, useEffect } from "react";

import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Button,
	Alert
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
					padding: 10,
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
							if (text.length > 0) setSearchFilter(text);
							else {
								setSearchFilter(props.items);
							}
						}}
						style={{ width: "80%" }}
					/>
				</View>
				{searchFilter && (
					<TouchableOpacity onPress={() => setSearchFilter()}>
						<AntDesign name="close" size={24} color={"black"} />
					</TouchableOpacity>
				)}
				{props.icon ? props.icon() : null}
			</View>
			{searchedItems.map((item, index) => props.renderItem(item, index))}
		</View>
	);
}
