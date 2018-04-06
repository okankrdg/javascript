import { UPDATE_READABILITY_RESULT, SET_READABILITY_RESULTS, SET_OVERALL_SCORE_READABILITY } from "../../actions/contentAnalysis";
import { setOverallScoreReadability } from "./overallScoreReducer";
import findIndex from "lodash/findIndex";

/**
 * Initial state
 */
const initialState = {};

/**
 * Helper functions
 */

function setReadabilityResult( state, action ) {
	return Object.assign( {}, state,
		{ results: action.results },
	);
}

/**
 * Updates a readability result.
 *
 * @param {Object} state The state.
 * @param {Object} action The action.
 *
 * @returns {Object} The new results.
 */
function updateReadabilityResult( state, action ) {
	let resultIndex = findIndex( state, { id: action.result.id } );

	// Replace a result when there already is a result with the given id.
	if( resultIndex !== -1 ) {
		let newResults = state.filter( function( result ) {
			return result !== state[ resultIndex ];
		} );
		return newResults.concat( action.result );
	}
	return state.concat( action.result );
}

/**
 * Reducers
 */

/**
 * A reducer for the readability object.
 *
 * @param {Object} state The current state of the object.
 * @param {Object} action The current action received.
 * @returns {Object} The updated readability rewsults object.
 */
export function readabilityResultsReducer( state = initialState, action ) {
	switch ( action.type ) {
		case SET_READABILITY_RESULTS:
			return setReadabilityResult( state, action );
		case UPDATE_READABILITY_RESULT:
			return updateReadabilityResult( state, action );
		case SET_OVERALL_SCORE_READABILITY:
			return setOverallScoreReadability( state, action );
		default:
			return state;
	}
}
