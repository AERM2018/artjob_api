const fs = require('fs');
const path = require('path');
module.exports = (imageUrl) => {
  const imageName = imageUrl.split('/').pop();
  fs.unlinkSync(path.join(process.cwd(), 'src', 'domain', 'uploads', imageName));
};
