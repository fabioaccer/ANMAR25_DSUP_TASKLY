import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import AppError from '../errors/AppError';
import { ErrorCode } from '../errors/ErrorCodes';

export function validate(schema: AnyZodObject) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                const formattedErrors = error.errors.map(err => ({
                    path: err.path.join('.'),
                    message: err.message
                }));

                return res.status(400).json({
                    status: 'error',
                    message: 'Erro de validação nos dados fornecidos.',
                    code: ErrorCode.VALIDATION_ERROR,
                    errors: formattedErrors,
                });
            }

            next(error);
        }
    };
}