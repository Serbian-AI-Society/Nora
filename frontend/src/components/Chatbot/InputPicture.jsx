import { updateProfile } from "firebase/auth";
import { useRef, useState } from "react";
import { MdDriveFolderUpload } from "react-icons/md";

const InputPicture= ({handleUploadFile, fileExtension, uploadeBtnDisabled}) => {
    const fileInputRef = useRef();
    const [fileInfo, setFileInfo] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [uploadFile, setUploadFile] = useState('');

    const handleButtonClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.click();
        }
    }

    const handleFileInputChange = (e) => {
        console.log('handle')
        const {files} = e.target;
        if(files){
            handlesFiles(files)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const {files} = e.dataTransfer;
        handlesFiles(files)
    }

    const handlesFiles = (files) => {
        const uploadedFile = files[0];
        const fileSizeInKb = Math.round(uploadedFile.size /1024);
        console.log(uploadFile)
        // onChange(uploadedFile)

        //display file information
        setFileInfo(`${uploadedFile.name} (${fileSizeInKb}KB)`);
        setUploadFile(uploadedFile);
        setDisabledBtn(false)
    }   

    const handleUpload = () => {
        console.log(uploadFile);
        handleUploadFile(uploadFile);
    }
    return <div className="flex flex-col gap-3">
        <div className="w-fit h-10 rounded-xl border-2 border-grey-50 border-dashed flex flex-col items-center p-10 gap-3 hover:cursor-pointer justify-center"> 
            <MdDriveFolderUpload className="h-8 w-8 text-grey"/>
            <div className="text-grey-50" onDrop={handleDrop} onDragOver={handleDragOver}> Prevucite sliku ili <button className="font-semibold hover:text-black" onClick={handleButtonClick}> Kliknite ovde </button>  </div>
            <input ref={fileInputRef} type="file" accept={`${fileExtension}`} className="hidden" multiple onChange={handleFileInputChange}/>
            {fileInfo && <p className="text-mutes-foreground">{fileInfo}</p>}
        </div>
    </div>
    
}

export default InputPicture;