<?php
/**
 * Template Name: Modular
 */

$context = Timber::context();

$timber_post     = new Timber\Post();
$context['post'] = $timber_post;
Timber::render( array( 'page-modular.twig', 'page.twig' ), $context );
