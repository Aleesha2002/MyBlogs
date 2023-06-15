const Post = require("../models/Post");
const Cloudinary = require("../utils/cloudinary");

exports.image_upload = async (req, res, next) => {
  const { title, username, desc, photo, categories } = req.body;
  try {
    const result = await Cloudinary.uploader.upload(image, {
      folder: Posts_images,
      // width:300,
      // crop:"scale"
    });
    const post = await Post.create({
      photo: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
