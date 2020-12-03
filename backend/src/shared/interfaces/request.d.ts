import { IUser } from '../../../../global';

export interface IRequest extends Request {
  user: IUser;
}
