declare namespace Express {
  export interface Request {
    customer?: { id: string };
    user?: { id: string };
  }
}
