const faker = require('faker')
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
      this.categories = [];
      this.generate();
  }

  generate() {
    const limit = 5;
      for (let index = 0; index < limit; index++) {
        this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

    async create(data) {
        const newCategory = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.categories.push(newCategory)
        return newCategory;
    }



    find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.categories);
            }, 3000);
        })
    }

    async findOne(id) {
        const category = this.categories.find(item => item.id === id)
        if (!category) {
          throw boom.notFound('Categorie notFound');
        }
        if (category.isBLock ) {
          throw boom.conflict('Categoria block');
        }
        return category;
    }

    async update(id, changes) {
        const index = this.categories.findIndex(item => item.id === id);
        if (index === -1) {
          throw boom.notFound('Category notFound');
        }
        const category = this.categories[index];
        this.categories[index] = {
            ...category,
            ...changes
        };
        return this.categories[index];
    }


    async delete(id) {
        const index = this.categories.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Category notFound');
        }
        this.categories.splice(index, 1);
        return { id };
    }
}

module.exports = CategoriesService;
