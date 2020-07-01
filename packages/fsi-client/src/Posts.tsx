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

  if (loading) {
    return <Spinner animation={"border"} />;
  }

  if (error || !data) {
    return <div>{error ? error.toString() : "Error: no data"}</div>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {data.getPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
