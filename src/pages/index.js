import React, { useState } from 'react';
import { Link } from 'gatsby';
import Layout from '../_common/layout';
import Copyright from '../_common/components/copyright';
import { LazyTerminalTypeEffect } from '../constants/utils/terminalTypeEffect';
import { cases } from '../constants/data/cases';

const IndexPage = () => {
	const [openAppIndex, setOpenAppIndex] = useState(null);
	const toggleApp = (index) =>  setOpenAppIndex(openAppIndex === index ? null : index);
	
	return (
		<Layout title='Maria Varagilal' description='Digital Product Designer & Frontend Developer'>
			<div className='max-w-5xl lg:max-w-full m-auto shadow-lg rounded-lg relative w-full bg-white dark:bg-slate-900'>

				<main>
					<section className='border-b border-slate-200 dark:border-slate-800 px-6 py-12 lg:px-12 lg:py-16'>
						<div className='mx-auto grid max-w-full items-baseline-start gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]'>
							<div className='space-y-6'>
								<div className='flex flex-wrap text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400'>
									<span className='mr-4'>Lisbon</span>
									<span className='mr-4 before:mr-4 before:text-slate-500 before:content-["·"]'>B2B SaaS · Fintech</span>
								</div>
								<LazyTerminalTypeEffect
									animationType='shuffle'
									duration={300}
									element='h1'
									className='font-[Rubik] font-medium text-[clamp(52px,6vw,110px)] leading-tight tracking-tight text-slate-900 dark:text-slate-50 -mb-1 block min-h-[1.2em]'
									fallback={<h1 className='font-[Rubik] font-medium text-[clamp(52px,8vw,110px)] leading-tight tracking-tight text-slate-900 dark:text-slate-50 -mb-1'>Maria Varagilal</h1>}>
									Maria Varagilal
								</LazyTerminalTypeEffect>
								<p
									className='text-xl font-[Rubik] tracking-wide text-slate-800 dark:text-slate-300'>
									Head Digital Product Designer & Frontend Implementer · Securibox
								</p>
								<p className='max-w-2xl text-xl leading-relaxed text-slate-500 dark:text-slate-400'>
									+ 10 years turning SaaS products into single unified platforms — through strategy, design systems, and React.
								</p>
							</div>
							<div className='grid grid-cols-2 gap-px rounded border border-slate-200 dark:border-slate-800 bg-slate-200 dark:bg-slate-800'>
								<div className='bg-slate-50 px-5 py-6 dark:bg-slate-950 flex flex-col justify-center'>
									<div className='font-[Rubik] font-medium text-[clamp(1.2rem,2.5vw,1.75rem)] text-slate-900 mt-auto dark:text-slate-50'>↑ Scaled</div>
									<div className='mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										Brand consistency score
									</div>
								</div>
								<div className='bg-slate-50 px-5 py-6 dark:bg-slate-950 flex flex-col justify-center'>
									<div className='font-[Rubik] font-medium text-[clamp(1.2rem,2.5vw,1.75rem)] text-slate-900 mt-auto dark:text-slate-50'>↓ Reduced</div>
									<div className='mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										Task completion time
									</div>
								</div>
								<div className='bg-slate-50 px-5 py-6 dark:bg-slate-950 flex flex-col justify-center'>
									<div className='font-[Rubik] font-medium text-[clamp(1.2rem,2.5vw,1.75rem)] text-slate-900 mt-auto dark:text-slate-50'>↓ Reduced</div>
									<div className='mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										UI issues
									</div>
								</div>
								<div className='bg-slate-50 px-5 py-6 dark:bg-slate-950 flex flex-col justify-center'>
									<div className='font-[Rubik] font-medium text-[clamp(1.2rem,2.5vw,1.75rem)] text-slate-900 mt-auto dark:text-slate-50'>~15 yrs</div>
									<div className='mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										Experience
									</div>
								</div>
							</div>
						</div>
					</section>

					<section id='framework' className='dark:border-slate-800 px-6 py-16 lg:px-12'>
						<div className='mx-auto max-w-full'>
							<LazyTerminalTypeEffect
								animationType='line'
								element='p'
								className='mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400'>
								My playbook · MVP
							</LazyTerminalTypeEffect>
							<LazyTerminalTypeEffect
								animationType='futuristic'
								element='h2'
								className='mb-10 font-[Rubik] font-medium text-[3vw] leading-tight text-slate-900 dark:text-slate-50'>
								The MVP Framework
							</LazyTerminalTypeEffect>
							<div className='mb-10 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]'>
								<div className='space-y-4 text-[1.125rem] leading-relaxed text-slate-800 dark:text-slate-400'>
									<p className='font-bold'> MVP — Maria Varagilal Playbook Framework</p>
									<p>
										Growth creates complexity. When a single product becomes a platform of interconnected solutions, the biggest risk is losing the feeling of one
										company.
									</p>
								</div>
								<p className='text-[1.125rem] leading-relaxed text-slate-600 dark:text-slate-400'>
								The MVP Framework is the system I've developed and refined throughout my career — the lens through which I guide my process, approach every design and product decision. Applied across strategy, design, implementation, and rollout — not just documentation. It systematically eliminates that risk, creating visual, functional, and emotional consistency that builds enterprise trust, speeds delivery, and scales with the business.
								</p>
							</div>
							<div className='divide-y divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800'>
								<div className='grid gap-8 py-7 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)]'>
									<span className='text-[0.8rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										01
									</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
										Brand & Experience Cohesion Audit
									</h3>
									<p className='leading-relaxed text-slate-500 dark:text-slate-400'>
										Map every touchpoint — portals, mobile, emails, onboarding, internal tools. Score visual and UX consistency and surface fragmentation risks
										before they cost clients.
									</p>
								</div>
								<div className='grid gap-8 py-7 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)]'>
									<span className='text-[0.8rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										02
									</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
										Unified Brand Principles
									</h3>
									<p className='leading-relaxed text-slate-500 dark:text-slate-400'>
										Distill company vision into 4–6 actionable principles every designer, developer, and stakeholder can reference instantly. At Securibox:
										Trust through Clarity · Precision in Every Interaction · Seamless Flow · Accessible by Default.
									</p>
								</div>
								<div className='grid gap-8 py-7 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)]'>
									<span className='text-[0.8rem] uppercase tracking-[0.16em] text-slate-400'>
										03
									</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
										Priority & Flow Architecture
									</h3>
									<p className='leading-relaxed text-slate-500 dark:text-slate-400'>
										A 2×2 matrix (Business Value vs. User Friction) decides what gets unified first. High Value + High Friction ships first — shared auth, core
										navigation, document viewer. Low-friction items come later.
									</p>
								</div>
								<div className='grid gap-8 py-7 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)]'>
									<span className='text-[0.8rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										04
									</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
										Design-Language Implementation
									</h3>
									<p className='leading-relaxed text-slate-500 dark:text-slate-400'>
									The design language flows from strategy into production. Instead of documentation alone, I bridge design and implementation so it reaches the product — teams get something they can ship, not just specifications.
									</p>
								</div>
								<div className='grid gap-8 py-7 md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)]'>
									<span className='text-[0.8rem] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>
										05
									</span>
									<h3 className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
										Continuous Alignment & Measurement
									</h3>
									<p className='leading-relaxed text-slate-500 dark:text-slate-400'>
									Ongoing loop that keeps strategy, execution, and outcomes moving in the same direction so the unified brand stays alive.
									</p>
								</div>
							</div>
							<div className='mt-9 rounded border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/40 px-6 py-5'>
								<p className='text-[14px] italic leading-relaxed text-slate-900 dark:text-slate-100'>
								The pillars are designed to be universally applicable. I can walk into any B2B SaaS with fragmented solutions and run the same 5-step process — delivering the same order-of-magnitude improvements in consistency, speed, and enterprise perception.
								</p>
							</div>
						</div>
					</section>

					<section id='applications' className='rounded-xl m-4 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-6 py-12 lg:px-10'>
						<div className='mx-auto max-w-full'>
							<LazyTerminalTypeEffect
								animationType='line'
								element='p'
								className='mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400'>
								Framework in action
							</LazyTerminalTypeEffect>
							<LazyTerminalTypeEffect
								animationType='futuristic'
								element='h2'
								className='mb-8 font-[Rubik] font-medium text-[3vw] leading-tight text-slate-900 dark:text-slate-50'>
								Real Applications
							</LazyTerminalTypeEffect>
							<div className='divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800'>
								{cases.map((app, index) => {
									const isOpen = openAppIndex === index;
									return (
										<div key={app.title}>
											<button
												type='button'
												className='flex w-full items-center gap-6 px-1 py-5 text-left md:grid md:grid-cols-[152px_minmax(0,1fr)_24px]'
												onClick={() => toggleApp(index)}
											>
												<span className='text-[0.8rem] text-slate-500 dark:text-slate-400'>
													{app.period}
												</span>
												<div className='flex items-center gap-4'>
													{app.logo ? (
														<img src={app.logo} alt='' className='h-10 w-auto object-contain' onError={(e) => (e.target.style.display = 'none')}/>
													) : null}
													<div>
														<div className='font-[Rubik] text-[clamp(1.2rem,2.5vw,1.5rem)] font-medium text-slate-900 dark:text-slate-100'>
															{app.title}
														</div>
														<div className='text-[11.5px] text-slate-500 dark:text-slate-400'>
															{app.subtitle}
														</div>
													</div>
												</div>
												<span className={'ml-auto text-lg text-slate-500 dark:text-slate-400 transition-transform ' + (isOpen ? 'rotate-45 text-slate-900 dark:text-slate-100' : '')}>
													+
												</span>
											</button>
											{isOpen ? (
												<div className='px-1 pb-6'>
													<div className='grid gap-6 mb-8 md:grid-cols-[152px_minmax(0,1fr)]'>
														<div>
															<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-500'>
																Pillars
															</p>
															<p className='text-[12px] text-slate-500 dark:text-slate-400'>
																{app.pillars}
															</p>
														</div>
														<div>
															<p className='mb-3 italic leading-relaxed text-slate-500 dark:text-slate-400'>
																&quot;{app.highlight}&quot;
															</p>
															<div className='flex flex-wrap gap-2'>
																{app.results.map((result) => (
																	<span
																		key={result}
																		className='border border-slate-300 dark:border-slate-700 px-3 py-1 text-[0.8rem] text-slate-900 dark:text-slate-100'
																	>
																		{result}
																	</span>
																))}
															</div>
														</div>
													</div>
													{app.caseStudy ? (
														<div className='rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 bg-white dark:bg-slate-900 px-6 py-8 lg:px-10'>
															<p className='mb-6 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400'>
																My Decision-Making System
															</p>
															<div className='space-y-6'>
																<div>
																	<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>My Role</p>
																	<p className='text-[0.9rem] text-slate-700 dark:text-slate-300'>{app.caseStudy.role}</p>
																	<p className='text-[0.8rem] text-slate-500 dark:text-slate-400'>{app.caseStudy.tools}</p>
																</div>
																<div>
																	<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Business Problem</p>
																	<p className='text-[0.9rem] leading-relaxed text-slate-600 dark:text-slate-400'>{app.caseStudy.businessProblem}</p>
																</div>
																{app.caseStudy.strategicDecision ? (
																	<div className='rounded border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-6 py-5'>
																		<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>My Strategic Decision</p>
																		<p className='mb-2 text-[0.9rem] text-slate-600 dark:text-slate-400'>{app.caseStudy.strategicDecision.intro}</p>
																		<p className='font-[Rubik] font-medium text-[17px] italic leading-snug text-slate-900 dark:text-slate-50'>{app.caseStudy.strategicDecision.question}</p>
																	</div>
																) : null}
																{app.caseStudy.process && app.caseStudy.process.length ? (
																	<div>
																		<p className='mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Process</p>
																		<div className='divide-y divide-slate-200 dark:divide-slate-800'>
																			{app.caseStudy.process.map((p) => (
																				<div key={p.phase + p.duration} className='grid gap-3 py-3 sm:grid-cols-[100px_minmax(0,1fr)]'>
																					<div>
																						<p className='text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400'>{p.phase}</p>
																						<p className='text-[11px] text-slate-600 dark:text-slate-500'>{p.duration}</p>
																					</div>
																					<div>
																						<p className='font-medium text-slate-900 dark:text-slate-100'>{p.title}</p>
																						<p className='text-[12px] leading-relaxed text-slate-500 dark:text-slate-400'>{p.description}</p>
																					</div>
																				</div>
																			))}
																		</div>
																	</div>
																) : null}
																{app.caseStudy.implementation ? (
																	<div>
																		<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Implementation & Technical Handoff</p>
																		{app.caseStudy.implementation.split('\n\n').map((para, i) => (
																			<p key={i} className='text-[0.9rem] leading-relaxed text-slate-600 dark:text-slate-400 last:mb-4'>{para}</p>
																		))}
																	</div>
																) : null}
																{app.caseStudy.resultsMetrics && app.caseStudy.resultsMetrics.length ? (
																	<div>
																		<p className='mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Results & Metrics</p>
																		<ul className='space-y-1 text-[0.9rem] text-slate-900 dark:text-slate-100'>
																			{app.caseStudy.resultsMetrics.map((m) => (
																				<li key={m}>{m}</li>
																			))}
																		</ul>
																	</div>
																) : null}
																{app.caseStudy.tradeoffsLearnings ? (
																	<div>
																		<p className='mb-1 text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>Trade-offs & Learnings</p>
																		{app.caseStudy.tradeoffsLearnings.split('\n\n').map((para, i) => (
																			<p key={i} className='text-[0.9rem] leading-relaxed text-slate-600 dark:text-slate-400 last:mb-4'>{para}</p>
																		))}
																	</div>
																) : null}
																{app.caseStudy.quote ? (
																	<p className='border-l-2 border-slate-300 dark:border-slate-700 pl-4 font-[Rubik] font-medium text-[clamp(1.1rem,2vw,1.4rem)] italic leading-relaxed text-slate-900 dark:text-slate-100'>
																		{app.caseStudy.quote}
																	</p>
																) : null}
															</div>
														</div>
													) : null}
												</div>
											) : null}
										</div>
									);
								})}
							</div>
						</div>
					</section>


					<section className='px-6 py-16 lg:px-12'>
						<div className='mx-auto max-w-full grid gap-10 md:grid-cols-2'>
							<div>
								<p className='mb-3 text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400'>
									Get in touch
								</p>
								<h2 className='mb-4 font-[Rubik] font-medium text-[24px] leading-tight text-slate-900 dark:text-slate-50 sm:text-[28px]'>
									Let&apos;s build something that lasts.
								</h2>
								<p className='max-w-2xl mb-6 text-[0.9rem] leading-relaxed text-slate-500 dark:text-slate-400'>
									From brand principles to production code — I build unified experiences that create cohesion, scale with the business, and stay alive even as teams change.
								</p>
								<div className='flex flex-wrap gap-3'>
									<a
										href='https://www.linkedin.com/in/mariavaragilal'
										target='_blank'
										rel='noreferrer'
										className='inline-block bg-slate-100 px-5 py-2 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-slate-900 hover:opacity-90'
									>
										LinkedIn ↗
									</a>
									<Link
										to='/cv'
										className='inline-block border border-slate-400 dark:border-slate-600 px-5 py-2 text-[0.8rem] uppercase tracking-[0.18em] text-slate-900 dark:text-slate-100 hover:border-slate-600 dark:hover:border-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
									>
										Full CV
									</Link>
								</div>
							</div>
							<div>
								<a
									href='https://dribbble.com/mariavaragilal'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3 text-sm text-slate-700 dark:text-slate-200'
								>
									<span className='text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
										Dribbble
									</span>
									<span className='text-[12px] text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-50'>
										dribbble.com/mariavaragilal →
									</span>
								</a>
								<a
									href='https://codepen.io/mariavaragilal'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3 text-sm text-slate-700 dark:text-slate-200'
								>
									<span className='text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
										CodePen
									</span>
									<span className='text-[12px] text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-50'>
										codepen.io/mariavaragilal →
									</span>
								</a>
								<a
									href='https://be.net/mariavaragilal'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3 text-sm text-slate-700 dark:text-slate-200'
								>
									<span className='text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
										Behance
									</span>
									<span className='text-[12px] text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-50'>
										be.net/mariavaragilal →
									</span>
								</a>
								<a
									href='https://linkedin.com/in/mariavaragilal'
									target='_blank'
									rel='noreferrer'
									className='flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3 text-sm text-slate-700 dark:text-slate-200'
								>
									<span className='text-[10px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400'>
										LinkedIn
									</span>
									<span className='text-[12px] text-slate-900 dark:text-slate-100 hover:text-slate-900 dark:hover:text-slate-50'>
										linkedin.com/in/mariavaragilal →
									</span>
								</a>
							</div>
						</div>
					</section>
				</main>

				<footer className='border-t border-slate-200 dark:border-slate-800 px-6 py-5 text-[0.8rem] text-slate-600 dark:text-slate-500 lg:px-12'>
					<div className='mx-auto flex max-w-full flex-col justify-between gap-2 sm:flex-row'>
						<Copyright />
					</div>
				</footer>
			</div>
		</Layout>
	);
};

export default IndexPage;
