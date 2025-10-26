/**
 * Component properties interfaces
 */

export interface InputFieldProps {
  type: "text" | "email" | "password";
  getError?: (value: string) => string | null;
  value: string; // bindable
  isValid?: boolean; // bindable
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  noSpaces?: boolean;
  class?: string;
  id?: string;
}

export interface ObservationProps {
  id: number;
  declination: string;
  rightAscension: string;
  time: Date;
  photo?: File | null;
  photoPreview?: string;
}
