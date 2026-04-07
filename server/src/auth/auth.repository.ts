import { Injectable } from '@nestjs/common';
import { Prisma, TokenType } from '../../prisma/generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AuthRepository {
    constructor(private prisma: PrismaService) { }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async findUserById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findActiveUserById(id: string) {
        return this.prisma.user.findFirst({
            where: { id, isDeleted: false, isActive: true },
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async deleteUser(id: string) {
        return this.prisma.user.delete({ where: { id } });
    }

    async createToken(data: Prisma.TokenUncheckedCreateInput) {
        return this.prisma.token.create({ data });
    }

    async findRefreshToken(tokenHash: string) {
        return this.prisma.token.findFirst({
            where: {
                tokenHash,
                type: TokenType.REFRESH,
            },
        });
    }

    async revokeToken(id: number) {
        return this.prisma.token.update({
            where: { id },
            data: { isRevoked: true },
        });
    }

    async revokeAllUserRefreshTokens(userId: string) {
        return this.prisma.token.updateMany({
            where: { userId, type: TokenType.REFRESH, isRevoked: false },
            data: { isRevoked: true },
        });
    }

    async findValidPasswordResetToken(tokenHash: string) {
        return this.prisma.token.findFirst({
            where: {
                tokenHash,
                type: TokenType.PASSWORD_RESET,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
        });
    }

    async findValidEmailVerificationToken(tokenHash: string) {
        return this.prisma.token.findFirst({
            where: {
                tokenHash,
                type: TokenType.EMAIL_VERIFICATION,
                isRevoked: false,
                expiresAt: { gt: new Date() },
            },
        });
    }

    async markTokenAsUsed(id: number) {
        return this.prisma.token.update({
            where: { id },
            data: { isRevoked: true },
        });
    }

    async invalidatePasswordResetTokens(userId: string) {
        return this.prisma.token.updateMany({
            where: { userId, type: TokenType.PASSWORD_RESET, isRevoked: false },
            data: { isRevoked: true },
        });
    }

    async revokeEmailVerificationTokens(userId: string) {
        return this.prisma.token.updateMany({
            where: { userId, type: TokenType.EMAIL_VERIFICATION, isRevoked: false },
            data: { isRevoked: true },
        });
    }

    async updateUserPassword(id: string, password: string) {
        return this.prisma.user.update({
            where: { id },
            data: { password },
        });
    }

    async activateUser(id: string) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isActive: true,
            },
        });
    }
}
