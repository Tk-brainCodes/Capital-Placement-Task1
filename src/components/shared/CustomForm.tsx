/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Input, Select, InputNumber, Checkbox } from "antd";
import { Plus, DeleteRed, Options } from "../../assets/icons";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const CustomForm = ({
  handleTypeChange,
  selectedType,
  questions,
  setQuestions,
  additionalChoices,
  handleChoiceChange,
  maxChoices,
  handleAddChoice,
  onChangeCheckbox,
  handleSetMaxChoice,
  onReset,
  onFinish,
  formRef,
  save,
}: any) => {
  return (
    <>
      <Form
        className='w-full'
        {...layout}
        ref={formRef}
        name='control-ref'
        onFinish={onFinish}
        wrapperCol={{ span: 12 }}
      >
        <span className='font-semibold font-Poppins text-[20px] mt-[1em]'>
          Type
        </span>
        <Form.Item name='Type'>
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
            onChange={handleTypeChange}
            value={selectedType}
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
        <Form.Item name='Paragraph'>
          <Input
            placeholder='Type here'
            className='w-[537px] h-[50px] mt-[1em] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]'
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </Form.Item>

        {selectedType === "Video question" && (
          <>
            <Form.Item name='AdditionalInformation'>
              <Input
                className='w-[537px] h-[50px] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]'
                placeholder='Additional information'
              />
            </Form.Item>
            <div className='w-[537px] flex items-center gap-6'>
              <Form.Item name='MaxDuration'>
                <Input
                  className='w-[280px] h-[50px] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]'
                  placeholder='Max duration of video'
                />
              </Form.Item>
              <Form.Item name='SelectMinutes'>
                <Select
                  placeholder='in (sec / min)'
                  style={{
                    width: "233px",
                    border: "1px solid black",
                    height: "50px",
                    borderRadius: "5px",
                  }}
                  className='font-Poppins text-[#979797] hover:bg-[#9C4DE2] text-[15px]'
                  allowClear
                >
                  <Option value='Minutes'>Minutes</Option>
                  <Option value='Seconds'>Seconds</Option>
                </Select>
              </Form.Item>
            </div>
          </>
        )}

        {selectedType === "Multiple choice" && (
          <>
            <span className='font-semibold font-Poppins text-[20px] mt-[1em] px-[2.6em]'>
              Choice
            </span>
            {additionalChoices.map((choice: any, index: number) => (
              <div className='flex items-center justify-around' key={index}>
                <span className='mt-[1em] cursor-pointer'>
                  <img
                    src={Options}
                    alt='options'
                    className='w-[24px] h-[24px]'
                  />
                </span>
                <Input
                  className='w-[441px] h-[50px] mt-[1em] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]'
                  placeholder='Type here'
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <span
                  className='mt-[1em] cursor-pointer'
                  onClick={
                    additionalChoices.length < maxChoices
                      ? handleAddChoice
                      : undefined
                  }
                >
                  <img
                    src={Plus}
                    alt='add choice'
                    className='w-[13px] h-[13.117px]'
                  />
                </span>
              </div>
            ))}
            {additionalChoices.length < maxChoices && (
              <div className='flex items-center justify-around'>
                <span className='mt-[1em] cursor-pointer'>
                  <img
                    src={Options}
                    alt='options'
                    className='w-[24px] h-[24px]'
                  />
                </span>
                <Input
                  className='w-[441px] h-[50px] mt-[1em] rounded-[5px] border-solid border-[#A0A0A0] font-Poppins text-[#979797] text-[15px]'
                  placeholder='Type here'
                />
                <span
                  className='mt-[1em] cursor-pointer'
                  onClick={
                    additionalChoices.length < maxChoices
                      ? handleAddChoice
                      : undefined
                  }
                >
                  <img
                    src={Plus}
                    alt='add choice'
                    className='w-[13px] h-[13.117px]'
                  />
                </span>
              </div>
            )}
            <span className='flex gap-2 items-start justify-start ml-[1em] mb-[2em] mt-[2em]'>
              <Checkbox type='checkbox' onChange={onChangeCheckbox} />
              <span>Enable “Other” option</span>
            </span>
            <span className='font-semibold font-Poppins text-[20px]'>
              Max choice allowed
            </span>
            <InputNumber
              min={0}
              value={maxChoices}
              className='w-[537px] h-[50px] mt-[1em] rounded-[5px] border-solid border-[#000] font-Poppins text-[#979797] text-[15px]'
              placeholder='Enter number of choices allowed here'
              onChange={handleSetMaxChoice}
            />
          </>
        )}

        <div
          {...tailLayout}
          className='flex items-center justify-between mt-[3em] mb-[1em]'
        >
          <span
            className='flex cursor-pointer hover:text-red-900 items-center gap-3 text-[#A80000] font font-semibold font-Poppins text-[15px]'
            onClick={onReset}
          >
            <img src={DeleteRed} alt='delete' /> Delete question
          </span>
          <button
            color='#fff'
            className='px-3 py-2 hover:text-white rounded-[5px] hover:bg-green-900 bg-[#087B2F] text-white flex items-center justify-center font-semibold font-Poppins text-[15px]'
            type='submit'
            onClick={save}
          >
            Save
          </button>
        </div>
      </Form>
    </>
  );
};

export default CustomForm;
