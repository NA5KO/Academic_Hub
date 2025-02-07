export class PostCommentAdded {
    static readonly EVENT_NAME = 'post.comment.added';
    constructor(
      public readonly postId: string,          
      public readonly commenterId: string,     
      public readonly content: string          
    ) {}
  }