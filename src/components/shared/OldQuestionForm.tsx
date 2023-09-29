import { useRef } from "react";
import { Form, Input, Select } from "antd";
import type { FormInstance } from "antd/es/form";
import { DeleteRed, Plus } from "../../assets/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface QuestionProp {
  showQuestions: boolean;
  handleShowQuestions: () => void;
}

const QuestionForm = ({ showQuestions, handleShowQuestions }: QuestionProp) => {
  const formRef = useRef<FormInstance>(null);

  const onFinish = (values: string | number) => {
    console.log(values);
  };

  const onReset = () => {
    formRef.current?.resetFields();
  };

  return (
    <>
      {showQuestions && (
        <Form
          className='w-full'
          {...layout}
          ref={formRef}
          name='control-ref'
          onFinish={onFinish}
        >
          <span className='font-semibold font-Poppins text-[20px] mt-[1em]'>
            Type
          </span>
          <Form.Item rules={[{ required: true }]}>
            <Select
              placeholder='Select an option'
              style={{
                width: "537px",
                border: "1px solid black",
                height: "50px",
                borderRadius: "5px",
              }}
              className='font-Poppins text-[#979797] hover:bg-[#9C4DE2] text-[15px] mt-[1em]'
              allowClear
            >
              <Option value='Paragraph'>Paragraph</Option>
              <Option value='Short answer'>Short answer</Option>
              <Option value='Yes/No'>Yes/No</Option>
              <Option value='Dropdown'>Dropdown</Option>
              <Option value='Multiple choice'>Multiple choice</Option>
              <Option value='Date'>Date</Option>
              <Option value='Number'>Number</Option>
              <Option value='File upload'>File upload</Option>
              <Option value='Video question'>Video question</Option>
            </Select>
          </Form.Item>
          <span className='font-semibold font-Poppins text-[20px] mt-[1em]'>
            Question
          </span>
          <Form.Item name='Type'>
            <Input className='w-[537px] h-[50px] mt-[1em] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]' />
          </Form.Item>

          <div {...tailLayout} className='flex items-center justify-between'>
            <span
              className='flex cursor-pointer hover:text-red-900 items-center gap-3 text-[#A80000] font font-semibold font-Poppins text-[15px]'
              onClick={onReset}
            >
              <img src={DeleteRed} alt='delete' /> Delete question
            </span>
            <button
              color='#fff'
              className='px-3 py-2 hover:text-white rounded-[5px] hover:bg-green-900 bg-[#087B2F] text-white flex items-center justify-center font-semibold font-Poppins text-[15px]'
            >
              Save
            </button>
          </div>
        </Form>
      )}
      <span
        onClick={handleShowQuestions}
        className='flex relative mb-[3em] px-[1.5em] mt-[2em] font-semibold font-Poppins -leading-[0.09px] text-[15px] cursor-pointer hover:text-gray-600 transition ease-in-out items-center justify-between gap-3'
      >
        <img
          src={Plus}
          alt='add new question'
          className='w-[23.785px] h-[24px]'
        />
        Add a question
      </span>
    </>
  );
};

export default QuestionForm;
