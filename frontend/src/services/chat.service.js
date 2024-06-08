import axios from 'axios';

export async function sendMessageToServer(message) {
  const messages = localStorage.getItem('messages')
    ? JSON.parse(localStorage.getItem('messages'))
      .filter((message) => message.isUser)
      .slice(-2)
    : new Array();

  const ai_messages = localStorage.getItem('messages')
  ? JSON.parse(localStorage.getItem('messages'))
  .filter((message) => message.isAnswer)
  .slice(-2) : new Array()



  let lastThreeMessages = messages.map((message) => message.text);
  lastThreeMessages.reverse().unshift(message);

  let lastTwoAiMessages = ai_messages.map((message) => message.text);
  lastTwoAiMessages.reverse().unshift(message);

  const payload = {
    question_asked1: lastThreeMessages[2] ?? '',
    question_asked2: lastThreeMessages[1] ?? '',
    question_asked3: lastThreeMessages[0] ?? '',
    phonenumber: import.meta.env.VITE_REACT_APP_PHONE_NUMBER,
    answer1: lastTwoAiMessages[2] ?? '',
    answer2: lastTwoAiMessages[1] ?? ''
  };

  console.log(JSON.stringify(payload))

  if (message.length > 500) {
    throw new Error('Limit is 500 characters per prompt');
  } else {
    const { data } = await axios.post('https://docker-nn-test-cc.dsvm3.dunavnet.eu/process_question_nova', payload);

    return data.answer;
  }
}
