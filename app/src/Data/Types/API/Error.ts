export interface IAPIError {
    Code: number;
    Message: string;
}

export class APIError implements IAPIError {
    public constructor(
        public readonly Code: number,
        public readonly Message: string
    ) {}
}