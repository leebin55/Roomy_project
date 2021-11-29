import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './routes/Main';
import Game from './routes/Game';
import News from './routes/News';
import Feeds from './components/Feeds';
import {
  RoomMain,
  Board,
  Gallery,
  Guest,
  Todo,
  Setting,
} from './components/room/RoomComps';
import Room from './routes/Room';

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
          <Route path="guest" element={<Guest />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
