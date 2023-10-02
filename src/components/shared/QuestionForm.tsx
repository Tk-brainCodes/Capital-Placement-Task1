import { useRef, useState, useEffect } from "react";
import { EditPencil } from "../../assets/icons";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import type { FormInstance } from "antd/es/form";
import { QuestionType } from "../../types/form-types";
import CustomForm from "./CustomForm";

interface QuestionProp {
  showQuestions: boolean;
  handleShowQuestions: () => void;
  savedQuestions: QuestionType[];
  onSaveQuestion: (question: QuestionType) => void;
  onUpdateQuestion: (question: QuestionType) => void;
  onOpenEdit: boolean;
  setOnOpenEdit: (boolean: boolean) => void;
  setShowQuestions: (boolean: boolean) => void;
}

const QuestionForm = ({
  showQuestions,
  savedQuestions,
  onSaveQuestion,
  onUpdateQuestion,
  onOpenEdit,
  setOnOpenEdit,
  setShowQuestions,
}: QuestionProp) => {
  const formRef = useRef<FormInstance>(null);
  const [selectedType, setSelectedType] = useState<string | undefined>(
    undefined
  );
  const [additionalChoices, setAdditionalChoices] = useState<string[]>([]);
  const [maxChoices, setMaxChoices] = useState<number>(5);
  const [questions, setQuestions] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  useEffect(() => {
    if (onOpenEdit == true) {
      setShowQuestions(false);
    }
  }, [showQuestions, setShowQuestions]);

  const onReset = () => {
    resetForm();
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

  return (
    <>
      <div className='w-full'>
        {savedQuestions
          ? savedQuestions.map((question: QuestionType, index: number) => (
              <>
                <div
                  key={`${index + 1}`}
                  className='w-[555px] -ml-[1em] flex flex-col items-start justify-start'
                >
                  <span className='text-neutral-400 text-sm font-medium font-Poppins leading-snug'>
                    {question.type}
                  </span>
                  <div className=' w-full flex items-center justify-between mt-[5px] mb-[20px]'>
                    <span className=' text-black text-[20px] font-semibold font-Poppins leading-snug'>
                      {question.question}
                    </span>
                    <span
                      className='w-[40px] h-[40px]  flex items-center justify-center cursor-pointer rounded-full hover:bg-slate-300 transition ease-in-out'
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
          />
        )}
      </div>
    </>
  );
};

export default QuestionForm;
