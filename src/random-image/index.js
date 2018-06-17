//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const {
	AlignmentToolbar,
	BlockControls,
	registerBlockType,
	InspectorControls
} = wp.blocks;
const {
	PanelBody,
	PanelRow
} = wp.components;
const {
	Fragment
} = wp.element;

function RandomImage( { category, filter } ) {
	if(filter) {
		filter = '/' + filter;
	}
	const src = 'https://placeimg.com/320/220/' + category + filter;
	return <img src={ src } alt={ category } />;
}

registerBlockType( 'cgb/block-random-image', {
	title: __( 'Random Image' ),
	icon: 'format-image',
	category: 'common',
	keywords: [
		__( 'random' ),
		__( 'image' )
	],
	attributes: {
		category: {
			type: 'string',
			default: 'nature'
		},
		categoryAlign: {
			type: 'string',
			default: ''
		},
		imageFilter: {
			type: 'string',
			default: ''
		}
	},
	edit: function( props ) {
		const { attributes: { category, categoryAlign, imageFilter }, setAttributes, isSelected } = props;

		function setCategory( event ) {
			const selected = event.target.querySelector( '#image-category option:checked' );
			setAttributes( { category: selected.value } );
			event.preventDefault();
		}

		function setFilter( event ) {
			const selected = event.target.querySelector( '#image-filter option:checked' );
			setAttributes( { imageFilter: selected.value } );
			event.preventDefault();
		}

		function showForm() {
			return (
				<form onSubmit={ setCategory } style={ {textAlign: categoryAlign} }>
					<select id="image-category" value={ category } onChange={ setCategory }>
						<option value="animals">Animals</option>
						<option value="arch">Architecture</option>
						<option value="nature">Nature</option>
						<option value="people">People</option>
						<option value="tech">Tech</option>
					</select>
				</form>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __('Image Settings') }>
						<PanelRow>
							<label>Set Filter</label>
							{ showForm() }
						</PanelRow>
						<PanelRow>
							<label>Set Filter</label>
							<form onSubmit={ setFilter }>
								<select id="image-filter" value={ imageFilter } onChange={ setFilter }>
									<option value="">None</option>
									<option value="sepia">Sepia</option>
									<option value="grayscale">Grayscale</option>
								</select>
							</form>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<div className={ props.className }>
					<BlockControls>
						<AlignmentToolbar
							value={ categoryAlign }
							onChange={ value => setAttributes( { categoryAlign: value } ) }
						/>
					</BlockControls>
					<RandomImage filter={ imageFilter } category={ category } />
					{ isSelected && ( showForm() ) }
				</div>
			</Fragment>
		);
	},
	save: function( props ) {
		const { attributes: { category, imageFilter } } = props;
		return (
		<div>
			<RandomImage filter={ imageFilter } category={ category } />
		</div>
		);
	}
} );