import { hot } from 'react-hot-loader/root';
import App from './App';

export default process.env.NODE_ENV !== 'production' ? hot(App) : App;
