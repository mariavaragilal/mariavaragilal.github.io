import { Blockquote, BlockquoteMain, BlockquoteSecondary } from '../../../../../../_common/components';
import { RichText } from '../../../../RichText';

export const Quote = ({ caseStudy }) => {
	const quote = caseStudy.quote;
	if (!quote) return null;
	return (
		<Blockquote>
			<BlockquoteMain><RichText text={quote.title} /></BlockquoteMain>
			{quote.subtitle ? <BlockquoteSecondary><RichText text={quote.subtitle} /></BlockquoteSecondary> : null}
		</Blockquote>
	);
};
