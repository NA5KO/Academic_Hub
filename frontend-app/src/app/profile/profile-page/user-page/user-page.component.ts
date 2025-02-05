import { Component, OnInit } from '@angular/core';
import { UserService, User } from 'src/services/user.service';
import { PostService, Post } from 'src/services/post.service';
import { CommentService, Comment } from 'src/services/comment.service';
import { PostsComponent } from 'src/app/posts/posts.component';
import { CommentsComponent } from '../comments/comments.component';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  imports: [PostsComponent, CommentsComponent],
})
export class UserPageComponent implements OnInit {
  user!: User;
  isAdmin: boolean = true;
  posts: Post[] = [];
  comments: Comment[] = [];
  
  // Vous pouvez définir ici l’id de l’utilisateur connecté ou récupéré par une route/une auth
  userId: string = '1';

  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadUserPosts();
    this.loadUserComments();
  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
      }
    });
  }

  loadUserPosts() {
    this.postService.getUserPosts(this.userId).subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des posts', err);
      }
    });
  }

  loadUserComments() {
    this.commentService.getUserComments(this.userId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commentaires', err);
      }
    });
  }

  handleDeleteUser() {
    // Ici, vous pouvez appeler une méthode du service pour supprimer l’utilisateur,
    // puis rediriger ou mettre à jour l’interface en conséquence.
    console.log(`${this.user.username}'s profile has been deleted.`);
  }
}
