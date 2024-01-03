import logo from './logo.svg';
import './App.css';
import Mainroutes from './Components/Mainroutes';
import { HelmetProvider } from 'react-helmet-async';
// import { Helmet,HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    
      
    <HelmetProvider>
      <div className="App">
      <Mainroutes/>
    </div>
    </HelmetProvider>
      
   
  );
}

export default App;
