import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddItem from "./components/AddItem";
import Edit from "./components/Edit";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/addItem' element={<AddItem/>} />
          <Route path='/home/edit/:id' element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
