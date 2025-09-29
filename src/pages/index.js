import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { FORMAT_DURATION } from "../constants/utils";
import Layout from "../_common/layout";
import { LazyTerminalTypeEffect } from "../constants/utils/terminalTypeEffect";

const IndexPage = () => {
	const { t } = useTranslation();
	return (
		<Layout title={t("cv.name")} description={t("cv.title")}>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 border-b border-slate-200 dark:border-slate-700">
				<div className="block w-full">
					<LazyTerminalTypeEffect
						animationType="shuffle"
						duration={300}
						element="h1"
						className="text-7xl/15 font-bold text-slate-800 dark:text-slate-100 max-w-xs min-h-[7.5rem] font-[Rubik] tracking-tighter"
						fallback={<h1 className="text-7xl/15 font-bold text-slate-800 dark:text-slate-100 max-w-xs min-h-[7.5rem] font-[Rubik] tracking-tighter">{t("cv.name")}</h1>}>
						{t("cv.name")}
					</LazyTerminalTypeEffect>
				</div>
				<div className="block mt-auto">
					<p className="text-[1.5em] text-slate-800 dark:text-slate-100 mb-0">{t("location")}</p>
					<LazyTerminalTypeEffect animationType="shuffle" duration={300} element="p" className="text-[1.5em] text-slate-800 dark:text-slate-100 font-bold mt-0 mb-0 w-full">
						{t("cv.title")}
					</LazyTerminalTypeEffect>
					<LazyTerminalTypeEffect element="a" href="https://www.linkedin.com/in/mariavaragilal" target="_blank" rel="noopener noreferrer" className="text-[1em] text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
						linkedin.com/in/mariavaragilal
					</LazyTerminalTypeEffect>
				</div>
				<div className="text-[1em] text-slate-600 dark:text-slate-300 mt-auto sm:col-span-2 lg:col-span-1 flex gap-y-1 gap-x-6 lg:gap-x-0 flex-wrap">
					<p className="flex flex-wrap gap-x-2">
						🔗
						<LazyTerminalTypeEffect element="a" href="https://codepen.io/mariavaragilal" target="_blank" rel="noopener noreferrer" className="text-[1em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
							codepen.io/mariavaragilal
						</LazyTerminalTypeEffect>
					</p>
					<p className="flex flex-wrap gap-x-2 lg:w-full">
						🏀
						<LazyTerminalTypeEffect element="a" href="https://dribbble.com/mariavaragilal" target="_blank" rel="noopener noreferrer" className="text-[1em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
							dribbble.com/mariavaragilal
						</LazyTerminalTypeEffect>
					</p>
					<p className="flex flex-wrap gap-x-2">
						🐝
						<LazyTerminalTypeEffect element="a" href="https://be.net/mariavaragilal" target="_blank" rel="noopener noreferrer" className="text-[1em] text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
							be.net/mariavaragilal
						</LazyTerminalTypeEffect>
					</p>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
				{/* Left Column */}
				<div className="p-8 space-y-12 border-r border-slate-200 dark:border-slate-700">
					{/* About Section */}
					<section>
						<LazyTerminalTypeEffect animationType="futuristic" element="h2" className="font-[Rubik] tracking-tighter text-4xl text-slate-800 dark:text-slate-100 font-bold mb-3">
							{t("nav.about")}
						</LazyTerminalTypeEffect>
						<p className="text-[1em] mb-4 text-slate-800 dark:text-slate-200">{t("cv.summary")}</p>
						<blockquote className="text-[1em] font-bold mb-4 text-slate-800 dark:text-slate-200">{t("about.quote")}</blockquote>
						<p className="text-[1em] text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{t("about.description1")}</p>
						<p className="text-[1em] text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{t("about.description2")}</p>
						<div className="flex flex-wrap gap-2">
							<span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[.875em]">{t("about.skills.productDesign")}</span>
							<span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[.875em]">{t("about.skills.userInterface")}</span>
							<span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[.875em]">{t("about.skills.userExperience")}</span>
							<span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[.875em]">{t("about.skills.react")}</span>
							<span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-[.875em]">{t("about.skills.redux")}</span>
						</div>
					</section>

					{/* Education Section */}
					<section>
						<LazyTerminalTypeEffect animationType="futuristic" element="h2" className="font-[Rubik] tracking-tighter text-4xl text-slate-800 dark:text-slate-100 font-bold mb-3">
							{t("nav.education")}
						</LazyTerminalTypeEffect>
						<div className="space-y-4">
							<div className=" pb-4 border-b border-slate-200 dark:border-slate-700">
								<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 pr-4 leading-tight font-bold">
									<LazyTerminalTypeEffect element="a" href="https://www.ulusiada.pt" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
										{t("education.university.name")}
									</LazyTerminalTypeEffect>
								</h3>
								<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("education.university.degree")}</p>
								<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("education.university.period")}</p>
							</div>
							<div>
								<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
									<LazyTerminalTypeEffect element="a" href="https://flag.pt/academias" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
										{t("education.academy.name")}
									</LazyTerminalTypeEffect>
								</h3>
								<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("education.academy.degree")}</p>
								<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("education.academy.period")}</p>
							</div>
						</div>
					</section>

					{/* Awards Section */}
					<section>
						<LazyTerminalTypeEffect animationType="line" element="h2" className="font-[Rubik] tracking-tighter text-4xl text-slate-800 dark:text-slate-100 font-bold mb-3">
							{t("nav.awards")}
						</LazyTerminalTypeEffect>
						<div className="space-y-4">
							<div className=" pb-4 border-b border-slate-200 dark:border-slate-700">
								<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
									<LazyTerminalTypeEffect element="a" href="https://www.canneslions.com/festival" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
										{t("awards.younglions.name")}
									</LazyTerminalTypeEffect>
								</h3>
								<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("awards.younglions.award")}</p>
								<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("awards.younglions.date")}</p>
							</div>
							<div>
								<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
									<LazyTerminalTypeEffect element="a" href="https://www.behance.net/mariavaragilal" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
										{t("awards.behance.name")}
									</LazyTerminalTypeEffect>
								</h3>
								<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("awards.behance.award")}</p>
								<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("awards.behance.date")}</p>
							</div>
						</div>
					</section>
				</div>

				{/* Right Column - Work */}
				<div className="p-8 lg:pr-10 lg:pl-4 space-y-16 lg:col-span-2">
					{/* Experience Section */}
					<section>
						<LazyTerminalTypeEffect animationType="line" element="h2" className="font-[Rubik] tracking-tighter text-4xl text-slate-800 dark:text-slate-100 font-bold mb-3">
							{t("nav.experience")}
						</LazyTerminalTypeEffect>
						<div className="space-y-12">
							{/* Securibox */}
							<div className="pb-12 border-b border-slate-200 dark:border-slate-700">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
									<div className="block">
										<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
											<LazyTerminalTypeEffect element="a" href="https://www.securibox.eu" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
												{t("experience.securibox.company")}
											</LazyTerminalTypeEffect>
										</h3>
										<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("experience.securibox.location")}</p>
										<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("experience.securibox.period")}</p>
										<p className="text-[.875em] text-slate-600 dark:text-slate-300">{FORMAT_DURATION("2015-09-01")}</p>
									</div>
									<div className="block">
										<h4 className="text-[1.125em] font-bold text-slate-800 dark:text-slate-100 mb-2">{t("experience.securibox.position")}</h4>
										<ul className="text-[1em] text-slate-600 dark:text-slate-300 space-y-1">
											{Array.isArray(t("experience.securibox.description", { returnObjects: true })) ? t("experience.securibox.description", { returnObjects: true }).map((item, index) => <li key={index}>- {item}</li>) : null}
										</ul>
									</div>
								</div>
							</div>

							{/* YoungNetwork Group */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-slate-200 dark:border-slate-700">
								<div>
									<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
										<LazyTerminalTypeEffect element="a" href="https://www.youngnetworkgroup.com/" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
											{t("experience.youngnetwork.company")}
										</LazyTerminalTypeEffect>
									</h3>
									<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("experience.youngnetwork.location")}</p>
									<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("experience.youngnetwork.period")}</p>
									<p className="text-[.875em] text-slate-600 dark:text-slate-300">{FORMAT_DURATION("2013-01-01", "2015-09-01")}</p>
								</div>
								<div>
									<h4 className="text-[1.125em] font-bold text-slate-800 dark:text-slate-100 mb-2">{t("experience.youngnetwork.position")}</h4>
									<ul className="text-[1em] text-slate-600 dark:text-slate-300 space-y-1">
										{Array.isArray(t("experience.youngnetwork.description", { returnObjects: true })) ? t("experience.youngnetwork.description", { returnObjects: true }).map((item, index) => <li key={index}>- {item}</li>) : null}
									</ul>
								</div>
							</div>

							{/* InfoPortugal S.A. */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12 border-b border-slate-200 dark:border-slate-700">
								<div>
									<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">
										<LazyTerminalTypeEffect element="a" href="https://www.infoportugal.pt" target="_blank" rel="noopener noreferrer" className="text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
											{t("experience.infoportugal.company")}
										</LazyTerminalTypeEffect>
									</h3>
									<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("experience.infoportugal.location")}</p>
									<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("experience.infoportugal.period")}</p>
									<p className="text-[.875em] text-slate-600 dark:text-slate-300">{FORMAT_DURATION("2012-09-01", "2013-01-01")}</p>
								</div>
								<div>
									<h4 className="text-[1.125em] font-bold text-slate-800 dark:text-slate-100 mb-2">{t("experience.infoportugal.position")}</h4>
									<ul className="text-[1em] text-slate-600 dark:text-slate-300 space-y-1">
										{Array.isArray(t("experience.infoportugal.description", { returnObjects: true })) ? t("experience.infoportugal.description", { returnObjects: true }).map((item, index) => <li key={index}>- {item}</li>) : null}
									</ul>
								</div>
							</div>

							{/* Cofina media */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<h3 className="text-[1.25em] text-slate-800 dark:text-slate-100 font-bold">{t("experience.cofina.company")}</h3>
									<p className="text-[1em] text-slate-600 dark:text-slate-300">{t("experience.cofina.location")}</p>
									<p className="text-[1em] text-slate-600 dark:text-slate-300 mt-2">{t("experience.cofina.period")}</p>
									<p className="text-[.875em] text-slate-600 dark:text-slate-300">{FORMAT_DURATION("2012-07-01", "2012-08-01")}</p>
								</div>
								<div>
									<h4 className="text-[1.125em] font-bold text-slate-800 dark:text-slate-100 mb-2">{t("experience.cofina.position")}</h4>
									<ul className="text-[1em] text-slate-600 dark:text-slate-300 space-y-1">
										{Array.isArray(t("experience.cofina.description", { returnObjects: true })) ? t("experience.cofina.description", { returnObjects: true }).map((item, index) => <li key={index}>- {item}</li>) : null}
									</ul>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Layout>
	);
};

export default IndexPage;
