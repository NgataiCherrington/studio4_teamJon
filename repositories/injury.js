import prisma from "../prisma/client.js";

class InjuryRepository {
    async create(data) {
        return await prisma.injury.create({ data });
      }
    
      async findAll() {
        return await prisma.injury.findMany();
      }
    
      async findById(id) {
        return await prisma.injury.findUnique({
          where: { id },
        });
      }
    
      async update(id, data) {
        return await prisma.injury.update({
          where: { id },
          data,
        });
      }
    
      async delete(id) {
        return await prisma.injury.delete({
          where: { id },
        });
      }
}

export default new InjuryRepository();