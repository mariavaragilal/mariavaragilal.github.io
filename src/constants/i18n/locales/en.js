import fourOhFourEn from './404.en.json';
import cvEn from './cv.en.json';
import mvEn from './mv.en.json';

const en = { ...cvEn, ...fourOhFourEn, mv: Object.assign({}, mvEn) };

export default en;
