import { useState } from "react";
import { Checkbox, Switch } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { Plus } from "../assets/icons";
import { QuestionType } from "../types/form-types";
import QuestionForm from "./shared/QuestionForm";
import axios from "axios";

interface Profile {
  education: { mandatory: boolean; show: boolean };
  experience: { mandatory: boolean; show: boolean };
  resume: { mandatory: boolean; show: boolean };
}

const Profile = () => {
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [savedQuestions, setSavedQuestions] = useState<QuestionType[]>([]);
  const [onOpenEdit, setOnOpenEdit] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    education: {
      mandatory: true,
      show: true,
    },
    experience: {
      mandatory: true,
      show: true,
    },
    resume: {
      mandatory: true,
      show: true,
    },
  });
  const apiUrl =
    "http://127.0.0.1:4010/api/623.354286974459/programs/esse/application-form";

  const handleMandatoryChange =
    (field: keyof Profile) => (e: CheckboxChangeEvent) => {
      setProfile({
        ...profile,
        [field]: {
          ...profile[field],
          mandatory: e.target.checked,
        },
      });
    };

  const handleShowChange = (field: keyof Profile) => (checked: boolean) => {
    setProfile({
      ...profile,
      [field]: {
        ...profile[field],
        show: checked,
      },
    });

    const putData = {
      atrributes: {
        profile: {
          ...profile,
          profileQuestions: [
            savedQuestions?.map((question) => ({
              id: question.id,
              type: question.type,
              question: question.question,
              choices: question.choices,
              maxChoice: question.maxChoice || 0,
              disqualify: false,
              other: false,
            })),
          ],
        },
      },
    };

    axios
      .put(apiUrl, putData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (
          response.data &&
          response.data.data &&
          response.data.data.attributes
        ) {
          const updatedData = response.data.data.attributes.personalInformation;
          setSavedQuestions(updatedData);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const onSaveQuestion = (question: QuestionType) => {
    setSavedQuestions([...savedQuestions, question]);
  };

  const onUpdateQuestion = (updatedQuestion: QuestionType) => {
    const updatedQuestions = [...savedQuestions];
    const index = updatedQuestions.findIndex(
      (question) => question.id === updatedQuestion.id
    );
    if (index !== -1) {
      updatedQuestions[index] = updatedQuestion;
      setSavedQuestions(updatedQuestions);
    }
  };

  const handleShowQuestions = (): void => {
    setShowQuestions(true);
  };

  console.log("UPDATED QUESTION:", savedQuestions);

  return (
    <div className='w-[595px] mt-[4em] flex flex-col items-start h-auto shadow-form rounded-[20px]'>
      <div className='w-full bg-[#D0F7FA] px-[1em] text-[25px] font-semibold font-Poppins h-[77.437px] rounded-radius1 flex flex-col items-start justify-center'>
        Profile
      </div>

      <div className='w-[595px] mb-[2em] px-[0.8em]'>
        <div className='w-full border-b-2 border-grey-300 px-4 py-5 flex items-center justify-between'>
          <h3 className='font-semibold text-black text-[20px] font-Poppins'>
            Education
          </h3>
          <span className='flex gap-4'>
            <Checkbox
              checked={profile.education.mandatory}
              onChange={handleMandatoryChange("education")}
              className='text-[15px] font-Poppins font-normal text-black'
            >
              Mandatory
            </Checkbox>
            <div className='flex gap-2 text-[#666666] font-[16px]'>
              <Switch
                checked={profile.education.show}
                onChange={handleShowChange("education")}
              />
              {profile.education.show ? "Show" : "Hide"}
            </div>
          </span>
        </div>
        <div className='w-full flex border-b-2 border-grey-300 px-4 py-5 items-center justify-between'>
          <h3 className='font-semibold text-black text-[20px] font-Poppins'>
            Experience
          </h3>
          <span className='flex gap-4 '>
            <Checkbox
              checked={profile.experience.mandatory}
              onChange={handleMandatoryChange("experience")}
              className='text-[15px] font-Poppins font-normal text-black'
            >
              Mandatory
            </Checkbox>
            <div className='flex gap-2'>
              <Switch
                checked={profile.experience.show}
                onChange={(checked) => handleShowChange("experience")(checked)}
              />
              {profile.experience.show ? "Show" : "Hide"}
            </div>
          </span>
        </div>
        <div className='w-full flex px-4 py-5 items-center justify-between'>
          <h3 className='font-semibold text-black text-[20px] font-Poppins'>
            Resume
          </h3>
          <span className='flex gap-4'>
            <Checkbox
              checked={profile.resume.mandatory}
              onChange={(checked) => handleMandatoryChange("resume")(checked)}
              className='text-[15px] font-Poppins font-normal text-black'
            >
              Mandatory
            </Checkbox>
            <div className='flex gap-2'>
              <Switch
                checked={profile.resume.show}
                onChange={(checked) => handleShowChange("resume")(checked)}
                className='border border-solid border-[#D4D9E4]'
              />
              {profile.resume.show ? "Show" : "Hide"}
            </div>
          </span>
        </div>
      </div>

      <div className='px-[2em] py-[1em]'>
        <QuestionForm
          showQuestions={showQuestions}
          handleShowQuestions={handleShowQuestions}
          savedQuestions={savedQuestions}
          onSaveQuestion={onSaveQuestion}
          onUpdateQuestion={onUpdateQuestion}
          onOpenEdit={onOpenEdit}
          setOnOpenEdit={setOnOpenEdit}
          setShowQuestions={setShowQuestions}
        />
      </div>

      <span
        onClick={handleShowQuestions}
        className='flex relative mb-[3em] px-[1.5em] font-semibold font-Poppins -leading-[0.09px] text-[15px] cursor-pointer hover:text-gray-600 transition ease-in-out items-center justify-between gap-3'
      >
        <img
          src={Plus}
          alt='add new question'
          className='w-[23.785px] h-[24px]'
        />
        Add a question
      </span>
    </div>
  );
};

export default Profile;
