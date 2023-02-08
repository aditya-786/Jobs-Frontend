import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import {Routes,Route} from "react-router-dom"
import AppRoute from './routes';

function App() {
  return (
  <>
   <Header/>
   <AppRoute />
  </>
  );
}

export default App;

