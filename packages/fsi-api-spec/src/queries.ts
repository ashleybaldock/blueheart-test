import gql from "graphql-tag";

export const FRAGMENT_POST = gql`
  fragment GQLPost on GQLPost {
    id
    title
    content
  }
`;

export const FRAGMENT_POSTS = gql`
  ${FRAGMENT_POST}
  fragment GQLPosts on GQLPosts {
    posts {
      ...GQLPost
    },
    count
  }
`;

export const QUERY_GET_POSTS = gql`
  ${FRAGMENT_POSTS}
  query GetPosts($skip: Int, $take: Int) {
    getPosts(
      skip: $skip,
      take: $take
    ) {
      ...GQLPosts
    }
  }
`;

export const MUTATION_SUBMIT_POST = gql`
  ${FRAGMENT_POST}
  mutation CreatePost($post: GQLPostInput!) {
    createPost(post: $post) {
      ...GQLPost
    }
  }
`;
