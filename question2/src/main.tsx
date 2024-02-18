//
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet, HelmetProvider } from 'react-helmet-async';

//
import App from './app';

//
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <ErrorBoundary
      fallbackRender={() => {
        return (
          <h1>Error</h1>
        );
      }}
    >
      <HelmetProvider>
        {/*  */}
        <Helmet>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <title>Moovup - Question 2</title>
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        {/*  */}
        <App />
      </HelmetProvider>
    </ErrorBoundary>
  // </React.StrictMode>,
)
