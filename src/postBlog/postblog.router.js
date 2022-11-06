const { Router } = require("express");
const { authentication } = require("../Middleware/authentication");
const { authorization } = require("../Middleware/authorization");
const { PostBlogModel } = require("./postblog.model");
var geoip = require('geoip-lite');
const dns = require('node:dns');

const app = Router();

app.get("/all_blogs", authentication, async (req, res) => {
  // const {title,description}=req.body;
  const get_all_blogs = await PostBlogModel.find(
    {},
    { title: 1, description: 1 }
  );
  res.send(get_all_blogs);
});

app.get(
  "/blog",
  authentication,
  authorization(["writer"]),
  async (req, res) => {
    const { user_id } = req.body;
    try {
      const post = await PostBlogModel.find({ user_id });
      res.send(post);
    } catch (err) {
      res.send(err);
    }
  }
);

app.post(
  "/blog",
  authentication,
  authorization(["writer"]),
  async (req, res) => {
    const { title, description } = req.body;
    const userId = req.body.user_id;
   
      // console.log('address: %j family: IPv%s', address, family);
   
    try {
      const post = new PostBlogModel({
        title,
        description,
        user_id: userId,
   
      });
      await post.save();
      res.send({ msg: "Blog created successfully" });
    } catch (err) {
      res.send(err);
    }
  }
  
    
  
  
);

app.patch(
  "/blog/:id",
  authentication,
  authorization(["writer"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const updateBlog = await PostBlogModel.updateOne(
        { _id: id },
        { $set: req.body }
      );
      res.send({ mag: "Updated blog", updateBlog });
    } catch (err) {
      res.send(err);
    }
  }
);

app.delete(
  "/blog/:id",
  authentication,
  authorization(["writer"]),
  async (req, res) => {
    const { id } = req.params;
    try {
      const deletingBlog = await PostBlogModel.deleteOne(
        { _id: id }
      );
      res.send({ mag: "Deleted blog", deletingBlog });
    } catch (err) {
      res.send(err);
    }
  }
);

app.delete(
  "/blog/:user_id",
  authentication,
  authorization(["writer"]),
  async (req, res) => {
    const { user_id } = req.params;
    try {
      const deletingBlog = await PostBlogModel.remove({ user_id });
      res.send({ mag: "Deleted blog", deletingBlog });
    } catch (err) {
      res.send(err);
    }
  }
);

module.exports = app;
