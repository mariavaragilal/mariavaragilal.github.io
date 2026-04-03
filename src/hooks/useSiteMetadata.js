import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
	const { site } = useStaticQuery(graphql`
		query SiteMetadataQuery {
			site {
				siteMetadata {
					siteUrl
					author
					image
					social {
						linkedin
						dribbble
						codepen
						behance
						github
					}
					address {
						locality
						country
					}
					knowsAbout
					skills
					education {
						name
						description
					}
					worksFor {
						name
						url
						description
					}
					awards {
						name
						description
						date
					}
				}
			}
		}
	`);
	return site.siteMetadata;
};
