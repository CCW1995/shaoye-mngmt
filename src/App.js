import logo from './logo.svg';
import './App.css';
import Axios from 'axios'

function App() {

  const onCallApiTest = () => {
    Axios.get( `https://ynjsiv6xp2.execute-api.us-east-1.amazonaws.com/dev/users/test` ).fetch( res => {
      console.log( res )
    }).catch( )
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
