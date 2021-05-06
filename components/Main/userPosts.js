import React from "react";
import { View, Text, FlatList } from "react-native";
import PostCard from "../reusable/PostCard";
const userPosts = (props) => {
  console.log(props.route.params.post);
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={props.route.params.post}
        renderItem={({ item }) => (
          <PostCard
            url={item.downloadURL}
            caption={item.caption}
            userName={props.route.params.user.Name}
            //date={item.creation}
          />
        )}
        initialScrollIndex={props.route.params.index}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default userPosts;
