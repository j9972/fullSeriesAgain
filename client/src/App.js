import "./App.css";
// Switch -> Routes 로 변경됨.
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";

/*
change component -> element
 from    <Route path="/" exact component={Home} />
 to      <Route path="/" element={<Home />} />
*/
function App() {
  // value는 element object 그 자체를 나타내는데, key는 index를 의미
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create a Post</Link>
        <Link to="/">Home</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
