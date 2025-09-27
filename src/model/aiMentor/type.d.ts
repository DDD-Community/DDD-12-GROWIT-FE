export interface AIMentorAdvice {
  isChecked: boolean;
  message: string;
  kpt: {
    keep: string;
    problem: string;
    tryNext: string;
  };
}
