import { useStaticQuery, graphql } from 'gatsby';

const query = graphql`
  {
    allInternalShows(filter: { id: { ne: "dummy" } }) {
      edges {
        node {
          alternative_id
          id
          account_id
          featuredCover {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
    allInternalDomains {
      edges {
        node {
          domain
          account_id
        }
      }
    }
  }
`;

export function getAccountId() {
  const data = useStaticQuery(query);
  const filterResult = data.allInternalDomains.edges.filter(
    item => item.node.domain === window.location.origin
  );
  const first = [...filterResult].shift();
  return first.node.account_id;
}

export function getShows() {
  const data = useStaticQuery(query);
  return data.allInternalShows.edges.filter(
    item => item.node.account_id === getAccountId()
  );
}