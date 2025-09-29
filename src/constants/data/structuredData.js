export const personStructuredData = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Maria Varagilal",
	jobTitle: "Digital Product Designer",
	description: "Digital Product Designer & Frontend Developer with 10+ years of experience delivering digital products from concept to production. Skilled in design systems, UX strategy, and frontend implementation using JavaScript, React, Redux, HTML, and CSS.",
	url: "https://mariavaragilal.github.io",
	image: "https://mariavaragilal.github.io/images/avatar.png",
	sameAs: ["https://www.linkedin.com/in/mariavaragilal", "https://codepen.io/mariavaragilal", "https://dribbble.com/mariavaragilal", "https://be.net/mariavaragilal"],
	address: {
		"@type": "PostalAddress",
		addressLocality: "Lisbon",
		addressCountry: "Portugal",
	},
	knowsAbout: ["User Experience Design", "User Interface Design", "Product Design", "React", "Redux", "JavaScript", "Design Systems", "Frontend Development"],
	hasOccupation: {
		"@type": "Occupation",
		name: "Digital Product Designer",
		description: "Designs and develops digital products from concept to production",
		skills: ["UX Design", "UI Design", "React", "JavaScript", "Design Systems"],
	},
	alumniOf: [
		{
			"@type": "EducationalOrganization",
			name: "Universidade Lusíada de Lisboa",
			description: "Bachelor's Degree in Design",
		},
		{
			"@type": "EducationalOrganization",
			name: "Academia Flag",
			description: "Pós-Graduação in Design Comunicação",
		},
	],
	worksFor: {
		"@type": "Organization",
		name: "Securibox",
		url: "https://www.securibox.eu",
		description: "Head Digital Product Designer",
	},
	award: [
		{
			"@type": "Award",
			name: "Bronze cyber",
			description: "Young Lions Portugal",
			datePublished: "2014-05-01",
		},
		{
			"@type": "Award",
			name: "Web Design Served",
			description: "Behance",
			datePublished: "2013-07-01",
		},
	],
};

export const websiteStructuredData = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: personStructuredData.name + "—" + personStructuredData.jobTitle,
	description: "CV of Maria Varagilal, Digital Product Designer & Frontend Developer",
	url: personStructuredData.url,
	author: {
		"@type": "Person",
		name: "Maria Varagilal",
	},
	inLanguage: ["en", "pt"],
	copyrightYear: new Date().getFullYear(),
	publisher: {
		"@type": "Person",
		name: "Maria Varagilal",
	},
};
