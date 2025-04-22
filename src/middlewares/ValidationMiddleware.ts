import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validationMiddleware = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(dtoClass, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            const errorMessages = errors.map(error => {
                return {
                    field: error.property,
                    messages: Object.values(error.constraints || {})
                };
            });
            return res.status(400).json({ errors: errorMessages });
        }

        req.body = dto;
        return next();
    };
};