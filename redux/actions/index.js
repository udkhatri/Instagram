import { db, auth } from "../../firebase";
import { USER_STATE_CHANGE } from "../constants/index";
export const fetchUser = () => {
  return async (dispatch) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("snap");
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("errors: snapshot not exist");
        }
      });
  };
};
export const fetchUserPosts = () => {
  return async (dispatch) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("snap");
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log("errors: snapshot not exist");
        }
      });
  };
};
