import './App.css';
import { Suspense } from 'react';
import { ContextProvider } from './context/app-context';
import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/app-navigation';

function App() {
  return (
    <Suspense fallback="loading">
      <ContextProvider>
        <HelmetProvider>
          <AppNavigation />
        </HelmetProvider>
      </ContextProvider>
    </Suspense>
  );
}

export default App;
