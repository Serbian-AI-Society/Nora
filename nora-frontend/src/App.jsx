import './App.css'
import Chatbot from './components/Chatbot'
import Sidebar from './components/Sidebar'
import { Toaster } from 'react-hot-toast'



function App() {

  return (
    <>
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Sidebar />
        <Chatbot />
      </div>
    </div>
    <Toaster containerClassName='react-toast' position='bottom-center' reverseOrder={false} />

  </>
  )
}

export default App
