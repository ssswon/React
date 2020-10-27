import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/auth/HomePage';

const App = () => {
  return <Route path="/" component={HomePage} exact />;
};

export default App;
