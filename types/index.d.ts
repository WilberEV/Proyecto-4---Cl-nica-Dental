export { }

declare global {
  namespace Express {
    export interface Request {
      payload:{
        id: String,
        role: String
      };
    }
  }
}