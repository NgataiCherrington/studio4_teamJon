import prisma from "../prisma/client.js";

class TeamRepository {
    async create(data) {
        return await prisma.team.create({ data });
      }
    
      async findAll() {
        return await prisma.team.findMany();
      }
    
      async findById(id) {
        return await prisma.team.findUnique({
          where: { id },
        });
      }
    
      async update(id, data) {
        return await prisma.team.update({
          where: { id },
          data,
        });
      }
    
      async delete(id) {
        return await prisma.team.delete({
          where: { id },
        });
      }
}

export default new TeamRepository();