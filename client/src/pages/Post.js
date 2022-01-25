import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  // post의 각 페이지드릉ㄹ 구별해줄때 useParams 사용
  let { id } = useParams();
  // post들을 담아 둘 객체 생성
  const [postObject, setPostObject] = useState({});

  // server측에서 보내주는 데이터를 axios.get으로 받아줌
  // byId/${id}는 Posts.js 파일에서 지정한 endPoint가 되는것이다
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">Comment Section</div>
    </div>
  );
}

export default Post;
