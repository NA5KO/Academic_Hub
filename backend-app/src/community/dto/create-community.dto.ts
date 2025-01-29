import { IsArray, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  keywords: string[];

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  banner: string;

  @IsString()
  @IsNotEmpty()
  icon: string;
  
  @IsNotEmpty()
  followersCount: number;
}
