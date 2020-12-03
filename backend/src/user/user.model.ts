import { DataTypes } from 'sequelize';
import { BaseModel } from '../shared/model';
import { IUser } from '../../../global';
import { db } from '../db';

export class User extends BaseModel<IUser> implements IUser {
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public token!: string;

  public root!: boolean;
  public isLogged!: Date;

  public appVersion!: string;
  public appBuild!: string;
  public operatingSystem!: string;
  public osVersion!: string;
  public platform!: string;
  public model!: string;
  public manufacturer!: string;
  public uuid!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, unique: true },
    token: { type: DataTypes.STRING, unique: true },

    isLogged: { type: DataTypes.DATE },
    root: { type: DataTypes.BOOLEAN, defaultValue: false },

    appVersion: { type: DataTypes.STRING },
    appBuild: { type: DataTypes.STRING },
    operatingSystem: { type: DataTypes.STRING },
    osVersion: { type: DataTypes.STRING },
    platform: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    manufacturer: { type: DataTypes.STRING },
    uuid: { type: DataTypes.STRING },
  },
  {
    sequelize: db.sequelize,
    paranoid: true,
    timestamps: true,
  },
);
