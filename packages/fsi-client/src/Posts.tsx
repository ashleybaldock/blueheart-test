import { useQuery } from "@apollo/react-hooks";
import { QUERY_GET_POSTS } from "@blueheart/fsi-api-spec/lib/queries";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import {
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@blueheart/fsi-api-spec/lib/generated/graphql";
import * as React from "react";
import styles from './Posts.module.css';

export const Posts = () => {
  return (
    <Container>
      <h1>Posts</h1>
      <NewPosts />
      <PostsTable />
    </Container>
  );
};

export const NewPosts = () => {
  return (
    <Button
    className={styles.newPosts}
      onClick={() => {
        console.log("Wire this up!");
      }}
    >
      Add
    </Button>
  );
};

export const PostsTable = () => {
  const { data, loading, error } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(QUERY_GET_POSTS);

  return (
    <div className={styles.posts}>
      {loading ? (
        <Spinner animation={"border"} />
      ) : error || !data ? (
        <div>{error ? error?.toString() : "Error: no data"}</div>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {data?.getPosts.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.content}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
