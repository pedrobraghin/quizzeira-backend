export interface UserName {
  first: string;
  last: string;
}

export default interface InputUserDTO {
  name: UserName;
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  accessLevel: number;
  img?: {
    src: string;
  };
}
