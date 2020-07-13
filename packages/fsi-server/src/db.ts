// This is obviously a bit different from our db set up in production :)
// Lowdb is a super-simple db which in this case uses a JSON file as a backing store
// If you make changes here that aren't optimal because of the data structure, just explain them

import * as low from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import {
  GQLPost,
  GQLPosts,
  GQLPostInput,
} from "@blueheart/fsi-api-spec/lib/generated/graphql";
import { LowdbSync } from "lowdb";
import * as shortid from "shortid";

const adapter = new FileSync("db.json");
const db: LowdbSync<{ posts: GQLPost[] }> = low(adapter);

db.defaults({
  posts: [
    {
      id: shortid(),
      title: "Hello, world!",
      content: "Lorem Ipsum bla bla bla",
    },
  ],
}).write();

export const dbApi = {
  getPosts: ({ skip = 0, take = -1 }): GQLPosts => {
    const posts = db.get("posts").value();

    if (take === -1) {
      return {
        posts,
        count: posts.length,
      };
    }

    const slicedPosts = posts.slice(skip, skip + take);
    return {
      posts: slicedPosts,
      count: posts.length,
    }
  },
  createPost: (postInput: GQLPostInput): GQLPost => {
    const post: GQLPost = {
      ...postInput,
      id: shortid(),
    };
    db.get("posts").push(post).write();
    return post;
  },
  dropPosts: () => {
    db.set("posts", []).write();
  },
  _db: db,
};

export type DBApi = typeof dbApi;
