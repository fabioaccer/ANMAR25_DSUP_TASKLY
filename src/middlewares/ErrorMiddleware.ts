import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import AppError from '../errors/AppError';
import { ErrorCode } from '../errors/ErrorCodes';
import { ZodError } from 'zod';

export default function errorMiddleware(
    err: Error,
    _: Request,
    response: Response,
    __: NextFunction,
): Response {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            code: err.errorCode,
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            return response.status(409).json({
                status: 'error',
                message: 'Já existe um registro com estes dados.',
                code: ErrorCode.DATABASE_ERROR,
                fields: err.meta?.target,
            });
        }

        if (err.code === 'P2025') {
            return response.status(404).json({
                status: 'error',
                message: 'Registro não encontrado.',
                code: ErrorCode.NOT_FOUND,
            });
        }

        return response.status(400).json({
            status: 'error',
            message: 'Erro na operação do banco de dados.',
            code: ErrorCode.DATABASE_ERROR,
            dbError: err.code,
        });
    }

    if (err instanceof ZodError) {
        return response.status(400).json({
            status: 'error',
            message: 'Erro de validação nos dados fornecidos.',
            code: ErrorCode.VALIDATION_ERROR,
            errors: err.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message
            })),
        });
    }

    console.error('Unexpected error:', err);

    return response.status(500).json({
        status: 'error',
        message: 'Erro interno do servidor.',
        code: ErrorCode.INTERNAL_SERVER_ERROR,
    });
}