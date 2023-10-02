export interface FormData {
  [key: string]: {
    internalUse: boolean;
    show: boolean;
  };
}

export interface QuestionType {
  type: string;
  question: string;
}

export interface FieldState {
  internalUse: boolean;
  show: boolean;
}

export interface FormState {
  firstName: FieldState;
  lastName: FieldState;
  emailId: FieldState;
  phoneNumber: FieldState;
  nationality: FieldState;
  currentResidence: FieldState;
  idNumber: FieldState;
  dateOfBirth: FieldState;
  gender: FieldState;
}

export interface QuestionType {
  id: string;
  type: string;
  question: string;
  choices: string[];
  maxChoice?: number;
  disqualify?: boolean;
  other?: boolean;
  index?: number;
}
