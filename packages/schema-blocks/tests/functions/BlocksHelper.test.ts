import { dispatch, select } from "@wordpress/data";
import { BlockInstance } from "@wordpress/blocks";

import { removeBlock, restoreBlock, getBlockType, getHumanReadableBlockName } from "../../src/functions/BlockHelper";

const blockTypes: Record<string, string> = {};

jest.mock( "@wordpress/data", () => {
	return {
		select: jest.fn( () => {
			return {
				getBlockType: jest.fn( ( blockName ) => {
					const title = blockTypes[ blockName ];
					if ( title ) {
						return { title };
					}
					return null;
				} ),
			};
		} ),
		dispatch: jest.fn( () => {
			return {
				removeBlock: jest.fn(),
				replaceBlock: jest.fn(),
			};
		} ),
	};
} );

jest.mock( "@wordpress/blocks", () => {
	return {
		createBlock: jest.fn(),
	};
} );

describe( "The removeBlock function", () => {
	it( "removes a block", () => {
		removeBlock( "1234-abcd" );

		expect( dispatch ).toHaveBeenCalledWith( "core/block-editor" );
	} );
} );

describe( "The restoreBlock function", () => {
	it( "restores a block", () => {
		const blockToRestore = {
			clientId: "1234-abcd",
			isValid: true,
			name: "yoast/recipe",
			attributes: { className: "yoast-recipe" },
			innerBlocks: [
				{
					clientId: "5678-efgh",
					isValid: true,
					name: "yoast/steps",
					attributes: {},
					innerBlocks: [],
				} as BlockInstance,
			],
		} as BlockInstance;

		restoreBlock( "1234-abcd", blockToRestore );

		expect( dispatch ).toHaveBeenCalledWith( "core/block-editor" );
	} );
} );

describe( "The getBlockType function", () => {
	it( "retrieves the blocktype for the given name", () => {
		getBlockType( "yoast/recipe" );

		expect( select ).toHaveBeenCalledWith( "core/blocks" );
	} );
} );

describe( "The sanitizeBlockName method ", () => {
	it( "returns a block title from the wordpress store based on its name", () => {
		blockTypes[ "yoast/testblock" ] = "testBlockWithoutPrefix";

		const result = getHumanReadableBlockName( "yoast/testblock" );

		expect( result ).toEqual( "testBlockWithoutPrefix" );
	} );

	it( "uses a fallback method to reduce technical block names to human-readable ones.", () => {
		const testcases = [
			"test/blok",
			"test-erde-test/test/blok",
			"/blok",
			"blok",
			"blok/",
		];

		const results = testcases.map( input => getHumanReadableBlockName( input ) );

		expect( results ).toEqual( [ "blok", "blok", "blok", "blok", "blok/" ] );
	} );
} );
