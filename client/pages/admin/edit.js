import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withApollo } from "../../lib/apollo";
import { Formik, Form } from "formik";
import Input from "../../components/admin/Input";
import { Button } from "@theme-ui/components";

const POST_QUERY = gql`
  query post($path: String) {
    post(path: $path) {
      title
      body
    }
  }
`;

const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $path: String
    $title: String
    $body: String
    $published: Boolean
  ) {
    updatePost(path: $path, title: $title, body: $body, published: $published) {
      path
      title
      body
      published
    }
  }
`;

const Post = () => {
  const router = useRouter();
  const { path } = router.query;

  const { loading, error: queryError, data: queryData } = useQuery(POST_QUERY, {
    variables: { path }
  });

  const [updatePost, { data: mutationData, mutationError }] = useMutation(
    UPDATE_POST_MUTATION
  );

  const handleSubmit = (values, actions) => {
    updatePost({
      variables: {
        path,
        ...values
      }
    }).then(data => {
      console.log(data);
    });
  };

  if (loading) return "loading";
  if (queryError) return "something went wrong";

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{
        title: queryData.post.title,
        body: queryData.post.body
      }}
    >
      {() => (
        <Form>
          <Input name="title" label="Title " />
          <Input name="body" label="Body " />
          <Button type="submit">Save</Button>
        </Form>
      )}
    </Formik>
  );
};

export default withApollo(Post, { ssr: false });
