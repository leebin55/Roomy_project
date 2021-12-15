// import { useEffect, useState } from 'react'
// import axios from 'axios'
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import News from "./pages/News";
import Game from "./pages/Game";
import Feeds from "./components/Feed/Feeds";
import {
  RoomMain,
  Board,
  Gallery,
  GuestMain,
  Todo,
  Setting,
} from "./components/room/RoomComps";
import Room from "./pages/Room";

import GalleryDetail from "./components/room/gallery/GalleryDetail";

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  // 	try {
  // 		fetch('http://localhost:8080/room/refresh', {
  // 			method: "POST",
  // 			headers: {
  // 				"Content-Type": "application/json",
  // 			},
  // 			body: JSON.stringify(user)
  // 				.then((res) => {
  // 					console.log("res.data.accessToken : ", res.data);
  // 					axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data;
  // 					setIsLogin(true)
  // 					console.log(isLogin)
  // 				})
  // 				.catch((ex) => {
  // 					console.log("app silent request fail : ", ex)
  // 				}).finally(() => {
  // 					console.log("login request end")
  // 					setLoading(true)
  // 				})
  // 		})
  // 	} catch (e) {
  // 		console.log(e)
  // 	}
  // }, []);

  // const loginCallBack = (login) => {
  // 	setIsLogin(login)
  // }
  // if (loading) {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Feeds />} />
          <Route path="game" element={<Game />} />
          <Route path="news" element={<News />} />
        </Route>
        <Route path="/room/:userId" element={<Room />}>
          <Route index element={<RoomMain />} />
          <Route path="board/*" element={<Board />} />
          <Route path="todo" element={<Todo />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:board_seq" element={<GalleryDetail />} />
          <Route path="guest" element={<GuestMain />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
  // } else {
  // 	return (
  // 	<div>Loading...</div>

  // 	)
  //   }
}

export default App;
