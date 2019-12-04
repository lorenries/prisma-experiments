import { useRouter } from "next/router";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../lib/apollo";

const POST_QUERY = gql`
  query post($path: String) {
    post(path: $path) {
      title
      body
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { path } = router.query;

  const { loading, error, data } = useQuery(POST_QUERY, {
    variables: { path }
  });

  if (loading) return "loading";
  if (error) return "something went wrong";

  return <p>Post: {data.post.title}</p>;
};

export default withApollo(Post, {
  ssr: false
});
