import Main from '../components/Chatbot/Main';
import Sidebar from '../components/Chatbot/Sidebar';

const Chatbot = () => {
  return (
    <>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <Sidebar />
          <Main />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
