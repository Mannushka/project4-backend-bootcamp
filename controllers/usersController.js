const BaseController = require("./baseController");

class UsersController extends BaseController {
  constructor(model) {
    super(model);
  }

  async postUser(req, res) {
    const { email, first_name, last_name } = req.body;
    try {
      const user = await this.model.create({
        email,
        first_name,
        last_name,
      });
      return res.json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }
  // async findOrPostUser(req, res) {
  //   const { email, first_name, last_name } = req.body;
  //   try {
  //     let user = await this.model.findOne({ where: { email } });
  //     if (user) {
  //       return res.json(user.id);
  //     }

  //     user = await this.model.create({
  //       email,
  //       first_name,
  //       last_name,
  //     });

  //     return res.json(user.id);
  //   } catch (err) {
  //     console.log(err.message);
  //     return res.status(400).json({ error: true, msg: err.message });
  //   }
  // }

  async getUserByEmail(req, res) {
    const { email } = req.query;
    console.log(email);

    try {
      const user = await this.model.findOne({
        where: { email: email },
      });

      return res.json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ error: true, msg: err.message });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;

    try {
      await this.model.destroy({
        where: {
          id: userId,
        },
      });

      res.status(200).send(`Successfully deleted user at user id: ${userId}`);
    } catch (error) {
      console.error(error);
      res.status(400).send({ error: true, msg: error });
    }
  }
}
module.exports = UsersController;
