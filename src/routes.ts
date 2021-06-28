import { Router } from "express"

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiverComplimentsController";
import { ListTagController } from "./controllers/ListTagController";

/* Midlewares */
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticate } from "./middlewares/ensureAuthenticate";
/*  */

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController = new ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
const listTagController = new ListTagController();

router.post('/users', 
createUserController.handle)

router.post('/tags', 
ensureAuthenticate, 
ensureAdmin, 
createTagController.handle)

router.post('/session', 
authenticateUserController.handle)

router.post('/compliments', 
ensureAuthenticate, 
createComplimentController.handle)

router.get('/users/compliments/send', 
ensureAuthenticate,
listUserSendComplimentsController.handle)

router.get('/users/compliments/receive', 
ensureAuthenticate,
listUserReceiveComplimentsController.handle)

router.get('/tags', 
ensureAuthenticate,
listTagController.handle)

export { router }   