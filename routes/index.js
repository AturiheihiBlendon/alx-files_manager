import AppController from "../controllers/AppController";

const routing = (router) => {
    router.get('/status', AppController.getStatus);
    router.get('/stats', AppController.getStats);
}


export default routing;