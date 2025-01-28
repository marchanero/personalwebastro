import fs from 'fs';
import path from 'path';

const filePath = path.resolve('scholarPublications.json');

const readData = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const ScholarPublication = {
  findAll: () => {
    return readData();
  },
  findOne: (options) => {
    const data = readData();
    if (options.order) {
      const [field, direction] = options.order[0];
      data.sort((a, b) => (direction === 'DESC' ? b[field] - a[field] : a[field] - b[field]));
    }
    return data[0] || null;
  },
  bulkCreate: (newPublications) => {
    const data = readData();
    writeData([...data, ...newPublications]);
  },
  update: (updateData, options) => {
    const data = readData();
    const updatedData = data.map((item) => {
      if (item.title === options.where.title) {
        return { ...item, ...updateData };
      }
      return item;
    });
    writeData(updatedData);
  }
};

export default ScholarPublication;