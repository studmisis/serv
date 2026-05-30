import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Controller("posts")
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  getAllPosts(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.postService.getAllPosts(page, limit);
  }

  @Get(":id")
  getOnePost(@Param("id", ParseUUIDPipe) id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() data: CreatePostDto) {
    return this.postService.createPost(data);
  }

  @Patch(":id")
  updatePost(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, data);
  }

  @Delete(":id")
  deletePost(@Param("id", ParseUUIDPipe) id: string) {
    return this.postService.deletePost(id);
  }
}
