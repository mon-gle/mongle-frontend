import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Story from './pages/Story';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/story/:id" element={<Story />} />
      </Routes>
    </Router>
  );
}

export default App;
