import { uploder } from "../../utilities/singleFileUploader";

export default function fileUpload(req, res, next) {
  const upload = uploder(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    100000000,
    "Only .jpg ,  .jpeg , .png files are allowed"
  );
}
