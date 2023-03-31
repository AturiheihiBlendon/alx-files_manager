import sha1 from 'sha1';
import Queue from 'bull/lib/queue';
import dbClient from '../utils/db';

const userQueue = new Queue('email sending');

export default class UsersController {
  static async postNew(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }
    if (!password) {
    return res.status(400).send({ error: 'Missing password' });
    }
    const Emailexist = await dbClient.users.findOne({ email });

    if (Emailexist) {
      return res.status(400).send({ error: 'Already exist' });
    }
    const insertionInfo = await dbClient.users
      .insertOne({ email, password: sha1(password) });
    const userId = insertionInfo.insertedId.toString();

    userQueue.add({ userId });
    res.status(201).send({ email, id: userId });
  }
    static async getMe(req, res) {
    const { user } = req;

    res.status(200).json({ email: user.email, id: user._id.toString() });
  }
}