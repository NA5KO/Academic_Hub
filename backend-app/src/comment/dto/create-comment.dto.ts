import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  content!: string;

  @IsString()
  postId!: string;

  @IsString()
  authorId!: string;

  @IsString()
  @IsOptional()
  authorUsername!: string;
}
