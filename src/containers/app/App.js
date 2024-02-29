import React from 'react';
import { ConfigProvider } from 'antd';
import Router from '../../router/router';
import { AuthProvider } from '../../context/AuthContext';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#00b96b' } }}>
      <ErrorBoundary>
        <div>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </div>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
