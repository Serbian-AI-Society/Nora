
import UserMessage from "./UserMessage";
import ChatBotMessage from "./ChatBotMessage";


const ChatMessage = ({ messages, handleCopyToClipboard }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          className={
            message.isUser ? 'w-full text-black dark:text-grey-50' : 'w-full text-black dark:text-grey-50 bg-grey'
          }
          key={index}>
          {!message.isUser ? <ChatBotMessage message={message}/> : <UserMessage message={message} handleCopyToClipboard={handleCopyToClipboard}/>}
        </div>
      ))}
    </>
  );
};

export default ChatMessage;
