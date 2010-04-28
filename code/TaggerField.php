<?php

class TaggerField extends TagField {
	protected $separator = ',';
	
	function __construct($name, $title = null, $value = null, $tagTopicClass = null, $tagObjectField = "Title") {
		$this->extraClasses = array("tag");
		
		parent::__construct($name, $title , $value, $tagTopicClass, $tagObjectField);
	}
	
	//The field only accept the seperator to be ",";
	public function setSeparator($separator) {
		$this->separator = ",";
	}
	
	function Type(){
		return 'taggerfield';
	}
	
	function Field(){
		Requirements::javascript(THIRDPARTY_DIR . "/jquery/jquery.js");
		Requirements::javascript(THIRDPARTY_DIR . "/jquery/jquery_improvements.js");
		Requirements::javascript(THIRDPARTY_DIR . '/jquery/plugins/livequery/jquery.livequery.js');
		Requirements::javascript("tagfield/javascript/TagField.js");
		Requirements::javascript("tagfield/thirdparty/jquery-tags/jquery.tags.js");
		Requirements::javascript("taggerfield/javascript/TaggerField.js");
		//Requirements::javascript("taggerfield/thirdparty/jquery-tagger/jquery.tagger.js");
		$customised = <<<JS
	(function($) {
		$(document).ready(function(){
	        // add to tagger element by index
	        $('div#{$this->Name()} input.tagger').eq(0).addTag('{$this->Value()}');
	})
	})(jQuery);
JS;
		Requirements::customScript($customised);
		
		Requirements::css("tagfield/css/TagField.css");
		Requirements::css("taggerfield/css/TaggerField.css");

		// Standard textfield stuff
		$attributes = array(
			'type' => 'text',
			'class' => 'text tagField tagger hiddentagger',
			'id' => $this->id(),
			'name' => $this->Name()."[]",
			'tabindex' => $this->getTabIndex(),
			'autocomplete' => 'off',
			'maxlength' => ($this->maxLength) ? $this->maxLength : null,
			'size' => ($this->maxLength) ? min( $this->maxLength, 30 ) : null,
		);
		if($this->disabled) $attributes['disabled'] = 'disabled';
		
		// Data passed as custom attributes
		if($this->customTags) {
			$attributes['tags'] = $this->customTags;
		} else {
			$attributes['href'] = parse_url($this->Link(),PHP_URL_PATH) . '/suggest';
		}
		$attributes['rel'] = $this->separator;

		return "<div class=\"tagajaxDiv\">".$this->createTag('input', $attributes)."</div>";
	}
	
	function saveInto($record) {
		if(is_array($this->value)){
			$this->value = implode($this->separator, $this->value);
		}
		parent::saveInto($record);
	}
}

?>