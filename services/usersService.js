const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {
    constructor() {
        this.users = [];
        this.generate();
    }

    generate() {
        const limit = 10;
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: faker.datatype.uuid(),
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                isBlock: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        const newUser = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.users.push(newUser)
        return newUser;
    }

    find() {
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
               resolve(this.users)
            }, 3000);
        })
    }

    async findOne(id){
      const user = this.users.find(item => item.id === id)
      if (!user) {
        throw boom.notFound('User notFound');
      }
      if (user.isBlock) {
        throw boom.conflict('User is block');
      }
      return user;
    }

    async update(id, changes) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('User notFound');
        }
        //preguntar
        const user = this.users[index];
        this.users[index] = {
            ...user,
            ...changes
        };
        return this.users[index];
    }

    async delete(id) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('User notFound');
        }
        this.users.splice(index, 1);
        return{id};
    }
}

module.exports = UsersService;
