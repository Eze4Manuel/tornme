import { AppProvider } from '../src/core/store/Store'
import './App.css';

//providers

function App() {
  return (
    <AppProvider>
        <div>
          The Admin Application for Tornme
        </div>
      </AppProvider>
  );
}

export default App;
