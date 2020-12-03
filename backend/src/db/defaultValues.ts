import { User } from '../user/user.model';
import { PROD } from '../app.constants';
import { IUser } from '../../../global';
import { Op } from 'sequelize';
import * as faker from 'faker';

export const setDefaultValues = async () => {
  if (!PROD) {
    const create = await User.findOrCreate({
      where: {
        firstName: 'Javier',
        lastName: 'Cases Sempere',
        email: 'javi@',
        token: 'test',
        root: true,
      },
    });
    const javi = create[0];

    let users: User[];

    if ((await User.count()) === 1) {
      const usersToCreate: IUser[] = [];
      for (let i = 0; i < 4; i++) {
        usersToCreate.push({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email().toLocaleLowerCase(),
          token: faker.random.uuid(),
        });
      }

      users = await User.bulkCreate(usersToCreate);
    } else {
      users = await User.findAll({
        where: {
          email: { [Op.notIn]: ['javi@'] },
        },
      });
    }

    return [javi, ...users];
  }
};
