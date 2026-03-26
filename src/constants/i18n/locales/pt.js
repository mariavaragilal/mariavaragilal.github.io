import fourOhFourPt from './404.pt.json';
import cvPt from './cv.pt.json';
import mvPt from './mv.pt.json';

const pt = { ...cvPt, ...fourOhFourPt, mv: Object.assign({}, mvPt) };

export default pt;	
