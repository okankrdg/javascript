import getPeriphrasticSentenceParts from "../../../helpers/passiveVoice/periphrastic/getSentenceParts.js";
import arrayToRegex from "../../../helpers/regex/createRegexFromArray";
import SentencePart from "../values/Clause";
import auxiliaries from "../config/internal/passiveVoiceAuxiliaries.js";
import stopwords from "../config/stopWords.js";

const followingAuxiliaryExceptionWords = [ "il", "i", "la", "le", "lo", "gli", "uno", "una" ];
const reflexivePronouns = [ "mi", "ti", "si", "ci", "vi" ];

const options = {
	SentencePart: SentencePart,
	stopwords: stopwords,
	auxiliaries: auxiliaries,
	regexes: {
		auxiliaryRegex: arrayToRegex( auxiliaries ),
		stopCharacterRegex: /([:,])(?=[ \n\r\t'"+\-»«‹›<>])/ig,
		followingAuxiliaryExceptionRegex: arrayToRegex( followingAuxiliaryExceptionWords ),
		directPrecedenceExceptionRegex: arrayToRegex( reflexivePronouns ),
	},
};

/**
 * Gets the sentence parts from a sentence by determining sentence breakers.
 *
 * @param {string} sentence The sentence to split up in sentence parts.
 *
 * @returns {Array} The array with all parts of a sentence that have an auxiliary.
 */
export default function getSentenceParts( sentence ) {
	return getPeriphrasticSentenceParts( sentence, options );
}
