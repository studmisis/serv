import { Injectable } from "@nestjs/common";
import { Post } from "./interfaces/post.interface";

@Injectable()
export class PostsRepository {
  private posts: Post[] = [
    {
      id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      title: "Море",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero molestiae ipsa perferendis aut nesciunt quaerat, odio illo. Atque, iure fugit autem incidunt quia optio, quos similique, non velit obcaecati nihil!",
      published: true,
    },
    {
      id: "b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22",
      title: "Автомобили",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ullam amet fuga in nulla, dolorem esse est voluptatibus itaque aliquam error facilis praesentium reprehenderit ab quia nihil quasi nisi. Voluptatibus.",
      published: true,
    },
    {
      id: "c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
      title: "Экономика",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero molestiae ipsa perferendis aut nesciunt quaerat, odio illo. Atque, iure fugit autem incidunt quia optio, quos similique, non velit obcaecati nihil!",
      published: true,
    },
  ];

  create(post: Post): Post {
    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post | undefined {
    return this.posts.find((el) => el.id === id);
  }

  update(id: string, data: Post): Post {
    const index = this.posts.findIndex((el) => el.id === id);

    if (index === -1) {
      throw new Error(`Post with id ${id} not found`);
    }

    this.posts[index] = data;

    return this.posts[index];
  }

  delete(id: string): void {
    const index = this.posts.findIndex((el) => el.id === id);

    if (index === -1) {
      return;
    }

    this.posts.splice(index, 1);
  }
}
