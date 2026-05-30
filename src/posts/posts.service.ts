import { Injectable, NotFoundException } from "@nestjs/common";
import { PostsRepository } from "./posts.repository";
import { v4 as uuid } from "uuid";
import { Post } from "./interfaces/post.interface";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  createPost(data: CreatePostDto): Post {
    const post = {
      id: uuid(),
      ...data,
      published: false,
    };

    return this.postsRepository.create(post);
  }

  getAllPosts(page: number, limit: number): Post[] {
    const posts = this.postsRepository.findAll();
    const start = (page - 1) * limit;

    return posts.slice(start, start + limit);
  }

  getPostById(id: string) {
    const post = this.postsRepository.findOne(id);

    if (!post) {
      throw new NotFoundException("Post not found");
    }

    return post;
  }

  updatePost(id: string, data: UpdatePostDto): Post {
    const post = this.getPostById(id);

    const update = { ...post, ...data };

    return this.postsRepository.update(id, update);
  }

  deletePost(id: string): Post {
    const post = this.getPostById(id);

    this.postsRepository.delete(id);
    return post;
  }
}
