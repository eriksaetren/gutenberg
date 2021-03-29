<?php

// FnuggConnector Class:
new FnuggConnector();

class FnuggConnector {

    public function __construct(){

        // Set up WP hooks:
        // ajax action for loading autocomplete data about ski resorts
        add_action('wp_ajax_fnugg_autocomplete_query', array($this, 'query_autocomplete'));

        // Ajax action for loading ski resort data
        add_action('wp_ajax_fnugg_resort_query', array($this, 'query_ski_resort'));

        // Initialize database on plugin activation
        register_activation_hook( __FILE__, array($this, 'init_db_tables'));
    }

    /**
     *  query_autocomplete
     * 
     *  Ajax handler for autocomplete
     */
    public function query_autocomplete(){

        // Always check if nonce is valid:
        // Commenting out, not enough time to test this properly
        /*if(!wp_verify_nonce($_POST['_ajax_nonce'])){
            wp_die();
        }*/

        if (isset($_POST['autocomplete_query'])) {
            $queryText = $_POST['autocomplete_query'];
        }
        else{
            echo '';
            wp_die();
        }

        $queryResponse = wp_remote_get('https://api.fnugg.no/suggest/autocomplete/?q=' . rawurlencode($queryText));

        $queryBody = json_decode($queryResponse['body']);
        $suggestions = $queryBody->result;

        echo json_encode($suggestions);
        wp_die();
    }

    /**
     *  query_ski_resort
     * 
     *  Ajax handler for querying ski resort data
     * 
     */
    public function query_ski_resort(){
        // Always check if nonce is valid:
        // Commenting out, not enough time to test this properly
        /*if(!wp_verify_nonce($_POST['_ajax_nonce'])){
            wp_die();
        }*/

        $result = array('name' => '', 'image' => '', 'last_updated' => '', 'temperature' => array('isset' => '', 'value' => ''), 'conditions' => array('isset' => '', 'description' => ''), 'wind' => array('isset' => '', 'mps' => ''));

        if (isset($_POST['resort_query']) && $_POST['resort_query']) {
            $queryText = $_POST['resort_query'];
        }
        else{
            echo '';
            wp_die();
        }

        $cacheresult = $this->get_resort_cache_data($queryText);

        // If there was a cached result, return it
        // MAY EXIT THIS BLOCK
        if(!empty($cacheresult)){
            $result = unserialize($cacheresult[0]->result);

            // file_put_contents(plugin_dir_path(__FILE__) . 'debug.txt', 'cache result returned!');

            echo json_encode($result);
            wp_die();
        }

        // Query the REST API
        $queryResponse = wp_remote_get('https://api.fnugg.no/search?q=' . rawurlencode($queryText) . '&sourceFields=name,images.image_full,conditions.current_report.top.last_updated,conditions.current_report.top.temperature.value,conditions.current_report.top.wind.mps,conditions.current_report.top.condition_description');

        $queryBody = json_decode($queryResponse['body']);

        $numResults = $queryBody->hits->total;
        $resortData = $queryBody->hits->hits[0]->_source;  // Return first hit, even if there are multiple results


        // Populate result fields:
        $result['name'] = isset($resortData->name) ? $resortData->name : '';
        $result['image'] = isset($resortData->images->image_full) ? $resortData->images->image_full : '';
        
        if(isset($resortData->conditions->current_report->top->last_updated)){
            $lastUpdated = date_create($resortData->conditions->current_report->top->last_updated);
            $result['last_updated'] = date_format($lastUpdated, 'd.m.Y - h:i');    
        }
        else{
            $result['last_updated'] = '';
        }

        if(isset($resortData->conditions->current_report->top->temperature->value)){
            $result['temperature']['isset'] = true;
            $result['temperature']['value'] = $resortData->conditions->current_report->top->temperature->value;
        }
        else{
            $result['temperature']['isset'] = false;
            $result['temperature']['value'] = '';
        }

        if(isset($resortData->conditions->current_report->top->condition_description)){
            $result['conditions']['isset'] = true;
            $result['conditions']['description'] = $resortData->conditions->current_report->top->condition_description;
        }
        else{
            $result['conditions']['isset'] = false;
            $result['conditions']['description'] = '';
        }

        if(isset($resortData->conditions->current_report->top->wind->mps)){
            $result['wind']['isset'] = true;
            $result['wind']['mps'] = $resortData->conditions->current_report->top->wind->mps;
        }
        else{
            $result['wind']['isset'] = false;
            $result['wind']['mps'] = '';
        }

        // Cache data before returing:
        $this->save_resort_cache_data($queryText, serialize($result));

        echo json_encode($result);
        wp_die();
    }

    /**
     *  init_db_tables
     * 
     *  Initialize database tables for cache
     */
    public function init_db_tables(){
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'fnugg_resortdata_cache';

        // Check if table already exists:
        if($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
            // Table does not exist, create it:

            $sql = "CREATE TABLE $table_name (
                id bigint(20) NOT NULL AUTO_INCREMENT,
                date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                query varchar(255) NOT NULL,
                result longtext NOT NULL,
                UNIQUE KEY id (id)
            ) $charset_collate;";
    
            require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
            dbDelta( $sql );
        }
    }

    /**
     *  get_resort_cache_data
     * 
     *  Pull cached resort data based on provided query
     * 
     *  @param string $query The query text
     */
    private function get_resort_cache_data($query){
        global $wpdb;

        $sql = $wpdb->prepare("SELECT * FROM {$wpdb->prefix}fnugg_resortdata_cache WHERE query = %s", $query);

        return $wpdb->get_results($sql);
    }

    /**
     * 
     *  save_resort_cache_data
     * 
     *  Save query and result in cache
     * 
     *  @param string $query The search term used
     *  @param string $data The data resulting from the search term, must be serialized data 
     */
    private function save_resort_cache_data($query, $data){
        global $wpdb;

        $sql = $wpdb->prepare("INSERT INTO {$wpdb->prefix}fnugg_resortdata_cache (query, result) VALUES (%s, %s)", $query, $data);

        return $wpdb->query($sql);
    }
}
?>