import HTTPStatus from 'http-status';
import User from './user.model';

export async function login(req, res) {
  const user = req.user; // done ben passport dem qua
  if (!user) {
    return res.status(HTTPStatus.BAD_REQUEST).json('Invalid username password');
  }
  return res.status(HTTPStatus.OK).json(user.toAuthJSON());
}

export const editUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isRemoved: false });
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key];
    });

    await user.save();
    return res.status(HTTPStatus.OK).json(user.toJSON());
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err.message);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isRemoved: false });
    return res.status(HTTPStatus.OK).json(user.toJSON());
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err.message);
  }
};
export const getAllUser = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  const skip = parseInt(req.query.skip, 10) || 0;
  const fullname = req.query.fullname;

  try {
    const query = (fullname) ? { $text: { $search: fullname }, isRemoved: false } 
      : { isRemoved: false };

    const listUser = await User.list({ queries: query, search: fullname }).skip(skip).limit(limit);
    
    const total = await User.count(query);

    return res.status(HTTPStatus.OK).json({ listUser, total });
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
};
export const createUser = async (req, res) => {
  try {
    const user = await User.create({ ...req.body, role: 1 }); 
    return res.status(HTTPStatus.OK).json(user);
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id, isRemoved: false });
    if (!user) {
      return res.sendStatus(HTTPStatus.NOT_FOUND);
    }
    user.isRemoved = true;
    console.log(user);

    await user.save();
    return res.status(HTTPStatus.OK).json(user.toJSON());
  } catch (err) {
    return res.status(HTTPStatus.BAD_REQUEST).json(err.message);
  }     
};
