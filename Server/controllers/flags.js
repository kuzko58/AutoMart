import storage from '../storage';

const flags = {
  createNewFlag: (req, res) => {
    const Res = {
      status: 201,
      data: Object.assign({}, req.body),
    };
    storage.flags.push(req.body);
    res.status(Res.status).json(Res.data);
  },
};

export default flags;
