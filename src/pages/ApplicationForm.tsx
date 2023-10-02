import UploadForm from "../components/UploadForm";
import PersonalInformation from "../components/PersonalInformation";
import Profile from "../components/Profile";
import AdditionalQuestions from "../components/shared/AdditionalQuestions";

const ApplicationForm = () => {
  return (
    <div className='w-full ml-0 lg:ml-[10em] mb-[2em] mt-[6em]'>
      <UploadForm />
      <PersonalInformation />
      <Profile />
      <AdditionalQuestions />
    </div>
  );
};

export default ApplicationForm;
