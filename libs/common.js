$(function() {
    'use strict';

    /* All DOM elements */
    var jqElems = {
            $previewBody: $('#preview-container'),
            
            $bodyPerspectiveControl: $('#body-perspective'),

            $grid:$('.grid'),
            $gridTransformX:$('#grid-x-transformer'),
            $gridTransformZ:$('#grid-z-transformer'),

            $image: $('.preview'),
            $imagePreview: $('#preview-image'),

            $shadow: $('.shadow'),
            $shadowTransformZ: $('#shadow-transform-z'),

            $backgroundColor: $('#background-color'),

            $controlsPanel: $('.controls'),
            $controlsToggler: $('#hide-panel')
        },

        methods = {
            /**
             * Sets perspective css3 z position
             *
             * @param {string} perspectiveValue - new perspective value, should be int
             * @param {Object} $element - jquery element (container) to appent new perspective
             */
            setNewPerspective: function(perspectiveValue, $element) {
                $element.css({
                    '-webkit-perspective': perspectiveValue + 'px',
                    '-moz-perspective': perspectiveValue + 'px',
                    'perspective': perspectiveValue
                });
            },

            /**
             * Sets new shadow css3 z position
             *
             * @param {string} newZposition - new value of z-position, should be int
             * @param {Object} $element - jquery element (shadow-container) to appent new z-position
             */
            setShadowZPosition: function(newZposition, $element) {
                $element.css({
                    '-webkit-transform': 'translateZ(' + newZposition + 'px)',
                    'transform': 'translateZ(' + newZposition + 'px)'
                });
            },

            /**
             * Background color setter
             *
             * @param {String} newColor - new HEX color
             * @param {Object} $element - jquery element (container) to appent new background color
             */
            setBgColor: function(newColor, $element) {
                $element.css({
                    'background': newColor
                });
            },

            /**
             * Sets new x and z transforms to $element
             *
             * @param {String} newXValue - new x transform value, should be int
             * @param {String} newZValue - new z transform value, should be int
             * @param {Object} $element - jquery element (container) to appent new x and z transform values
             */
            gridXandZTransform: function( newXValue, newZValue, $element ) {
                var newTransformXValue = newXValue,
                    newTransformZValue = newZValue;

                $element.css({
                    '-webkit-transform': 'rotateX(' + newTransformXValue + 'deg)' + ' rotateZ(' + newTransformZValue + 'deg)',
                    'transform': 'rotateX(' + newTransformXValue + 'deg)' + ' rotateZ(' + newTransformZValue + 'deg)'
                });
            },

            /**
             * Gets image sizes (width and height)
             *
             * @param {Object} $img - jquery DOM img object
             * @returns {Object} - $img width and height params
             */
            newImageSizes: function($img) {
                return {
                    width: $img.width(),
                    height: $img.height()
                };
            },

            /**
             * Creating new invisible for client img element to get it`s sizes
             *
             * @param {String} imgAddress - new image address
             * @param {Object} $element - image container jquery element
             * @param {Object} $image - image jquery element
             * @param {String} hiddenImagesClassName - class name for hidden image
             * @returns {Object} dimensions - width and height if a new image
             */
            createNewImage: function(imgAddress, $element, $image, hiddenImagesClassName) {
                /*killing all old elements*/
                $( '.' + hiddenImagesClassName ).remove();

                var $newImg = $('<img src="' + imgAddress + '" class="' + hiddenImagesClassName + '">'),
                    newImageAddress = imgAddress,
                    newDimensions;

                $element.append($newImg);

                $newImg.on('load', function() {
                    newDimensions = methods.newImageSizes( $(this) );
                    /* now our image is alive and we know it's dimensions */
                    $image.css({
                        'width': newDimensions.width + 'px',
                        'height': newDimensions.height + 'px',
                        'background': 'url("' + newImageAddress + '")'
                    });

                });
            }
        }; /* end of methods list */


    /**
     * Body perspective controls
     */
    jqElems.$bodyPerspectiveControl.on('change input', function() {
        methods.setNewPerspective( /*new value*/$(this).val(), /*$element*/jqElems.$previewBody );
    });


    /**
     * Shadow Z pozition
     */
    jqElems.$shadowTransformZ.on('change input', function() {
        methods.setShadowZPosition( /* new z pos */$(this).val(), /* $element */jqElems.$shadow );
    });


    /**
     * Color picker (colorPicker.js) initialisation
     * for background color setter.
     */
    jqElems.$backgroundColor.colpick({
        layout: 'hex',
        submit: 0,
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            /*Fill the text box just if the color was set using the picker, and not the colpickSetColor function.*/
            if ( !bySetColor ) $(el).val( '#' + hex );
            methods.setBgColor( '#' + hex , jqElems.$previewBody );
        }
    });
    /**
     * Background color setter
     */
    jqElems.$backgroundColor.on('change', function() {
        methods.setBgColor( $(this).val(), jqElems.$previewBody );
    });


    /**
     * Grid X and Z transformer
     */
    $.each([jqElems.$gridTransformX, jqElems.$gridTransformZ], function(){
        $(this).on('change input', function() {
            methods.gridXandZTransform( jqElems.$gridTransformX.val(), jqElems.$gridTransformZ.val(), jqElems.$grid );
        });
    });


    /**
     * Setting your own image
     * that should be stored on the web
     */
    jqElems.$imagePreview.on('change input', function() {
        methods.createNewImage( $(this).val(), jqElems.$previewBody, jqElems.$image, 'hidden-image' );
    });


    /**
     * Show or hide control panel
     *
     */
     jqElems.$controlsToggler.on('click', function(e){
        var $textContainer = $(this).find('a'),
            text = $textContainer.text();

        e.preventDefault();

        jqElems.$controlsPanel.slideToggle( 'fast' );
        $textContainer.text( text === 'hide' ? 'show' : 'hide' );
     });
});