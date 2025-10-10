import prisma from "../prisma/client.js";

class WellnessRepository {
    async create(data) {
        return await prisma.wellness.create({ data });
      }
    
      async findAll() {
        return await prisma.wellness.findMany();
      }
    
      async findById(id) {
        return await prisma.wellness.findUnique({
          where: { id },
        });
      }
    
      async update(id, data) {
        return await prisma.wellness.update({
          where: { id },
          data,
        });
      }
    
      async delete(id) {
        return await prisma.wellness.delete({
          where: { id },
        });
      }
}

export default new WellnessRepository();