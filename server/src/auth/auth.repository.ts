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
            where: { id, isDeleted: false },
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async createSession(data: Prisma.SessionUncheckedCreateInput) {
        return this.prisma.session.create({ data });
    }

    async createToken(data: Prisma.TokenUncheckedCreateInput) {
        return this.prisma.token.create({ data });
    }

    async findSessionByToken(refreshToken: string) {
        return this.prisma.session.findUnique({
            where: { refreshToken },
        });
    }

    async revokeSession(id: number) {
        return this.prisma.session.update({
            where: { id },
            data: { isRevoked: true },
        });
    }

    async revokeAllUserSessions(userId: string) {
        return this.prisma.session.updateMany({
            where: { userId, isRevoked: false },
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

    async updateUserPassword(id: string, password: string) {
        return this.prisma.user.update({
            where: { id },
            data: { password },
        });
    }
}
