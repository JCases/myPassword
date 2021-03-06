import { DataTypes } from 'sequelize';
import { BaseModel } from '../shared/model';
import { IUser } from '../../../global';
import { db } from '../db';

export class User extends BaseModel<IUser> implements IUser {
  public email!: string;
  public name!: string;
  public phoneNumber!: string;

  public image!: string;
  public idGoogle!: string;

  public token!: string;

  public root!: boolean;
  public isLogged!: Date;

  public uuid!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    phoneNumber: { type: DataTypes.STRING },

    image: { type: DataTypes.STRING },
    idGoogle: { type: DataTypes.STRING, unique: true },

    token: { type: DataTypes.STRING, unique: true },

    isLogged: { type: DataTypes.DATE },
    root: { type: DataTypes.BOOLEAN, defaultValue: false },

    uuid: { type: DataTypes.STRING },
  },
  {
    sequelize: db.sequelize,
    paranoid: true,
    timestamps: true,
  },
);
