import "./App.css";
// Switch -> Routes 로 변경됨.
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

/*
change component -> element
 from    <Route path="/" exact component={Home} />
 to      <Route path="/" element={<Home />} />
*/
function App() {
  // false로 두면 새로고침하면 로그인한거 날아감 -> useEffect로 고침
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("accessToked")) {
    //   setAuthState(true);
    // } -> 얘를 axios를 써서 만들어봄
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  // value는 element object 그 자체를 나타내는데, key는 index를 의미
  // 로그인의 유무에 따라 navbar를 바꾸는 방법 -> storage.getItme("accessToken")으로 할 수 있음
  // storage.getItem(keyName); -> keyName(DOMString) 을 반환하고, key가 없으면 Null 반환
  // authState가 login state 대한 정보를 가지고 있다 -> localStorage.getItem("accessToken") == authState
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/createpost">Create a Post</Link>
            {!authState && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
