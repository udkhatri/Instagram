import { db, auth } from "../firebase";

export const fetchUser = async () => {
  await db
    .collection("users")
    .doc(auth.currentUser.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        console.log("snap++++");
        console.log(snapshot.data());
      } else {
        console.log("errors: snapshot not exist");
      }
    });
};
export const fetchUserPosts = async () => {
  await db
    .collection("post")
    .doc(auth.currentUser.uid)
    .collection("userPost")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      console.log("snap posts");
      console.log(snapshot.docs);
    });
};
