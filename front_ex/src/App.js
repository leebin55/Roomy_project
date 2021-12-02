import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import News from './pages/News';
import Game from './pages/Game';
import Feeds from './components/Feeds';
import {
  RoomMain,
  Board,
  Gallery,
  GuestMain,
  Todo,
  Setting,
} from './components/room/RoomComps';
import Room from './pages/Room';
import GalleryWrite from './components/room/gallery/GalleryWrite';
import GalleryDetail from './components/room/gallery/GalleryDetail';

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
          <Route path="gallery/:board_seq" element={<GalleryDetail />} />
          <Route path="gallery/write" element={<GalleryWrite />} />
          <Route path="guest" element={<GuestMain />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
