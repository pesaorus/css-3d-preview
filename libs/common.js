$(function() {
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

            /* button to make a div - in PNG picture, so  */
            /*$makePicture: $('#make-a-picture')*/
        };

    /**
     * Body perspective controls
     */
    jqElems.$bodyPerspectiveControl.on('change input', function() {
        var newPerspectiveValue = $(this).val();

        jqElems.$previewBody.css({
            '-webkit-perspective': newPerspectiveValue + 'px',
            '-moz-perspective': newPerspectiveValue + 'px',
            'perspective': newPerspectiveValue
        });
    });


    /**
     * Shadow Z pozition
     */
    jqElems.$shadowTransformZ.on('change input', function() {
        var newShadowZ = $(this).val();

        jqElems.$shadow.css({
            '-webkit-transform': 'translateZ(' + newShadowZ + 'px)',
            'transform': 'translateZ(' + newShadowZ + 'px)'
        });
    });


    /**
     * Background color setter
     */

    var setBgColor = function(color) {
        jqElems.$previewBody.css({
            'background': color
        });
    };
    jqElems.$backgroundColor.colpick({
        layout:'hex',
        submit:0,
        onChange:function(hsb, hex, rgb, el, bySetColor) {
            // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
            if(!bySetColor) $(el).val('#' + hex);
            setBgColor( '#' + hex );
        }
    });
    jqElems.$backgroundColor.on('change', function() {
        setBgColor( $(this).val() );
    });


    /**
     * Grid X and Z transform controls
     */
    $.each([jqElems.$gridTransformX, jqElems.$gridTransformZ], function(){
        $(this).on('change input', function() {
            console.log('234');
            var newTransformXValue = jqElems.$gridTransformX.val(),
                newTransformZValue = jqElems.$gridTransformZ.val();

            jqElems.$grid.css({
                '-webkit-transform': 'rotateX(' + newTransformXValue + 'deg)' + ' rotateZ(' + newTransformZValue + 'deg)',
                'transform': 'rotateX(' + newTransformXValue + 'deg)' + ' rotateZ(' + newTransformZValue + 'deg)'
            });
        });
    });


    /**
     * Setting your own image
     * that should be stored on the web
     */
    jqElems.$imagePreview.on('change input', function() {
            /**
             * Getting image new sizes
             *
             * @param img - jquery DOM img object
             */
        var newImageSizes = function(img) {
                return {
                    width: img.width(),
                    height: img.height()
                };
            },
            /**
             * Creating new invisible for client img element to get it`s sizes
             *
             * @param {String} imgAddress - new image address
             * @returns {Object} dimensions - width and height if a new image
             */
            createNewImage = function(imgAddress) {
                /*killing all old elements*/
                $('.hidden-image').remove();

                var $newImg = $('<img src="' + imgAddress + '" class="hidden-image">'),
                    newDimensions;

                jqElems.$previewBody.append($newImg);

                $newImg.on('load', function() {
                    newDimensions = newImageSizes($(this));

                    jqElems.$image.css({
                        'width': newDimensions.width + 'px',
                        'height': newDimensions.height + 'px',
                        'background': 'url("' + newImageAddress + '")'
                    });

                });
            },
            newImageAddress = $(this).val();

        createNewImage( newImageAddress );
    });

    /**
     * Make a picture functionality
     *
     */
    /*jqElems.$makePicture.on('click', function() {
        html2canvas(document.body, {
            onrendered: function(canvas) {
                console.log(canvas);
                document.getElementById('canvas-container').appendChild(canvas);
            }
        });
    });*/


    /**
     * Show or hide control panel
     *
     */
     jqElems.$controlsToggler.on('click', function(e){
        var text = $(this).find('a').text();
        console.log(text);
        e.preventDefault();

        jqElems.$controlsPanel.slideToggle('fast');
        $(this).find('a').text( text === 'hide' ? 'show' : 'hide' );
     });
});