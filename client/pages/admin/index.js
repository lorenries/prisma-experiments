import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import App from "../../components/App";
import Login from "../../components/admin/Login";
import PostList from "../../components/admin/PostList";
import { withApollo } from "../../lib/apollo";

const LOGIN_QUERY = gql`
  query me {
    me {
      id
    }
  }
`;

const Root = () => {
  const { loading, error, data, refetch } = useQuery(LOGIN_QUERY);

  if (loading) return "loading";

  if (data && data.me) {
    return <PostList />;
  }

  return <Login refetch={refetch} />;
};

const Admin = () => (
  <App>
    <Root />
  </App>
);

export default withApollo(Admin, { ssr: true });
