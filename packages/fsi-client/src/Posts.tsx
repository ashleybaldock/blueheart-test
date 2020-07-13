import { useQuery } from "@apollo/react-hooks";
import { QUERY_GET_POSTS } from "@blueheart/fsi-api-spec/lib/queries";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import {
  GetPostsQuery,
  GetPostsQueryVariables,
} from "@blueheart/fsi-api-spec/lib/generated/graphql";
import * as React from "react";
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
  const [show, setShow] = React.useState(true);

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
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Add a Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formPostTitle">
              <Form.Label>Post Title</Form.Label>
              <Form.Control type="email" />
            </Form.Group>

            <Form.Group controlId="formPostBody">
              <Form.Label>Post Content</Form.Label>
              <Form.Control as="textarea" rows={6} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={() => setShow(false)}
            >
              Save Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
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
        <div>{error?.toString() ?? "Error: no data"}</div>
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
