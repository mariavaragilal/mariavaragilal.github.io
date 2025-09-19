import React from "react";
import { Helmet } from "react-helmet";

const Seo = () => {
	return (
		<Helmet>
			<html lang="en" />
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta itemprop="name" content="Maria Varagilal: CV" />
			<title>Maria Varagilal: CV</title>
			<meta name="description" content="Digital Product Designer & Frontend Dev | UI/UX · React · Redux · Design Systems" />
			<meta name="keywords" content="Maria Varagilal, Digital Product Designer, Frontend Dev, UI, UX, React, Redux, Design Systems" />
			<meta name="author" content="Maria Varagilal" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1" user-scalable="no" />
			<link rel="icon" type="image/png" href="/images/avatar.png" />
			<link rel="apple-touch-icon" href="/images/avatar.png" />
			<meta property="og:image" content="/images/avatar.png" />
			<meta name="twitter:card" content="summary_large_image" />
		</Helmet>
	);
};

export default Seo;
