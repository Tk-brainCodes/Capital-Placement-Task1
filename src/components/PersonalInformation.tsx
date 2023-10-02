import { useState, useEffect } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import QuestionForm from "./shared/QuestionForm";
import { Switch } from "antd";
import { Plus } from "../assets/icons";
import axios from "axios";
import { QuestionType, FormState, FieldState } from "../types/form-types";

const initialFormData: FormState = {
  firstName: { internalUse: false, show: true },
  lastName: { internalUse: false, show: true },
  emailId: { internalUse: false, show: true },
  phoneNumber: { internalUse: false, show: true },
  nationality: { internalUse: false, show: true },
  currentResidence: { internalUse: false, show: true },
  idNumber: { internalUse: false, show: true },
  dateOfBirth: { internalUse: false, show: true },
  gender: { internalUse: false, show: true },
};

const fieldLabelMap: Record<keyof FormState, string> = {
  firstName: "First Name",
  lastName: "Last Name",
  emailId: "Email",
  phoneNumber: "Phone",
  nationality: "Nationality",
  currentResidence: "Current Residence",
  idNumber: "ID Number",
  dateOfBirth: "Date of Birth",
  gender: "Gender",
};

const PersonalInformation = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [savedQuestions, setSavedQuestions] = useState<QuestionType[]>([]);
  const [onOpenEdit, setOnOpenEdit] = useState<boolean>(false);

  const apiUrl =
    "http://127.0.0.1:4010/api/623.354286974459/programs/esse/application-form";

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

  const handleChange =
    (field: keyof FormState, property: keyof FieldState) =>
    (e: CheckboxChangeEvent | boolean) => {
      const updatedFieldState = { ...formData[field] };
      updatedFieldState[property] =
        typeof e === "boolean" ? e : e.target.checked;
      setFormData({ ...formData, [field]: updatedFieldState });

      const putData = {
        data: {
          id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
          type: "applicationForm",
          attributes: {
            personalInformation: {
              ...formData,
            },
            personalQuestions: [
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
            const updatedData =
              response.data.data.attributes.personalInformation;
            setFormData(updatedData);
          } else {
            console.error("Invalid response format:", response);
          }
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    };

  const getUpdatedFormData = async () => {
    await axios
      .get(
        "http://127.0.0.1:4010/api/671.7742181354413/programs/expedita/application-form"
      )
      .then((response) => response.data)
      .then((result) => {
        setFormData(result.data.attributes.personalInformation);
      })
      .catch((error) => {
        console.error("Error fetching initial data:", error);
      });
  };

  console.log("form data update:", formData);

  const handleShowQuestions = () => {
    setShowQuestions(true);
    setOnOpenEdit(false);
  };

  useEffect(() => {
    getUpdatedFormData();
  }, []);

  console.log("UPDATED FORM DATA", formData);

  return (
    <div className='w-[595px] mt-[4em] flex flex-col items-start h-auto shadow-form rounded-[20px]'>
      <div className='w-full bg-[#D0F7FA] px-[1em] text-[25px] font-semibold font-Poppins h-[77.437px] rounded-radius1 flex flex-col items-start justify-center'>
        Personal Information
      </div>

      <div className='px-[1em] py-3 flex flex-col items-start justify-start'>
        <form>
          {Object.keys(formData).map((field) => (
            <div
              className='w-[555px] flex border-b-2 border-grey-300 items-center justify-between  px-4 py-5'
              key={field}
            >
              <label className='font-semibold text-black text-[20px] font-Poppins'>
                {fieldLabelMap[field as keyof FormState]}
              </label>
              <div className='flex gap-[40px] '>
                <span className='flex gap-2 items-center justify-center'>
                  <Checkbox
                    type='checkbox'
                    name={`${field}-internal`}
                    checked={formData[field as keyof FormState].internalUse}
                    onChange={handleChange(
                      field as keyof FormState,
                      "internalUse"
                    )}
                    className='w-[18px] h-[18px] bg-white rounded border border-slate-300'
                  />
                  <span>Internal</span>
                </span>
                <span className='flex gap-6 w-auto '>
                  <Switch
                    checked={formData[field as keyof FormState].show}
                    onChange={handleChange(field as keyof FormState, "show")}
                    className='border border-solid border-[#D4D9E4]'
                  />
                  <span>
                    {formData[field as keyof FormState].show ? "Show" : "Hide"}
                  </span>
                </span>
              </div>
            </div>
          ))}
        </form>

        <div className='px-[1em] py-[1em]'>
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

export default PersonalInformation;
