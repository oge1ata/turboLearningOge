import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

//import React from 'react'
import { hydrateRoot } from 'react-dom/client';
//import App from './App.tsx'
import Loading from './global/Loading.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense loading={<Loading />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Suspense>
  </React.StrictMode>,
)

//use below only for production where you have ssr setup
//@ts-ignore
//hydrateRoot(document, <App assetMap={window.assetMap} />);
//@ts-ignore
hydrateRoot(document, <React.StrictMode><Suspense loading={<Loading />}><BrowserRouter><AppWithNavDemo assetMap={window.assetMap} /></BrowserRouter></Suspense></React.StrictMode>);


