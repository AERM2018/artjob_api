const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'src', 'domain', 'uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e2);
    const exention = file.originalname.split('.').pop();
    const image_url = file.fieldname + '-' + uniqueSuffix + '.' + exention;
    req.body.image_url = `${process.env.BASE_URL}/images/${image_url}`;
    cb(null, image_url);
  },
});
module.exports = multer({ storage });
