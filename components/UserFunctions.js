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
  let posts, url, caption;
  await db
    .collection("posts")
    .doc(auth.currentUser.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        url = data.downloadURL;
        caption = data.caption;
        //console.log(data.downloadURL);
        const id = doc.id;
        return { id, ...data };
      });
    });
  return posts;
};
