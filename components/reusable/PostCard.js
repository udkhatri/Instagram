import React from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Title,
  IconButton,
  Paragraph,
} from "react-native-paper";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const PostCard = (props) => {
  return (
    <Card style={{ borderRadius: 0 }}>
      <Card.Title
        style={{ marginVertical: -5, backgroundcolor: "white" }}
        titleStyle={{ fontSize: 18, fontWeight: "bold", marginBottom: 0 }}
        title={props.userName} //pass username from inharited page
        left={(props) => (
          <Avatar.Image
            size={44}
            source={require("../../assets/favicon.png")}
          />
        )}
        right={(props) => (
          <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
        )}
        rightStyle={{ backgroundColor: "#faaaa", borderRadius: 0 }}
      />
      <Card.Cover
        source={{
          uri: props.url,
        }}
        style={{ height: useWindowDimensions().width }}
      />

      <Card.Actions
        style={{ justifyContent: "space-between", paddingHorizontal: 15 }}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            style={{ paddingRight: 15 }}
            name="heart-outline"
            size={30}
            color="black"
          />
          <MaterialCommunityIcons
            style={{ paddingRight: 15 }}
            name="comment-outline"
            size={30}
            color="black"
          />
          <Feather name="send" size={30} color="black" />
        </View>

        <Feather name="bookmark" size={30} color="black" />
      </Card.Actions>
      <Card.Content style={{ marginVertical: -10 }}>
        <Title>
          <Text style={{ fontWeight: "bold" }}>{props.likes}</Text> Likes
        </Title>
        <Paragraph>{props.caption}</Paragraph>
        <Text>{props.date}</Text>
      </Card.Content>
    </Card>
  );
};

export default PostCard;
