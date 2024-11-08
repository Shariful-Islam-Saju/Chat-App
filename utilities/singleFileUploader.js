import multer from "multer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import createError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function uploder(fileName, allowedTypes, maxSize, message) {
  const uploadPath = path.join(__dirname, "..", "public", "uploads", fileName);
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      try {
        const fileExt = path.extname(file.originalname);
        const fileName =
          file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "-" +
          Date.now() +
          fileExt;

        cb(null, fileName);
      } catch (error) {
        cb(error, null);
      }
    },
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter(req, file, cb) {
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(createError(message));
      }
      cb(null, true);
    },
  });

  return upload;
}
