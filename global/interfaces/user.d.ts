import { IBase } from './base';

export interface IUser extends IBase {
  email?: string;
  name?: string;
  phoneNumber?: string;

  image?: string;
  idGoogle?: string;

  token?: string;

  root?: boolean;
  isLogged?: Date | null;

  uuid?: string;
}
