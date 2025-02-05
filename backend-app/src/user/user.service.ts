import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createuser.dto';
import { User } from './user.model';
import { GenericRepository } from 'src/common/repositories/GenericRepository';
import { plainToInstance } from 'class-transformer';
import { Post as PostModel } from 'src/post/post.model';
import { Comment as CommentModel } from 'src/comment/comment.model';
import { PostRepository } from 'src/post/post.repository';
import { CommentRepository } from 'src/comment/comment.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: GenericRepository<User>,
    private readonly postRepository: PostRepository,
    private readonly commentRepository: CommentRepository,
  ) {}

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['followers', 'following'],
    });
  }
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['followers', 'following'],
    });
    console.log('id', id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createOrUpdateUser(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.findByEmail(createUserDto.email);

    if (user) {
      // Update user if already exists
      user.username = createUserDto.username ?? user.username;
      user.isActive = createUserDto.isActive ?? user.isActive;
      user.phone = createUserDto.phone ?? user.phone;
      user.location = createUserDto.location ?? user.location;
      user.linkedin = createUserDto.linkedin ?? user.linkedin;
      user.github = createUserDto.github ?? user.github;
      user.bio = createUserDto.bio ?? user.bio;
      user.degree = createUserDto.degree ?? user.degree;
      user.specialization = createUserDto.specialization ?? user.specialization;
      user.skills = createUserDto.skills ?? user.skills;
      user.profession = createUserDto.profession ?? user.profession;
      user.program = createUserDto.program ?? user.program;
      user.photoUrl = createUserDto.photoUrl ?? user.photoUrl;
    } else {
      // Create new user if not exists
      user = this.userRepository.create(createUserDto);
      user.following = []; // Initialisez following
      user.followers = []; // Initialisez followers
    }
    return this.userRepository.save(user);
  }
  async followUser(followerId: string, followingId: string): Promise<User> {
    console.log('followerId', followerId); // Debug
    console.log('followingId', followingId); // Debug

    const follower = await this.findById(followerId);
    const following = await this.findById(followingId);

    if (!follower || !following) {
      throw new Error('Follower or Following user not found');
    }

    if (follower.following.some((user) => user.id === followingId)) {
      throw new Error('You are already following this user');
    }

    if (following.followers.some((user) => user.id === followerId)) {
      throw new Error('This user is already following you');
    }

    // Initialisation des tableaux si nécessaires
    follower.following = follower.following || [];
    following.followers = following.followers || [];

    // Ajout des utilisateurs dans les relations
    follower.following.push(following);
    following.followers.push(follower);

    await this.userRepository.save(follower);
    await this.userRepository.save(following);

    return plainToInstance(User, follower);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<User> {
    console.log('followerId', followerId); // Debug
    console.log('followingId', followingId); // Debug

    const follower = await this.findById(followerId);
    const following = await this.findById(followingId);

    if (!follower || !following) {
      throw new Error('Follower or Following user not found');
    }

    follower.following = follower.following || [];
    following.followers = following.followers || [];

    if (!follower.following.some((user) => user.id === followingId)) {
      throw new Error('You are not following this user');
    }

    // Suppression de l'utilisateur suivi
    follower.following = follower.following.filter(
      (user) => user.id !== followingId,
    );
    following.followers = following.followers.filter(
      (user) => user.id !== followerId,
    );

    await this.userRepository.save(follower);
    await this.userRepository.save(following);

    return plainToInstance(User, follower);
  }

  // // async followUser(
  // //   followerEmail: string,
  // //   followingEmail: string,
  // // ): Promise<User> {
  // //   console.log('followerEmail', followerEmail); // Affichez l'e-mail de l'utilisateur qui suit

  //   const follower = await this.findByEmail(followerEmail);
  //   const following = await this.findByEmail(followingEmail);

  //   if (!follower || !following) {
  //     throw new Error('Follower or Following user not found');
  //   }

  //   if (follower.following.some((user) => user.email === followingEmail)) {
  //     throw new Error('You are already following this user');
  //   }

  //   if (following.followers.some((user) => user.email === followerEmail)) {
  //     throw new Error('This user is already following you');
  //   }

  //   if (!follower.following) {
  //     follower.following = [];
  //   }
  //   follower.following.push(following);

  //   if (!following.followers) {
  //     following.followers = [];
  //   }
  //   following.followers.push(follower);

  //   await this.userRepository.save(follower);
  //   await this.userRepository.save(following);

  //   // Utiliser plainToInstance pour exclure les propri
  //   return plainToInstance(User, follower);
  // }
  // async unfollowUser(
  //   followerEmail: string,
  //   followingEmail: string,
  // ): Promise<User> {
  //   const follower = await this.findByEmail(followerEmail);
  //   const following = await this.findByEmail(followingEmail);

  //   if (!follower || !following) {
  //     throw new Error('Follower or Following user not found');
  //   }
  //   // Supprimer l'utilisateur de la liste 'following' de l'utilisateur
  //   follower.following = follower.following.filter(
  //     (user) => user.email !== followingEmail,
  //   );

  //   following.followers = following.followers.filter(
  //     (user) => user.email !== followerEmail,
  //   );

  //   // Sauvegarder les utilisateurs après les modifications
  //   await this.userRepository.save(follower);
  //   await this.userRepository.save(following);

  //   return plainToInstance(User, follower);
  // }

  async getUserPostsByUserId(userId: string): Promise<PostModel[]> {
    const posts = await this.postRepository.findByAuthor(userId);

    if (!posts.length) {
      throw new NotFoundException(`No posts found for user ID: ${userId}`);
    }
    return posts.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
  async getLatestCommentsByUserId(userId: string): Promise<CommentModel[]> {
    const comments = await this.commentRepository.findByAuthor(userId);

    if (!comments.length) {
      throw new NotFoundException(`No comments found for user ID: ${userId}`);
    }
    return comments.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}
