import { Router } from "express";
import transferController from "../controller/transfer";
import { userAuthenticated, userSessionMiddleware } from "../midddlewares/userSession";

const router: Router = Router();

router.get("/:requestId",[userSessionMiddleware,userAuthenticated],transferController.authorizeTransferRequest);

export default router;