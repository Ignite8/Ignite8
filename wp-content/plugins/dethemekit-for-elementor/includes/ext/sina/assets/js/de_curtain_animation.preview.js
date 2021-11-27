class DeCurtainAnimationHandlerClass extends elementorModules.frontend.handlers.Base {
    getDefaultSettings() {
        return {
            selectors: {
                wrapper: '.de_curtain_animation_yes',
                revealer__content: '.block-revealer__content',
                revealer__element: '.block-revealer__element',
                widget_container: '.elementor-widget-container',
            },
        };
    }

    getDefaultElements() {
        const selectors = this.getSettings( 'selectors' );
        return {
            $wrapper: this.$element.find( selectors.wrapper ),
            $revealer__content: this.$element.find( selectors.revealer__content ),
            $revealer__element: this.$element.find( selectors.revealer__element ),
            $widget_container: this.$element.find( selectors.widget_container ),
        };
    }

    do_animation(elem) {
        var attributeValue = elem.context.attributes['class'].nodeValue;
                    
        var $arr_classes = attributeValue.split(' ')

        var do_animation = false, editMode = false, $id, $duration = '900', $color = '#000000', $direction = 'lr', $easing = 'linear'
    
        jQuery.each($arr_classes, (index, value) => {
            if ( value.search('de_curtain_animation_yes') === 0 ) {
                do_animation = true;
            }

            if ( value.search('elementor-element-edit-mode') === 0 ) {
                editMode = true;
            }

            if ( value.length === 25 && value.search('elementor-element-') === 0 ) {
                $id = value.replace('elementor-element-','')
                }
                
            if ( value.search('de_curtain_duration_') === 0 ) {
            $duration = value.replace('de_curtain_duration_','')
            }
    
            if ( value.search('de_curtain_color_') === 0 ) {
            $color = value.replace('de_curtain_color_','')
            }
    
            if ( value.search('de_curtain_direction_') === 0 ) {
            $direction = value.replace('de_curtain_direction_','')
            }
    
            if ( value.search('de_curtain_easing_') === 0 ) {
            $easing = value.replace('de_curtain_easing_','')
            }
        })

        if (do_animation) {
            // console.log('do animation');
            var elementSelector = document.querySelector(".elementor-element-" + $id + " .elementor-widget-container");       

            if (!editMode) {
                var watcher = scrollMonitor.create(elementSelector, 0)
                var revealer = new RevealFx(elementSelector);

                watcher.enterViewport(function() {
                    revealer.reveal({
                        bgcolor: $color,
                        duration: $duration,
                        direction: $direction,
                        easing: $easing,
                        onStart: function(contentEl, revealerEl) { contentEl.style.opacity = 0; },
                        onCover: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                        onComplete: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                    });              
                    watcher.destroy();
                });

            } else {
                var revealer = new RevealFx(elementSelector);

                revealer.reveal({
                    bgcolor: $color,
                    duration: $duration,
                    direction: $direction,
                    easing: $easing,
                    onStart: function(contentEl, revealerEl) { contentEl.style.opacity = 0; },
                    onCover: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                    onComplete: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                });
            }              
        }
    }

    onInit() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    
                    var $arr_classes = attributeValue.split(' ')

                    var do_animation = false, $id, $duration = '900', $color = '#000000', $direction = 'lr', $easing = 'linear'
              
                    jQuery.each($arr_classes, (index, value) => {
                        if ( value.search('de_curtain_animation_yes') === 0 ) {
                            do_animation = true;
                        }

                        if ( value.length === 25 && value.search('elementor-element-') === 0 ) {
                            $id = value.replace('elementor-element-','')
                          }
                            
                      if ( value.search('de_curtain_duration_') === 0 ) {
                        $duration = value.replace('de_curtain_duration_','')
                      }
              
                      if ( value.search('de_curtain_color_') === 0 ) {
                        $color = value.replace('de_curtain_color_','')
                      }
              
                      if ( value.search('de_curtain_direction_') === 0 ) {
                        $direction = value.replace('de_curtain_direction_','')
                      }
              
                      if ( value.search('de_curtain_easing_') === 0 ) {
                        $easing = value.replace('de_curtain_easing_','')
                      }
                    })

                    if (do_animation) {
                        // console.log('do animation');
                        var elementSelector = document.querySelector(".elementor-element-" + $id + " .elementor-widget-container"); 
                        
                        var revealer = new RevealFx(elementSelector);

                        revealer.reveal({
                            bgcolor: $color,
                            duration: $duration,
                            direction: $direction,
                            easing: $easing,
                            onStart: function(contentEl, revealerEl) { contentEl.style.opacity = 0; },
                            onCover: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                            onComplete: function(contentEl, revealerEl) { contentEl.style.opacity = 1; },
                        });              
                    }
                }
            });
        });

        if (this.$element) {
            var elementId = this.$element.context.attributes['data-id'].nodeValue;
            var elementSelector = document.querySelector("[data-id='" + elementId + "']");
            if (elementSelector) {
                observer.observe(elementSelector, {
                    attributes: true
                });

                this.do_animation(this.$element);
            }
        }
    }

    bindEvents() {
    }
}

jQuery( window ).on( 'elementor/frontend/init', () => {
  const addHandler = ( $element ) => {
    elementorFrontend.elementsHandler.addHandler( DeCurtainAnimationHandlerClass, {
      $element,
    } );
  };

  elementorFrontend.hooks.addAction( 'frontend/element_ready/global', addHandler );
} );
