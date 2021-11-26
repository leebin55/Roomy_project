import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Game from "./routes/Game";
import News from "./routes/News";
import Feeds from "./components/Feeds";
import {
  RoomMain,
  Board,
  Gallery,
  Guest,
  Todo,
  Setting,
} from "./components/room/RoomComps";
import Room from "./routes/Room";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Feeds />} />
        <Route path="game" element={<Game />} />
        <Route path="news" element={<News />} />
      </Route>
      <Route path="/room" element={<Room />}>
        <Route index element={<RoomMain />} />
        <Route path="board" element={<Board />} />
        <Route path="todo" element={<Todo />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="guest" element={<Guest />} />
        <Route path="setting" element={<Setting />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
