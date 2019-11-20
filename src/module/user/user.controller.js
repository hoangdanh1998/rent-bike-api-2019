import HTTPStatus from 'http-status';
import User from './user.model';

export async function login(req, res) {
  const user = req.user; // done ben passport dem qua
  if (!user) {
    return res.status(HTTPStatus.BAD_REQUEST).json('Invalid username password');
  }
  return res.status(HTTPStatus.OK).json(user.toAuthJSON());
}

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

