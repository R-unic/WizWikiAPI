import { Application, Response } from "express";
import APIError from "../Data/Types/API/Error";
import APIResponse from "../Data/Types/API/Response";

export abstract class CommonRoutesConfig {
  public constructor(
    public readonly App: Application,
    public readonly Name: string
  ) { this.ConfigureRoutes(); }

  protected abstract ConfigureRoutes(): Application;

  protected NotFound(res: Response, what: string): Response {
    const err = new APIError(ResponseCode.NOT_FOUND, `${what} not found.`);
    return res.status(err.Code)
      .send(JSON.stringify(new APIResponse(false, err)));
  }
}
