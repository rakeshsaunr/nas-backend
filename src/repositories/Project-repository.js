const Project = require("../models/project-model");

class ProjectRepository {
  async create(data) {
    return await Project.create(data);
  }

  async getAll({ category, ord } = {}) {
    const query = {};

    if (typeof category === "string" && category.trim()) {
      query.category = category.trim();
    }

    if (typeof ord === "string" && ord.trim()) {
      query.or = ord.trim();
    }

    return await Project.find(query).sort({
      createdAt: -1,
    });
  }

  async findById(id) {
    return await Project.findById(id);
  }

  async getById(id) {
    return await this.findById(id);
  }

  async delete(id) {
    return await Project.findByIdAndDelete(id);
  }

  async update(id, data) {
    return await Project.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}

module.exports = ProjectRepository;