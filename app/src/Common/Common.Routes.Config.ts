import { Application, Response } from "express";
import { APIResponse, APIError } from "../Data/Types/APITypes";

export abstract class CommonRoutesConfig {
  public constructor(
    public readonly App: Application,
    public readonly Name: string
  ) { this.ConfigureRoutes(); }

  protected abstract ConfigureRoutes(): Application;

  protected NotFound(res: Response): Response {
    const err = new APIError(ResponseCode.NOT_FOUND, `${this.Name.slice(0, -1)} not found.`);
    return res.status(err.Code)
      .send(JSON.stringify(new APIResponse(false, err)));
  }
}
