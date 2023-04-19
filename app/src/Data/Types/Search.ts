import APIType from "./API/Type";

export default interface Search<T extends APIType> {
  readonly SearchQuery: T[];
}
