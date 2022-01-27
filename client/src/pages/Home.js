import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  // Posts에 대해서 담을 배열을 useState를 통해 state를 나타내고 있음
  const [listOfPosts, setListOfPosts] = useState([]);
  const navigate = useNavigate();

  // axios를 통해서 : server - localhost:3001/posts 이라는 Endpoint에 있는 데이터를 가져올것임
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        {
          PostId: postId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        // alert(response.data); 안써도됨 -> routes -> likes.js를 res.json liked의 boolean를 trigger
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                // like를 count해줌
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                // length가 중요하지 어떤 like인지는 중요하지 않음
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  // value는 element object 그 자체를 나타내는데, key는 index를 의미
  // value.Likes.length로 like를 판단하고 array로 표현해서 쌓일 수 있게 해줌
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              {value.username}
              <button
                onClick={() => {
                  likeAPost(value.id);
                }}
              >
                Like
              </button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
