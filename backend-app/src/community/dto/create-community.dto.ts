// src/community/dto/create-community.dto.ts
import { IsNotEmpty, IsString, IsArray, IsOptional, IsUrl, IsUUID } from 'class-validator';

export class CreateCommunityDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  keywords?: string[];

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  banner: string;

  @IsNotEmpty()
  @IsUrl()
  icon: string;

  @IsNotEmpty()
  @IsUUID()
  creatorId: string;  // ID of the user who creates the community
}
