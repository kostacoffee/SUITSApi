import { Controller, Get, Put, Delete, Param, Body, UseInterceptors, ValidationPipe, NotFoundException, HttpCode, UseGuards, NestInterceptor, ExecutionContext, Interceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { MemberEntity } from 'entities';
import { Serializer } from 'serializer/interceptor';
import { MemberResource } from 'resources/member';

import { MembersService } from '../service';
import { MemberDto } from '../dto';
import { ApiGuard } from 'api/auth/guard.api';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiUseTags("members")
@Controller(new MemberResource().prefix+"/:id")
@UseGuards(ApiGuard)
@UseInterceptors(Serializer(MemberResource))
export class MembersIdController {
    
    constructor(private readonly membersService: MembersService) {}

    @Get()
    @ApiOperation({
        title: "Retrieve a member",
        description: "Retrieve a member with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    async getMember(@Param('id') id: number) : Promise<MemberEntity> {
        let member = await this.membersService.getMember(id)
        if (!member)
            throw new NotFoundException

        return member
    }

    @Put()
    @ApiOperation({
        title: "Update member",
        description: "Update info stored on the member with a given id.",
    })
    @ApiResponse({
        status: 200,
        type: MemberResource,
    })
    async editMember(@Param('id') id: number, @Body(new ValidationPipe({transform: true})) member: MemberDto) : Promise<MemberEntity> {
        let m = await this.membersService.updateMember(id, member);
        if (!m)
            throw new NotFoundException
        
        return m
    }

    @Delete()
    @HttpCode(204)
    @ApiOperation({
        title: "Delete a member",
        description: "Delete a member and any attendances belonging to that member.",
    })
    async deleteMember(@Param('id') id: number) : Promise<void> {
        let result = await this.membersService.deleteMember(id);
        if (!result)
            throw new NotFoundException
    }

}
