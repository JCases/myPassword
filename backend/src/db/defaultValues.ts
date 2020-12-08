import { User } from '../user/user.model';
import { PROD } from '../app.constants';
import { IUser } from '../../../global';
import { Op } from 'sequelize';
import * as faker from 'faker';

export const setDefaultValues = async () => {
  if (!PROD) {
    const create = await User.findOrCreate({
      where: {
        name: 'Javier Cases Sempere',
        email: 'javi@',
        phoneNumber: '601001638',
        image:
          'https://lh3.googleusercontent.com/a-/AOh14GhmbaJwqIABNe6psMxxRVz6zLglnwoEQAqI3kvMRQ=s96-c',
        idGoogle: '117160238503177117957',
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
          name: faker.name.firstName(),
          email: faker.internet.email().toLocaleLowerCase(),
          phoneNumber: faker.phone.phoneNumber(),
          image: faker.image.avatar(),
          idGoogle: faker.random.uuid(),
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
