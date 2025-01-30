import { IsArray, IsString, IsNotEmpty, IsOptional, ArrayMinSize, IsNumber } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1, { message: "At least one keyword is required" })
  keywords: string[] = ["Computer Science"]; // Default value

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  banner: string;

  @IsString()
  icon: string;

  followersCount: number;
}
