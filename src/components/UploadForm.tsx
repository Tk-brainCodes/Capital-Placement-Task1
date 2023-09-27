import { useState, useRef } from "react";
import { Upload, Delete } from "../assets/icons";

const UploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDelete = (): void => {
    setSelectedFile(null);
  };

  const handleSelectButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (selectedFile) {
      console.log("Selected File:", selectedFile);
    }
  };

  return (
    <div className='w-full lg:w-[595px] flex flex-col items-center h-auto shadow-form rounded-[20px]'>
      <div className='w-full bg-[#D0F7FA] px-[2em] text-[25px] font-semibold font-Poppins h-[77.437px] rounded-radius1 flex flex-col items-start justify-center'>
        Upload cover image
      </div>

      {selectedFile ? (
        <>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt='Selected'
            className='w-full max-h-96 object-contain mb-4'
          />
          <span
            onClick={handleDelete}
            className='text-[#A80000] cursor-pointer hover:text-red-300 transition ease-in-out font-Poppins text-[15px] -tracking-[0.09px] flex gap-3 items-center -ml-[23em] justify-start'
          >
            <img src={Delete} alt='detele' />
            Delete & re-upload
          </span>
        </>
      ) : (
        <div className='w-[512px] h-[210px] flex flex-col items-center justify-center shadow-formDashed  border border-black border-dashed rounded-lg mt-[4em] bg-white mb-[3em]'>
          <>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleFileChange}
              className='hidden'
            />
            <button
              type='button'
              onClick={handleSelectButtonClick}
              className=' black py-2 px-4 flex flex-col items-center justify-center font-Poppins font-semibold text-[14px]'
            >
              <img src={Upload} alt='upload' className='mb-[10px]' />
              Upload cover image
              <span className='font-normal text-[#979797]'>
                16:9 ratio is recommended. Max image size 1mb
              </span>
            </button>
          </>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleFileChange}
            className='hidden'
          />
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
