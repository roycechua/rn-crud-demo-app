import React, { FunctionComponent, useState, useEffect } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "expo-constants";
import { Story } from "../models/Story";
import axios from "axios";
import uuid from 'react-native-uuid';

const HomeScreen: FunctionComponent = (props: any) => {
	const [story, setStory] = useState<string>("");
	const [stories, setStories] = useState<Story[]>([]);

	useEffect(() => {
		getStories();
	}, [stories])

	const getStories = () => {
		axios.get("https://crud-demo-api-gj2myr203v5s.runkit.sh/")
		.then(response => {
			setStories(response.data);
		})
		.catch(err => console.error(err));
	}

	const handleAddStory = () => {
		axios.post("https://crud-demo-api-gj2myr203v5s.runkit.sh/posts", {
			data: {
				id: uuid.v4(),
				story
			}
		})
		.then(response => {
			Alert.alert("Add Story", "Add successful");
			getStories();
		})
		.catch(err => console.error(err));
	}
	
	return (
		<View style={styles.container}>
            <View style={{ margin: 10 }} />
			<Text style={styles.heading}>Write what you want..</Text>
			<View style={{ margin: 10 }} />
			<TextInput
				style={styles.addPostInput}
				placeholder={"What's on your mind?"}
				value={story}
				onChangeText={setStory}
				numberOfLines={2}
				multiline
				spellCheck={false}
				autoCapitalize={"none"}
			/>
			<View style={{ margin: 10 }} />
			<Button title={"Add Story"} onPress={handleAddStory} />
            <View style={{ margin: 10 }} />
            <FlatList
                data={stories}
                keyExtractor={(item)=>item.id.toString()}
                ListHeaderComponent={<Text style={styles.heading}>Freedom Wall</Text>}
                ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
                renderItem={({item, index}) => (<View style={styles.postItem}>
                    <Text style={{fontSize:20}}>{item.title}</Text>
                    <Text>Story Written By: {item.author}</Text>
                    <View style={{ margin: 10 }} />
                    <Text>{item.story}</Text>
                    <View style={{ margin: 5 }} />
                </View>)}
            />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: "#ecf0f1",
		padding: 8,
	},
	heading: {
		fontSize: 30,
		fontWeight: "bold",
	},
	addPostInput: {
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
	},
    postItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    }
});
