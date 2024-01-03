import logo from './logo.svg';
import './App.css';
import Mainroutes from './Components/Mainroutes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
    <div className="App">
      {/* <h1>WebPage</h1> */}
      <Mainroutes/>
      
    </div>
    </HelmetProvider>
  );
}

export default App;
