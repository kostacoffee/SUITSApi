import { Member, Gender } from "interfaces";
import { IsEmail, IsString, IsEnum, IsNumber, IsBoolean, Validate, IsOptional } from "class-validator";
import { ApiModelProperty, ApiModelPropertyOptional } from "@nestjs/swagger";

export class MemberDto implements Member {

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    lastName: string;

    @ApiModelPropertyOptional({default: Gender.Other})
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    access?: number

    @ApiModelPropertyOptional()
    @IsOptional()
    @IsNumber()
    sid?: number

    @ApiModelPropertyOptional({default: true})
    @IsOptional()
    @IsBoolean()
    newsletter?: boolean

    @ApiModelPropertyOptional({default: false})
    @IsOptional()
    @IsBoolean()
    doingIT?: boolean

    @ApiModelPropertyOptional({default: true})
    @IsOptional()
    @IsBoolean()
    registered?: boolean;
}