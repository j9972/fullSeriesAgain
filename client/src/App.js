import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // Posts에 대해서 담을 배열을 useState를 통해 state를 나타내고 있음
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    // axios를 통해서 : server - localhost:3001/posts 이라는 Endpoint에 있는 데이터를 가져올것임
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  // value는 element object 그 자체를 나타내는데, key는 index를 의미
  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title"> {value.title} </div>
            <div className="body"> {value.postText} </div>
            <div className="footer"> {value.username} </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
