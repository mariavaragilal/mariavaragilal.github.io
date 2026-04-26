import { stringContainsHtmlMarkup } from '../../constants/utils/htmlString';

// Renders trusted copy from locale JSON: plain text, or HTML when the string
// contains `<` (uses dangerouslySetInnerHTML). Use for titles, leads, body, etc.
export const RichText = ({ as: Tag = 'span', className = '', style, text, ...rest }) => {
	if (text == null || text === '') return null;
	const s = String(text);
	if (stringContainsHtmlMarkup(s)) return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: s }} {...rest} />;
	return <Tag className={className} style={style} {...rest}>{s}</Tag>;
};
