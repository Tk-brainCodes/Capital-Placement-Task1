import { useState, useRef } from "react";
import { EditPencil, Plus } from "../../assets/icons";
import { QuestionType } from "../../types/form-types";
import CustomForm from "./CustomForm";
import type { FormInstance } from "antd/es/form";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import axios from "axios";

const initialState: QuestionType[] = [
  {
    question: "Please tell me about yourself in less than 500 words",
    type: "paragraph",
    id: "",
    choices: [],
  },
  {
    question: "Please select the year of graduation from the list below",
    type: "Multiple choice",
    id: "",
    choices: [],
  },
  {
    question: "Have you ever been rejected by the UK embassy?",
    type: "Yes/No question",
    id: "",
    choices: [],
  },
];
const AdditionalQuestions = () => {
  const [savedQuestions, setSavedQuestions] =
    useState<QuestionType[]>(initialState);
  const [onOpenEdit, setOnOpenEdit] = useState<boolean>(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const formRef = useRef<FormInstance>(null);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [questions, setQuestions] = useState<string>("");
  const [additionalChoices, setAdditionalChoices] = useState<string[]>([]);
  const [maxChoices, setMaxChoices] = useState<number>(5);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);

  const findQuestionByType = (typeToFind: string) => {
    return savedQuestions.find((question) => question.type === typeToFind);
  };

  const resetForm = () => {
    formRef.current?.resetFields();
    setSelectedType(undefined);
    setQuestions("");
    setEditingIndex(null);
    setAdditionalChoices([]);
    setMaxChoices(5);
    setSelectedType(undefined);
  };

  const onFinish = (values: string | number) => {
    console.log(values);
    if (editingIndex !== null) {
      const updatedQuestion: QuestionType = {
        type: selectedType || "",
        question: questions,
        id: "",
        choices: [],
      };

      if (findQuestionByType(selectedType || "") === undefined) {
        onSaveQuestion(updatedQuestion);
      } else {
        onUpdateQuestion({ ...updatedQuestion, index: editingIndex });
      }

      setEditingIndex(null);
    } else {
      if (findQuestionByType(selectedType || "") === undefined) {
        const newQuestion: QuestionType = {
          type: selectedType || "",
          question: questions,
          id: "",
          choices: [],
        };
        onSaveQuestion(newQuestion);
      }
    }

    resetForm();
  };

  const onReset = () => {
    resetForm();
  };

  const onSaveQuestion = (question: QuestionType) => {
    setSavedQuestions([...savedQuestions, question]);
  };

  const onUpdateQuestion = (
    updatedQuestion: QuestionType & { index: number }
  ) => {
    const updatedQuestions = [...savedQuestions];
    updatedQuestions[updatedQuestion.index] = updatedQuestion;
    setSavedQuestions(updatedQuestions);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
  };

  const handleAddChoice = () => {
    if (additionalChoices.length < maxChoices) {
      const newChoices = [...additionalChoices, ""];
      setAdditionalChoices(newChoices);
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...additionalChoices];
    updatedChoices[index] = value;
    setAdditionalChoices(updatedChoices);
  };

  const onChangeCheckbox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleSetMaxChoice = (value: number | null) => {
    setMaxChoices(value || 0);
  };

  const handleEditQuestion = (index: number) => {
    const questionToEdit = savedQuestions[index];
    setSelectedType(questionToEdit.type);
    setQuestions(questionToEdit.question);
    setEditingIndex(index);
    setOnOpenEdit(!onOpenEdit);
  };

  const handleShowQuestions = (): void => {
    setShowQuestions(true);
    setOnOpenEdit(false);
  };

  const saveQuestionsToServer = async () => {
    const endpoint =
      "http://127.0.0.1:4010/api/623.354286974459/programs/esse/application-form";

    const customisedQuestions = {
      data: {
        attributes: {
          customisedQuestions: [
            savedQuestions.map((question) => ({
              id: `497f6eca-6276-4993-bfeb-53cbbbba6f08`,
              type: question.type,
              question: question.question,
              choices: [],
              maxChoice: 0,
              disqualify: false,
              other: false,
            })),
          ],
        },
      },
    };

    try {
      const response = await axios.put(endpoint, {
        customisedQuestions,
      });
      setSavedQuestions(response.data);
      if (response.status === 200) {
        console.log("Questions saved successfully!");
      } else {
        console.error("Failed to save questions:", response.status);
      }
    } catch (error) {
      console.error("An error occurred while saving questions:", error);
    }
  };

  return (
    <>
      <div className='w-[595px] mt-[4em] flex flex-col items-start h-auto shadow-form rounded-[20px]'>
        <div className='w-full bg-[#D0F7FA] px-[1em] text-[25px] font-semibold font-Poppins h-[77.437px] rounded-radius1 flex flex-col items-start justify-center'>
          Personal Information
        </div>
        <div className='mt-[2em] ml-[1.5em]'>
          {savedQuestions
            ? savedQuestions.map((question: QuestionType, index: number) => (
                <>
                  <div
                    key={`${index + 1}`}
                    className='w-[555px] mt-[1em] border-b-2 border-grey-300  flex flex-col items-start justify-start'
                  >
                    <span className='text-neutral-400 text-sm font-medium font-Poppins leading-snug'>
                      {question.type}
                    </span>
                    <div className=' w-full flex items-center justify-between mt-[5px] mb-[20px]'>
                      <span className=' text-black text-[20px] font-semibold font-Poppins leading-snug'>
                        {question.question}
                      </span>
                      <span
                        className='cursor-pointer flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-slate-300 transition ease-in-out'
                        onClick={() => {
                          handleEditQuestion(index);
                          setShowQuestions(false);
                        }}
                      >
                        <img src={EditPencil} alt='edit' />
                      </span>
                    </div>
                    {onOpenEdit && editingIndex === index && (
                      <CustomForm
                        handleTypeChange={handleTypeChange}
                        selectedType={selectedType}
                        questions={questions}
                        setQuestions={setQuestions}
                        additionalChoices={additionalChoices}
                        handleChoiceChange={handleChoiceChange}
                        maxChoices={maxChoices}
                        handleAddChoice={handleAddChoice}
                        onChangeCheckbox={onChangeCheckbox}
                        handleSetMaxChoice={handleSetMaxChoice}
                        onReset={onReset}
                        formRef={formRef}
                        onFinish={onFinish}
                        save={saveQuestionsToServer}
                      />
                    )}
                  </div>
                </>
              ))
            : ""}

          {showQuestions && (
            <CustomForm
              handleTypeChange={handleTypeChange}
              selectedType={selectedType}
              questions={questions}
              setQuestions={setQuestions}
              additionalChoices={additionalChoices}
              handleChoiceChange={handleChoiceChange}
              maxChoices={maxChoices}
              handleAddChoice={handleAddChoice}
              onChangeCheckbox={onChangeCheckbox}
              handleSetMaxChoice={handleSetMaxChoice}
              onReset={onReset}
              formRef={formRef}
              onFinish={onFinish}
              save={saveQuestionsToServer}
            />
          )}
        </div>
        <span
          onClick={handleShowQuestions}
          className='flex relative mb-[3em] mt-[2em] px-[1.5em] font-semibold font-Poppins -leading-[0.09px] text-[15px] cursor-pointer hover:text-gray-600 transition ease-in-out items-center justify-between gap-3'
        >
          <img
            src={Plus}
            alt='add new question'
            className='w-[23.785px] h-[24px]'
          />
          Add a question
        </span>
      </div>
    </>
  );
};

export default AdditionalQuestions;
