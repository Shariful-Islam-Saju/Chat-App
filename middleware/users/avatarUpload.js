import { uploder } from "../../utilities/singleFileUploader";

export default function fileUpload(req, res, next) {
  const upload = uploder(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    100 * 1024 * 1024,
    "Only .jpg ,  .jpeg , .png files are allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        error: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next()
    }
  });
}
