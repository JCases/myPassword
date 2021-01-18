import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from '../../../global';
import { User } from '../user/user.model';

@Injectable()
export class UserService {
  async get(): Promise<User[]>;
  async get(id: string): Promise<User>;
  async get(id?: string) {
    if (id) {
      return await User.findOne({
        where: { id },
        attributes: { exclude: ['deletedAt'] },
      });
    } else {
      return await User.findAll({
        attributes: { exclude: ['deletedAt'] },
      });
    }
  }
  async login(user: IUser) {
    const userDB = await User.findOne({
      where: { email: user.email!, idGoogle: user.idGoogle! },
      attributes: ['email', 'id'],
    });
    if (userDB) {
      const update = await userDB.update({ token: user.token });
      if (update) return userDB;
      throw new HttpException('Usuario incorrecto', HttpStatus.UNAUTHORIZED);
    } else {
      delete user.id;
      delete user.root;
      try {
        return User.create(user);
      } catch (e) {
        throw new HttpException(
          'No se ha podido crear el usuario',
          HttpStatus.NOT_ACCEPTABLE,
        );
      }
    }
  }

  async rehydrate(userToken: IUser) {
    if (userToken) {
      const user = await User.findByPk(userToken.id, {
        attributes: { exclude: ['deletedAt'] },
      });

      if (user) return user;
      throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
    }
    throw new HttpException('No estás logueado', HttpStatus.UNAUTHORIZED);
  }
}
