
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import './styling/color.css'
import './styling/fonts.css'
import './styling/flex.css'
import './styling/text.css'
import './styling/general.css'
import StartPage from './pages/startPage/startPage';
import GradientPage from './pages/gradientPage/gradientPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage></StartPage>}/>             
        <Route path="/gradient" element={<GradientPage></GradientPage>}/>             
        <Route path="/animation" element={<h1>HI!</h1>}/>             
        <Route path="/palette" element={<h1>HI!</h1>}/>             
        <Route path="/extract" element={<h1>HI!</h1>}/>             
      </Routes>
    </Router>
  );
}

export default App;
