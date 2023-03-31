import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';
class AuthController {
    static async getConnect(req, res) {
	const Authorization = req.header('Authorization') || '';
    console.log(Authorization)
	const creds = Authorization.split(' ')[1];
	if (!creds) return res.status(401).send({ error: 'Unauthorized' });
	
	const decodedCreds = Buffer.from(creds, 'base64').toString('utf-8');
    console.log(decodedCreds)
	const [email, password] = decodedCreds.split(':');
	if (!email || !password) return res.status(401).send({ error: 'Unauthorized' });
	const user = await dbClient.users.findOne({
	    email,
	    password: sha1(password), 
	});
	if (!user) return res.status(401).send({ error: 'Unauthorized' });
	const token = uuidv4();
	await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 3600);
	return res.status(200).send({ token });	
    }

    static async getDisconnect(req, res) {
	const user_token = request.header('X-Token');
	const id = await redisClient.get(`auth_${user_token}`);
	if(id) {
	    await redisClient.del(`auth_${user_token}`);
	    res.status(204).json({});
	} else {
	    res.status(401).json({ error: 'Unauthorized' });
	}	
    }   
}
export default AuthController;