import userRouters from './user/user.route';

export default app => {
  app.use('/user', userRouters);    
};
