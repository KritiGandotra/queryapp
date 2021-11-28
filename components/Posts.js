import Post from "../components/Post";
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { Container, Row, Col } from "react-bootstrap";
import { SearchIcon } from "@heroicons/react/outline";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
  }, [db]);
  return (
    <div>
      <div className="w-full">
        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Search"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>

      {posts
        .filter((post) => {
          if (searchTerm == "") {
            return post;
          } else if (
            post
              .data()
              .username.toLowerCase()
              .includes(searchTerm.toLowerCase())
          ) {
            return post;
          } else if (
            post.data().caption.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            return post;
          }
        })
        .map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.data().username}
            userImg={post.data().profileImg}
            img={post.data().image}
            caption={post.data().caption}
          />
        ))}
    </div>
  );
}

export default Posts;
