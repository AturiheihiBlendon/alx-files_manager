import AppController from "../controllers/AppController";
import UsersController from "../controllers/UsersController";
const routing = (router) => {
    // Get status about redis and mongodb
    router.get('/status', AppController.getStatus);
    router.get('/stats', AppController.getStats);

    // Add a new user
    router.post('/users', UsersController.postNew);
}


export default routing;