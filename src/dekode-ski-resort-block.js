import MyAutocomplete from './simple-autocomplete';
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow } = wp.components;

registerBlockType('dekode/ski-resort', {

    title: 'Ski Resort',
    category: 'common',
    attributes: {
        headingText: {
            type: 'string',
            default: ''
        },
        bodyText: {
            type: 'string',
            default: ''
        },
        autocompleteValue: {
            type: 'string',
            default: ''
        },
        autocompleteOptions: {
            type: 'array',
            default: [ 
                { 'value': 1, 'label': 'Type to search' }
            ]
        },
        resortMeta: {
            type: 'object',
            default: {}
        },
        hasResortMeta: {
            type: 'boolean',
            default: false
        },
        autocompleteProcessingText: {
            type: 'string',
            default: ''
        },
        resortDataProcessingText: {
            type: 'string',
            default: ''
        }
    },
    icon: 'excerpt-view',
    description: 'A block for displaying meta information about a given ski resort',
    keywords: ['ski', 'resort'],
    edit: (props) => {
        const { attributes, setAttributes } = props;

        return (
			<div>
                <InspectorControls>
                    <PanelBody
                        title="Ski Resort Search Options"
                        initialOpen={ true }
                    >
                        <PanelRow>
                            <MyAutocomplete
                                label='Search for ski resort:'
                                value={ attributes.autocompleteValue }
                                onChange={ (queryText) => { 
                                    // Update state
                                    setAttributes({ autocompleteValue: queryText  });  
                                    setAttributes({ autocompleteProcessingText: 'Autocomplete Searching...' });


                                    var data = {
                                        _ajax_nonce: ski_resort_ajax_obj.nonce,
                                        action: 'fnugg_autocomplete_query',  // Corresponds to the wp_ajax_<action> WP hook
                                        autocomplete_query: queryText
                                    };
                                    
                                    // Send AJAX request to our FnuggConnector PHP class
                                    jQuery.post(ajaxurl, data, function(response) {
                                        let suggestions = JSON.parse(response);
                                        let options = [];

                                        suggestions.map((suggestion, i) => {
                                            options.push({ 'label': suggestion.name, 'value': suggestion.name });
                                        });

                                        // Update state upon return
                                        setAttributes({ autocompleteOptions: options });
                                        setAttributes({ autocompleteProcessingText: 'Search complete. Delete one character to see results.' });
                                    });
                                    
                                } }
                                options={ attributes.autocompleteOptions }
                            />
                            <button onClick={() => { 

                                setAttributes({ resortDataProcessingText: 'Retrieving resort data...' });

                                var data = {
                                    _ajax_nonce: ski_resort_ajax_obj.nonce,
                                    action: 'fnugg_resort_query',  // Corresponds to the wp_ajax_<action> WP hook
                                    resort_query: attributes.autocompleteValue
                                };
                            
                                // Send AJAX request to our FnuggConnector PHP class
                                jQuery.post(ajaxurl, data, function(response) {
                                    let newResortMeta = JSON.parse(response);
                                    console.log(newResortMeta);
                                    
                                    setAttributes({ resortMeta: newResortMeta });
                                    setAttributes({ hasResortMeta: true });
                                    setAttributes({ resortDataProcessingText: '' });
                                });

                             }}>Get Resort Data</button>
                             
                        </PanelRow>
                        <PanelRow>
                            {
                                attributes.autocompleteProcessingText
                            }
                        </PanelRow>
                        <PanelRow>
                            {
                                attributes.resortDataProcessingText
                            }
                        </PanelRow>
                    </PanelBody>
                </InspectorControls>

                {
                    
                    attributes.hasResortMeta &&


                    <div className="resort-display">

                        <div className="resort-wrapper">

                            <div className="resort-display-top" style={{background: 'url(' + attributes.resortMeta.image + ') center center/cover'}}>
                                <div className="resort-display-name">
                                    <h2>{ attributes.resortMeta.name }</h2>
                                </div>
                                
                                <div className="resort-display-weather">
                                    <p className="todays-weather">Dagens Forhold</p>
                                    <p className="updated-on">Oppdatert: { attributes.resortMeta.last_updated }</p>
                                </div>
                            </div>

                            <div className="resort-display-bot">

                                <div className="resort-weather-wrapper">

                                { attributes.resortMeta.temperature.isset &&
                                    <div className="weather-el weather-temperature">
                                        <p>{ attributes.resortMeta.temperature.value } &#176;</p>
                                    </div>
                                }   

                                { attributes.resortMeta.wind.isset &&
                                    <div className="weather-el weather-wind">
                                        <p>{ attributes.resortMeta.wind.mps } m/s</p>
                                    </div>
                                }

                                { attributes.resortMeta.conditions.isset &&
                                    <div className="weather-el weather-condition">
                                        <p>{ attributes.resortMeta.conditions.description }</p>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                }

			</div>
		);
    },
    save: (props) => {
        const { attributes } = props;

       /* 
       Somehow we need to trigger a function that pulls fresh data from the back end - not sure how to do that yet. 
       Thus, information displayed here will only be refreshed when someone updates the block in the editor 
       */

        return (
            <div>
                {
                    
                    attributes.hasResortMeta &&


                    <div className="resort-display">

                        <div className="resort-wrapper">

                            <div className="resort-display-top" style={{background: 'url(' + attributes.resortMeta.image + ') center center/cover'}}>
                                <div className="resort-display-name">
                                    <h2>{ attributes.resortMeta.name }</h2>
                                </div>
                                
                                <div className="resort-display-weather">
                                    <p className="todays-weather">Dagens Forhold</p>
                                    <p className="updated-on">Oppdatert: { attributes.resortMeta.last_updated }</p>
                                </div>
                            </div>

                            <div className="resort-display-bot">

                                <div className="resort-weather-wrapper">

                                { attributes.resortMeta.temperature.isset &&
                                    <div className="weather-el weather-temperature">
                                        <p>{ attributes.resortMeta.temperature.value } &#176;</p>
                                    </div>
                                }   

                                { attributes.resortMeta.wind.isset &&
                                    <div className="weather-el weather-wind">
                                        <p>{ attributes.resortMeta.wind.mps } m/s</p>
                                    </div>
                                }

                                { attributes.resortMeta.conditions.isset &&
                                    <div className="weather-el weather-condition">
                                        <p>{ attributes.resortMeta.conditions.description }</p>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
});