
import { onlyLoggedIn } from  "../token/passport";
import * as express from "express";
import { ISessionRequest } from "../user/service";
import * as service from "./service";



export function initModule(app: express.Express) {
    // Rutas del controlador
    app
      .route("/v1/chat")
      .post(onlyLoggedIn, create )
    
      app
      .route("/v1/chat/:idReceptor")
      .get(onlyLoggedIn, current);
  
  }


  async function current(req: ISessionRequest, res: express.Response) {
    const result = await service.read(req.user.user_id, req.params.idReceptor);
    res.json({
      id: result.id,
      messages: result.messages,
    });
  }

  async function create(req: ISessionRequest, res: express.Response) {
    const result = await service.update(req.user.user_id, req.body);
    res.json({
      id: result.id
    });
  }