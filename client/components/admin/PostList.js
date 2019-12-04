import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ErrorMessage from "../ErrorMessage";
import formatDate from "../../utils/formatDate";
import { Styled } from "theme-ui";
import { Spinner, Card, Button } from "@theme-ui/components";
/** @jsx jsx */
import { jsx } from "theme-ui";

export const ALL_POSTS_QUERY = gql`
  query feed {
    feed {
      id
      path
      title
      createdAt
      published
    }
  }
`;

export default function PostList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    ALL_POSTS_QUERY,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true
    }
  );

  if (error) return <ErrorMessage message="Error loading posts." />;
  if (loading) return <Spinner />;

  const { feed } = data;

  return (
    <Card
      as="section"
      sx={{
        maxWidth: "6xl"
      }}
    >
      <Styled.table>
        <thead>
          <Styled.tr>
            <Styled.th>Title</Styled.th>
            <Styled.th>Published</Styled.th>
            <Styled.th>Date Created</Styled.th>
            <Styled.th>Edit</Styled.th>
          </Styled.tr>
        </thead>
        <tbody>
          {feed.map((post, index) => {
            console.log(post);
            return (
              <tr key={post.id}>
                <Styled.td>{post.title}</Styled.td>
                <Styled.td>{post.published ? "✅" : "❌"}</Styled.td>
                <Styled.td>{formatDate(post.createdAt)}</Styled.td>
                <Styled.td>
                  <Link href={`admin/edit/?path=${post.path}`}>
                    <Button>Edit</Button>
                  </Link>
                </Styled.td>
              </tr>
            );
          })}
        </tbody>
      </Styled.table>
    </Card>
  );
}
