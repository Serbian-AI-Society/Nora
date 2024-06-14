import { CiUser } from "react-icons/ci";
import { formaterService } from "../services/helper";
import { IoCopyOutline } from "react-icons/io5";

const UserMessage = ({message, handleCopyToClipboard}) => {
    return <div className=" gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-3 md:py-6 flex ">

            <div className="w-[30px] flex flex-col relative items-end">
                <div
                  className="relative h-[30px] w-[30px] p-1 rounded-sm text-blue flex items-center justify-center cursor-pointer"
                  onClick={() => handleCopyToClipboard(message.text)}>
                  <IoCopyOutline/>
                </div>
              </div>

            <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                <div className="flex flex-grow flex-col gap-3">
                    <div className="min-h-[20px] flex flex-col justify-end gap-4 whitespace-pre-wrap">
                    <div className="markdown prose w-full break-words dark:prose-invert dark ">
                        <p className="text-sm text-right ">{formaterService.formatText(message.text)}</p>
                    </div>
                    </div>
                </div>
                </div>
                <div className="w-[30px] flex flex-col relative items-end">
                <div className="relative h-[30px] w-[30px] p-1 bg-grey rounded-2xl text-white flex items-center justify-center">
                    <CiUser className="text-blue"/>
                </div>
                </div>



            </div>
}

export default UserMessage;


