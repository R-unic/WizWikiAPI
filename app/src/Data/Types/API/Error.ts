export default class APIError {
  public constructor(
    public readonly Code: number,
    public readonly Message: string
  ) {}
}
