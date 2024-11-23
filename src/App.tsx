import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Story from './pages/Story';
import Discuss from './pages/Discuss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/story/:id" element={<Story />} />
        <Route path="/discuss/:id" element={<Discuss />} />
      </Routes>
    </Router>
  );
}

export default App;
