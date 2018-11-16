const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      return result;
    })
  )
});


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle(
        filter: {published: {eq: true}}
      ) {
        edges {
          node {
            slug
            id
            published
            category {
              id
              title
              slug
            }
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      const parent = node.category ? node.category.slug : 'articles'
      createPage({
        path: `/${parent}/${node.slug}`,
        component: path.resolve(`src/templates/article.tsx`),
        context: {
          id: node.id,
        },
      });
    });
  });

  const getCategories = makeRequest(graphql, `
    {
      allStrapiCategory {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.allStrapiCategory.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.slug}`,
        component: path.resolve(`src/templates/category.tsx`),
        context: {
          id: node.id,
        },
      });
    });
  });

  // Query for recipe nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getCategories,
  ])
};