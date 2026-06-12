/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Big Imposter`,
    description: `A poetry studio and creative space dedicated to beating imposter syndrome through the power of poetry and expressive writing.`,
    siteUrl: `https://bigimposter.com`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
