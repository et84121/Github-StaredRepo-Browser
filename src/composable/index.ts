import { useMainStore } from "@/store/index";
import { graphql } from "@octokit/graphql";
import { User } from "@octokit/graphql-schema";

export const getGithubUserStarredRepos = async (
  username: string,
  endCursor = ""
) => {
  const PAT = useMainStore().PAT;
  const res = await graphql<{ user: User }>({
    query: `query ($userName: String!,$Cursor:String!) {
      user(login: $userName) {
        starredRepositories(after:$Cursor,first: 100, orderBy: {field: STARRED_AT, direction: ASC}) {
          totalCount
          pageInfo {
            startCursor
            hasNextPage
            endCursor
            hasPreviousPage
          }
          nodes {
            id
            name
            nameWithOwner
            description
            url
            createdAt
            updatedAt
            forkCount
            diskUsage
            homepageUrl
            openGraphImageUrl
            repositoryTopics(first: 20) {
              nodes {
                topic {
                  id
                  name
                }
              }
            }
            languages(first: 20) {
              nodes {
                id
                name
                color
              }
              totalCount
            }
            stargazerCount
          }
        }
        id
        bio
        avatarUrl
        company
        email
        name
        url
        createdAt
      }
    }`,
    userName: username,
    Cursor: endCursor,
    headers: { authorization: `token ${PAT}` },
  });

  return {
    user: {
      bio: res.user.bio,
      avatarUrl: res.user.avatarUrl,
      company: res.user.company,
      email: res.user.email,
      name: res.user.name,
      id: res.user.id,
    },
    repos: res.user.starredRepositories.nodes,
    hasNextPage: res.user.starredRepositories.pageInfo.hasNextPage,
    endCursor: res.user.starredRepositories.pageInfo.endCursor,
  };
};
