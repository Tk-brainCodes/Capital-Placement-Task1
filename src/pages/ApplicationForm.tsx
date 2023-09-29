import UploadForm from "../components/UploadForm";
import PersonalInformation from "../components/PersonalInformation";

const ApplicationForm = () => {
  return (
    <div className='w-full ml-0 lg:ml-[10em] mb-[2em] mt-[6em]'>
      <UploadForm />
      <PersonalInformation />
    </div>
  );
};

export default ApplicationForm;
