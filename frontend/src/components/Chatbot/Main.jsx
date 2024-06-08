import { useRef, useState } from 'react';
import { sendMessageToServer } from '../../services/chat.service';
import toast from 'react-hot-toast';
import Chatmessage from './Chatmessage';
import ChatInput from './ChatInput';
import Info from './Info';
import popsound from '../../assets/Sound/notification.mp3';

const Main = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('messages');
    //   return savedMessages
    //     ? JSON.parse(savedMessages)    : [];
    // });
    if (!savedMessages) {
      const initialMessage = [
        {
          text: "Ja sam Nova, tvoj turistički vodič za Novi Sad. Kako mogu da ti pomognem?",
          isUser: false,
          isAnswer: false
        },
      ];
      localStorage.setItem('messages', JSON.stringify(initialMessage));
      return initialMessage;
    }
    return JSON.parse(savedMessages);
  });
  // when message is sent , users should not be able to click on the button untilafter responce is gotten
  const [isSending, setIsSending] = useState(false);

  // Ref for scrollIntoView
  const scroll = useRef();

  const [notificationAudio] = useState(new Audio(popsound));

  const playNotificationSound = () => {
    notificationAudio.play();
  };

  const handleMessageSubmit = async () => {
    if (input === '') {
      toast.error('Polje za unos je prazno, molimo Vas unesite poruku.');
      navigator.vibrate(700);
    } else {
      setIsSending(true);

      const userMessage = { text: input, isUser: true };
      toast.promise(sendMessageToServer(input), {
        loading: 'Slanje poruke...',
        success: (response) => {
          const aiMessage = { text: response, isUser: false, isAnswer: true };
          playNotificationSound();

          setMessages((prevMessages) => [...prevMessages, userMessage, aiMessage]);
          setInput('');

          // add Ai message to localStorage
          localStorage.setItem('messages', JSON.stringify([...messages, userMessage, aiMessage]));

          setIsSending(false); // enable the button after message is sent

          // scrollIntoView
          if (scroll.current)
            setTimeout(
              () =>
                scroll.current.scrollTo({
                  top: scroll.current.scrollHeight,
                  behavior: 'smooth',
                }),
              100
            );
        },
        error: (error) => {
          setIsSending(false); // enable the button after message is sent
          toast.error(`Error: ${error.message}`);
        },
      });
    }
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('messages');
    setMessages([]);
    toast.success('Poruke su obrisane.');
    setMessages([ {
      text: "Ja sam Nova, tvoj turistički vodič za Novi Sad. Kako mogu da ti pomognem?",
      isUser: false,
      isAnswer: false
    }])
  };

  const handleCopyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Copied to clipboard!');
      })
      .catch((error) => {
        toast.error(`Failed to copy: ${error.message}`);
      });
  };

  return (
    <>
      <div className="flex flex-col flex-auto h-full">
        <div className="flex flex-col flex-auto flex-shrink-0 bg-grey h-full">
          {messages.length > 0 ? (
            <div ref={scroll} className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <Chatmessage messages={messages} handleCopyToClipboard={handleCopyToClipboard} />
                <br />
                <br />
                <br />
                <br />
              </div>
            </div>
          ) : (
            <Info />
          )}

          {messages.length > 0 && (
            <center>
              <button
                onClick={handleClearLocalStorage}
                className="flex items-center justify-center bg-blue hover:bg-blue rounded-xl text-white px-0 py-1 mb-3 p-20 flex-shrink-0 w-44">
                Obriši konverzaciju
              </button>
            </center>
          )}

          <ChatInput
            input={input}
            setInput={setInput}
            handleMessageSubmit={handleMessageSubmit}
            handleClearLocalStorage={handleClearLocalStorage}
            messages={messages}
            isSending={isSending}
          />
        </div>
      </div>
    </>
  );
};

export default Main;
