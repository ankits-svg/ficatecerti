import logo from './logo.svg';
import './App.css';
import Mainroutes from './Components/Mainroutes';
import { Helmet,HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      
    <div className="App">
    {/* <Helmet>
        <title>byteXL</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
      </Helmet> */}
      {/* <h1>WebPage</h1> */}
      <Mainroutes/>
      
    </div>
    </HelmetProvider>
  );
}

export default App;
