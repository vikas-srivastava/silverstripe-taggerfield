(function($){
	$.fn.addTag = function(v){
		var r = v.split(',');
		for(var i in r){
			if(typeof(r[i]) == 'string'){
				n = r[i].replace(/([^a-zA-Z0-9\s\-\_])|^\s|\s$/g, '');			
				if(n == '') return false;

				var fn = $(this).data('name');
				var i = $('<input type="hidden" />').attr('name',fn).val(n);
				var t = $('<li />').text(n).addClass('tagName')
					.click(function(){
						// remove
						var hidden = $(this).data('hidden');
						$(hidden).remove();
						$(this).remove();
					})
					.data('hidden',i);
				var l = $(this).data('list');
				$(l).append(t).append(i);
				var lastT = t.prev('input').prev('li.tagName');
			
				if(lastT.length){
					lastT.text(lastT.text()+",");
				}
			}
		}
	};
	$.fn.toggle = function(){
		if($(this).hasClass('showtagger')){
			$(this).removeClass('showtagger');
			$(this).addClass('hiddentagger');
		}else if($(this).hasClass('hiddentagger')){
			$(this).removeClass('hiddentagger');
			$(this).addClass('showtagger');
		}
	}
	
})(jQuery);

(function($) {
	$(document).ready(function(){
		$('.tagger').each(function(i){
			$(this).data('name', $(this).attr('name'));	
			$(this).removeAttr('name');
			var b = $('<a role="button" href="#" style="">Add Tags Here</a>').addClass('next_tag_expander showtagger').click(function(){
					var tagger = $(this).data('tagger');
					$(tagger).addTag( $(tagger).val() );
					$(tagger).toggle();
					$(this).toggle();
					$(tagger).val('');
					$(tagger).stop();
					return false;
				})
				.data('tagger', this);
			var l = $('<ul />').addClass('tagList');
			$(this).data('list', l);			
			$(this).parent('div').before(l);
			$(this).before(b);
		})
		.bind('keypress', function(e){
			if( 13 == e.keyCode){
				//console.log(e.keyCode);
				$(this).addTag( $(this).val() );
				var b = $(this).prev('a');
				b.toggle();
				$(this).toggle();
				$(this).val('');
				$(this).stop();
				return false;
			}
		})
		.bind('tags:tagSelected', function(e){
				//console.log(e.keyCode);
				$(this).addTag( $(this).val() );
				var b = $(this).prev('a');
				b.toggle();
				$(this).toggle();
				$(this).val('');
				$(this).stop();
				return false;
		});
	});
})(jQuery);
