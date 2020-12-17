<?php
/**
 * Populate ACF select field options with Gravity Forms forms
 */
function acf_load_form_choices( $field ) {
	if ( class_exists( 'GFFormsModel' ) ) {
		$choices = [];

		foreach ( \GFFormsModel::get_forms() as $form ) {
			$choices[ $form->id ] = $form->title;
		}

		$field['choices'] = $choices;
	}

	return $field;
}
add_filter( 'acf/load_field/name=form', 'acf_load_form_choices' );
