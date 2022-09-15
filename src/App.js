import { Route, Routes } from "react-router-dom";
import './App.css';
import MovieGrade from "./component/MovieGrade";
import MovieRandom from './component/MovieRandom';
import MovieYear from './component/MovieYear';

function App() {
  return (
    <>
    <div className="App">
  
    </div>
    <Routes>
    <Route path="/" element={<MovieRandom />} />
    <Route path="/moviegrade" element={<MovieGrade />} />
      <Route path="/movieyear" element={<MovieYear />} />
    </Routes>
    </>
  );
}

export default App;
