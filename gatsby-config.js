require(`dotenv`).config();

module.exports = {
  siteMetadata: {
    title: `GraphCMS SWAG Store`,
    description: `Super cool SWAG from your favourite GraphQL CMS!`,
    siteUrl: `https://store.graphcms.com`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/main.css'],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `GraphCMS`,
        fieldName: `cms`,
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_QUERY_TOKEN}`,
        },
      },
    },
    {
      resolve: `gatsby-source-printful`,
      options: {
        apiKey: process.env.PRINTFUL_API_KEY,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-stripe`,
    `gatsby-plugin-react-helmet`,
  ],
};
