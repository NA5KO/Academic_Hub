import { IsString, IsEnum, IsOptional, IsArray, IsNumber } from 'class-validator';
import { PostType } from 'src/enums/post-type.enum';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsEnum(PostType)
  type: PostType;

  @IsNumber()
  @IsOptional()
  upvotes: number = 0;

  @IsNumber()
  @IsOptional()
  downvotes: number = 0;

  @IsNumber()
  @IsOptional()
  saves: number = 0;

  @IsString()
  communityId: string;

  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()  
  attachment: string;  
}
