import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*
정리를 하면,

회원가입 같이 데이터를 c -> s 방향으로 보낼떄는 axios를 post 방식에 실어서 obSubmit 같은 함수에 넣어주며, 
endpoint를 지정해주고 이를 User라는 route에서 처리 해준다. 

로그인 같은 경우는 data를 c -> s로 보내지만 회원가입과는 다른 endpoint를 지정해줘야 하지만, 
회원가입과 같은 페이지에서 다른 endpoint로 데이터를 처리하면 된다

*/

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = () => {
    const data = { username, password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("accessToken", response.data);
        navigate("/");
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
