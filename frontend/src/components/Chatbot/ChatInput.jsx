import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import micOff from '../../assets/Images/MicOff.png';
import micOn from '../../assets/Images/MicOn.png';
import InputPicture from './InputPicture';

const ChatInput = ({ input, setInput, handleMessageSubmit, isSending }) => {
  // Hook to get transcript (the speech-to-text)
  const { transcript } = useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState(transcript);
  const [isListening, setIsListening] = useState(false);

  // Turns microphone on and off
  function handleToggleListening() {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  }

  const handleEnter = (event) => {
    if (event.key === 'Enter') handleMessageSubmit();
  };

  // Add transcript to input field when transcript changes
  useEffect(() => {
    setTimeout(() => {
      const cleanedTranscript = transcript.trim().replace(/\s+/g, ' ');
      if (cleanedTranscript !== lastTranscript) {
        setInput(input + cleanedTranscript.slice(lastTranscript.length));
        setLastTranscript(cleanedTranscript);
      }
    }, 800);
  }, [transcript, input, setInput, lastTranscript]);

  return (
    <>
      <div className="m-8">
        <div className="relative bottom-0 left-0 flex  flex-row items-center h-18 bg-white w-full px-4 p-6">
          <div className="flex-grow ml-4 mr-4 flex flex-col  lg:flex-row">
            <div className=" w-full" title="Type a prompt">
              <input
                type="text"
                maxLength={500}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Pošalji poruku"
                className="flex w-full rounded-xl focus:outline-none focus:border-blue pl-4 h-10"
              />
            </div>
            {/* <InputPicture fileExtension={'.jpg, .jpeg, .png'}/> */}
            
          </div>
          
          <button
            className={
              isListening
                ? 'flex items-center justify-center text-blue ml-4'
                : 'flex items-center justify-center text-black ml-4'
            }
            onClick={handleToggleListening}
            title={isListening ? 'Turn Off Mic' : 'Turn On Mic'}>
            {!isListening ? <img src={micOn} alt="micOn" /> : <img src={micOff} alt="micOff" />}
          </button>
          <div className="ml-4">
            <button
              className="flex items-center justify-center bg-blue hover:bg-blue rounded-xl text-white px-2 py-1 flex-shrink-0"
              title={isSending ? 'Slanje...' : 'Poruka poslata '}
              onClick={handleMessageSubmit}
              disabled={isSending}>
              <span>
                <i className="bx bx-send "></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
