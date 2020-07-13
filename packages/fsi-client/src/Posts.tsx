import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  MUTATION_SUBMIT_POST,
  QUERY_GET_POSTS,
} from "@blueheart/fsi-api-spec/lib/queries";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@blueheart/fsi-api-spec/lib/generated/graphql";
import React from "react";
import styles from "./Posts.module.css";

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
  const [show, setShow] = React.useState(false);

  const [createPost, { data, loading, error }] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(MUTATION_SUBMIT_POST, {
    onCompleted: () => {
      setShow(false);
    },
    onError: () => {
      // Error is handled via UI feedback
    },
    // This is beautiful magic
    refetchQueries: [
      {
        query: QUERY_GET_POSTS,
      },
    ],
  });

  return (
    <>
      <Button
        className={styles.newPosts}
        onClick={() => {
          setShow(true);
        }}
      >
        Add
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            createPost({
              variables: {
                post: {
                  title: (target.elements.namedItem(
                    "formPostTitle"
                  ) as HTMLInputElement).value,
                  content: (target.elements.namedItem(
                    "formPostBody"
                  ) as HTMLInputElement).value,
                },
              },
            });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formPostTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="formPostBody">
              <Form.Label>Post Content</Form.Label>
              <Form.Control as="textarea" rows={6} />
            </Form.Group>
            {error && (
              <div className={styles.serverError}>
                {`Something went wrong, please try again.`}
                {error.message}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              disabled={loading}
              variant="secondary"
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" disabled={loading} type="submit">
              {loading ? "Saving…" : "Save Post"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export const PostsTable = () => {
  const { data, fetchMore, loading, error } = useQuery<
    GetPostsQuery,
    GetPostsQueryVariables
  >(QUERY_GET_POSTS, {
    variables: {
      offset: 0,
      limit: 5,
    }
  });

  const active = 1;

  return (
    <div className={styles.posts}>
      {loading ? (
        <Spinner animation={"border"} />
      ) : error || !data ? (
        <div>{error?.toString() ?? "Error: no data"}</div>
      ) : (
        <>
          <Pagination size="sm">
            <Pagination.Item key={1} active={1 === active}>
              {1}
            </Pagination.Item>
            <Pagination.Item key={2} active={false}>
              {2}
            </Pagination.Item>
          </Pagination>
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {data?.getPosts.posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.content}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};
