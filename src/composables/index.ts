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

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
