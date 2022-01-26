import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  // post의 각 페이지드릉ㄹ 구별해줄때 useParams 사용
  let { id } = useParams();
  // post들을 담아 둘 객체 생성
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // server측에서 보내주는 데이터를 axios.get으로 받아줌
  // byId/${id}는 Posts.js 파일에서 지정한 endPoint가 되는것이다
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, []);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        // this code make comment show on browser automatically
        const commentToAdd = { commentBody: newComment };
        // ...는 previous array 정보들을 가져올 수 있음
        setComments([...comments, commentToAdd]);
        // 인풋창 값 초기화해준다.
        setNewComment("");
      });
  };

  // comment 부분에 setnewComment로 바뀌는 comment 데이터를 잡아옴
  // input 창 초기값으로 value={newComment} 넣어두면됨
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment.."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
