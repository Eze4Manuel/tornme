import { AppProvider } from '../src/core/store/Store'
import './App.css';
import Authenticated from './pages/index';

//providers

function App() {
  return (
    <AppProvider>
        <div>
          <Authenticated />
        </div>
      </AppProvider>
  );
}

export default App;
