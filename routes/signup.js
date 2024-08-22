const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');

const jwt = require('jsonwebtoken');
const UserPreferenceModel = require('../models/UserPreferenceModel');
const bcrypt = require('bcrypt');
const Users =  require('../models/users');


router.post('/',
  body('first_name').trim().notEmpty(),
  body('last_name').trim().optional(),
  body('email').trim().notEmpty().isEmail().custom(async value => {

    const user = await Users.findOne({ where: { 'email': value } });
    if (user) {
      throw new Error('E-mail already in use');
    }
  }),
  body('password').isLength({ min: 5 }).notEmpty(),

  async function (req, res, next) {

    const Result = validationResult(req);

    if (!Result.isEmpty()) {
      return res.status(422).json({ errors: Result.array() });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    var data = {
      username: req.body.first_name,
      email: req.body.email,
      password: hashedPassword
    }

    const user = await Users.create(data);

    const token = jwt.sign(user.toJSON(), '23089423948askldfjhasdkh234987');

    return res.status(201).json({ message: "Record added successfully", data: user, token: token });

  });



/* get user by id */
router.get('/:id', param('id').trim().notEmpty(), async (req, res, next) => {

  const id = req.params.id

  console.log(req);

  if (!id) {
    res.status(422).json({ 'message': "id field is missing", error: true, code: 422 });
  }

  const user = await UserModel.findOne({
    include: [
      {
        model: UserPreferenceModel
      }
    ],
    where: {
      id: id
    }
  });

  if (!user) {
    return res.status(400).json({ 'message': "Invalid id user not found", 'error': true, 'code': 400 });
  }

  return res.status(200).json({ data: user });

});


router.get('/', async (req, res, next) => {

  const users = await UserModel.findAll();

  res.status(200).json(users);

});


module.exports = router;