class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async getById(id) {
    const doc = await this.repository.findById(id);
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  async getAll(query = {}) {
    return await this.repository.find(query);
  }

  async update(id, data) {
    const doc = await this.repository.updateById(id, data);
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  async delete(id) {
    const doc = await this.repository.deleteById(id);
    if (!doc) throw new Error('Document not found');
    return doc;
  }
}

module.exports = BaseService;
