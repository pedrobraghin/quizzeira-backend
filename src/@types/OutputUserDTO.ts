import InputUserDTO from "./InputUserDTO";

export interface OutputUserDTO extends InputUserDTO {
  _id: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}
