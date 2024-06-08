import { Toaster } from 'react-hot-toast';
import Chatbot from './pages/Chatbot';

import ReactGA from 'react-ga' 
import { useEffect } from 'react';

const TRACKING_ID = '407334196'

ReactGA.initialize(TRACKING_ID);

const App = () => {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [])

  return (
    <>
      <Chatbot />
      <Toaster containerClassName="react-toast" position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
