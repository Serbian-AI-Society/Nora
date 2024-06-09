import Icon from '../../assets/Images/Icon.png';
import User from '../../assets/Images/User.png';
import { formaterService } from '../../services/helper';
const Chatmessage = ({ messages, handleCopyToClipboard }) => {
  return (
    <>
      {messages.map((message, index) => (
        <div
          className={
            message.isUser ? 'w-full text-black dark:text-grey-50' : 'w-full text-black dark:text-grey-50 bg-grey'
          }
          key={index}>
          <div className=" gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-3 md:py-6 flex lg:px-0">
            <div className="w-[30px] flex flex-col relative items-end">
              <div className="relative h-[30px] w-[30px] p-1 bg-grey rounded-2xl text-white flex items-center justify-center">
                <img alt={message.isUser ? 'You' : 'Nova'} src={message.isUser ? User : Icon} />
              </div>
            </div>

            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
              <div className="flex flex-grow flex-col gap-3">
                <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                  <div className="markdown prose w-full break-words dark:prose-invert dark ">
                    <p className="text-sm">{formaterService.formatText(message.text)}</p>
                  </div>
                </div>
              </div>
            </div>

            {!message.isUser ? (
              <div className="w-[30px] flex flex-col relative items-end">
                <div
                  className="relative h-[30px] w-[30px] p-1 rounded-sm text-blue flex items-center justify-center cursor-pointer"
                  onClick={() => handleCopyToClipboard(message.text)}>
                  <ion-icon name="copy-outline"></ion-icon>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </>
  );
};

export default Chatmessage;
