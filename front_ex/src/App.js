import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import News from "./pages/News";
import Game from "./pages/Game";
import Feeds from "./components/Feeds";
import {
  RoomMain,
  Board,
  Gallery,
  GuestMain,
  Todo,
  Setting,
<<<<<<< HEAD
<<<<<<< HEAD
} from "./components/room/RoomComps";
import Room from "./pages/Room";
import GalleryWrite from "./components/room/gallery/GalleryWrite";
=======
=======

>>>>>>> 217fb0e25cf8030f7a8a7b579c847325de5a4e54
} from './components/room/RoomComps';
import Room from './pages/Room';
import GalleryWrite from './components/room/gallery/GalleryWrite';
import GalleryUpdate from './components/room/gallery/GalleryDetail';
<<<<<<< HEAD
>>>>>>> c6de329e463500ed010e7dcc9d30634d1c16648e
=======

>>>>>>> 217fb0e25cf8030f7a8a7b579c847325de5a4e54

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Feeds />} />
          <Route path="game" element={<Game />} />
          <Route path="news" element={<News />} />
        </Route>
        <Route path="/room" element={<Room />}>
          <Route index element={<RoomMain />} />
          <Route path="board" element={<Board />} />
          <Route path="todo" element={<Todo />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:board_seq" element={<GalleryUpdate />} />
          <Route path="gallery/write" element={<GalleryWrite />} />
          <Route path="guest" element={<GuestMain />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
