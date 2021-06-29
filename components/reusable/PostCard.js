import React from "react";
import { View, useWindowDimensions } from "react-native";
import {
  Avatar,
  Text,
  Card,
  Title,
  IconButton,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import { Image } from "react-native-elements";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

const PostCard = (props) => {
  return (
    <Card
      style={{
        borderRadius: 15,
        backgroundColor: "#ffffffaa",
        margin: 5,
        elevation: 0,
      }}
    >
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
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        {props.url ? (
          <Card.Cover
            source={{
              uri: props.url,
            }}
            style={{
              height: useWindowDimensions().width - 10,
              width: "95%",
              justifyContent: "space-around",
              elevation: 5,
              borderRadius: 15,
            }}
          />
        ) : (
          <Image
            style={{
              height: useWindowDimensions().width - 10,
              width: useWindowDimensions().width - 20,
              justifyContent: "space-around",

              borderRadius: 15,
            }}
            PlaceholderContent={<ActivityIndicator size="large" />}
          />
        )}
      </View>

      <Card.Actions
        style={{ justifyContent: "space-between", paddingHorizontal: 15 }}
      >
        <View style={{ flexDirection: "row" }}>
          <IconButton
            {...props}
            icon="heart-outline"
            onPress={() => {}}
            style={{ elevation: 5, backgroundColor: "white" }}
          />

          <IconButton
            {...props}
            icon="message-outline"
            onPress={() => {}}
            style={{ elevation: 5, backgroundColor: "white" }}
          />
          <IconButton
            {...props}
            icon={({ color }) => (
              <Feather name="send" size={22} color={color} />
            )}
            onPress={() => {}}
            style={{ elevation: 5, backgroundColor: "white" }}
          />
        </View>

        <IconButton
          {...props}
          icon="bookmark-outline"
          onPress={() => {}}
          style={{ elevation: 5, backgroundColor: "white" }}
        />
      </Card.Actions>
      <Card.Content style={{ marginVertical: -10, marginBottom: -20 }}>
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
