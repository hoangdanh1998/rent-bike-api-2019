import HTTPStatus from 'http-status';
import userModel from './user.model';

export async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log({ username, password });
  try {
    const user = await userModel.findOne({ username, password });
    if (!user) {
      console.log('T null ne');
      throw new Error('Invalid username password');
    }
    return res.status(HTTPStatus.OK).json(user);
  } catch (e) {
    return res.status(HTTPStatus.BAD_REQUEST).json(e.message);
  }
}
