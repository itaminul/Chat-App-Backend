import * as express from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: number; // or `string` if you want it to be mandatory
        }
    }
}
