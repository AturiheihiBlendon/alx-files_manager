import AppController from "../controllers/AppController";
import UsersController from "../controllers/UsersController";
import AuthController from "../controllers/AuthController";
const routing = (router) => {
    // Get status about redis and mongodb
    router.get('/status', AppController.getStatus);
    router.get('/stats', AppController.getStats);

    // Add a new user
    router.post('/users', UsersController.postNew);

    // Authenticating a user
    router.get('/connect', AuthController.getConnect);
    router.get('/disconnect', AuthController.getDisconnect);

    // Retrieve a user
    // router.get('/users/me', UsersController.getMe);
}


export default routing;