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

  @IsString()  
  communityId: string;

  @IsString()  
  authorId: string;
}
