export { }

declare global {
  namespace Express {
    export interface Request {
      payload:{
        id: String,
        rol: String
      };
    }
  }
}