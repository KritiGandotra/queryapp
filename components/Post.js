import {
  onSnapshot,
  serverTimestamp,
  collection,
  orderBy,
  query,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "@firebase/firestore";

import {
  BookmarkIcon,
  ChatIcon,
  CollectionIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  MinusCircleIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { session, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Moment from "react-moment";
import { db, storage } from "../firebase";
import { useAlert } from "react-alert";
import { saveAs } from "file-saver";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [isShown, setIsShown] = useState(false);

  const alert = useAlert();

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likepost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  const del = async () => {
    if (session.user.username === username) {
      alert.success("Post Deleted!");
      await deleteDoc(doc(db, "posts", id));
    } else {
      console.log("no");
    }
  };

  const saveFile = () => {
    saveAs(img, "image.jpg"); // Put your image url here.
  };
  return (
    <div className="bg-white my-6 border rounded-sm">
      {/* Header*/}

      <div className="flex items-center p-3">
        <img
          src={userImg}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 mt-3 font-bold">{username}</p>

        {session && (
          <MinusCircleIcon
            onClick={del}
            className="h-5 cursor-pointer text-red-500"
          ></MinusCircleIcon>
        )}
      </div>
      {/* img */}
      <img src={img} className="object-cover w-full" alt="" />
      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-2.5 pt-4">
          <div className="flex space-x-4">
            {hasLiked ? (
              <HeartIconFilled
                onClick={likepost}
                className="button text-red-500"
              />
            ) : (
              <HeartIcon onClick={likepost} className="button" />
            )}

            <ChatIcon className="button" />
            <PaperAirplaneIcon className="button" />
          </div>
          <BookmarkIcon onClick={saveFile} className="button cursor-pointer" />
        </div>
      )}

      {/* caption */}
      <div className="ml-4 mt-2 h-48 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
        <p className="text-sm">
          {likes.length > 0 && (
            <p className="font-bold mb-1 ">{likes.length} Likes</p>
          )}
          <span className="font-bold mr-1 ml-0">{username}</span>
          {caption}
        </p>
      </div>

      {/* comments */}

      {comments.length > 0 && (
        <div className="ml-4 h-48 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex space-x-2 mb-3 cursor-pointer"
            >
              <img
                className="h-7 rounded-full cursor-pointer"
                src={comment.data().userImage}
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold mr-2">
                  {comment.data().username}
                </span>
                {comment.data().comment}
              </p>
              {/*<MinusCircleIcon className="h-4 mt-0.5 text-red-500 cursor-pointer" />*/}
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/*input box */}
      {session && (
        <form className="flex items-center p-4">
          <EmojiHappyIcon className="h-7 mb-3" />
          <textarea
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Type your answer here"
            className="border-none flex-1 focus:ring-0"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-semibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
