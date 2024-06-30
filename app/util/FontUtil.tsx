// hcs: HancomSans(기본)
// bt: BinggraeTaom
// kw: 강원

import CacheUtil from "./CacheUtil";

const HANCOM_SANS = 'hcs';
const BINGGRAE_TAOM = 'bt';
const KANGWON = 'kw';

const findRegular = () => {
    const font = CacheUtil.readFont();
    if (font === null || font === undefined) {
        CacheUtil.saveFont(HANCOM_SANS);
        return HANCOM_SANS;
    } else {
        return font;
    }
}

const findBold = () => {
    return findRegular() + '-b';
}

let regular = findRegular();
let bold = findBold();

const changeDefault = (font: string) => {
    if (font === HANCOM_SANS || font === BINGGRAE_TAOM || font === KANGWON) {
        CacheUtil.saveFont(font);
        regular = font;
        bold = (font + '-b');
    }
}

export default {
    regular, bold, changeDefault
}