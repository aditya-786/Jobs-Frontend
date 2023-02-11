import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import {Routes,Route} from "react-router-dom"
import AppRoute from './routes';
import Navbar from './containers/Navbar/Navbar';

function App() {
  return (
  <>
      {/* <Header/> */}
      <Navbar />
   <AppRoute />
  </>
  );
}

export default App;

