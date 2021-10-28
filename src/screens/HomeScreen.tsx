import React, { FunctionComponent, useState } from "react";
import { Button, FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import Constants from "expo-constants";

const HomeScreen: FunctionComponent = (props: any) => {
	const [story, setStory] = useState<string>("");

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
			<Button title={"Add Story"} onPress={() => {}} />
            <View style={{ margin: 10 }} />
            <FlatList
                data={[
                    {id:1, title: "React Native Workshop", "author": "Royce", "story": "Ito ang kwento ko bow."},
                    {id:2, title: "Jamming", "author": "Unknown", "story": "Bakit kasi di pa tayo mag jamming?"},
                    {id:3, title: "Semfie Outreach", "author": "Boybawang", "story": "Wag na maglaro habang nag wworkshop 😂"}
                ]}
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
