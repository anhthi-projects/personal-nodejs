import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return targetUser;
  }

  async updateUser(id: string, payload: UpdateUserDto) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      data: payload,
      where: {
        id,
      },
    });
  }
}
