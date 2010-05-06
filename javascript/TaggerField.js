(function($){
	$.fn.addTag = function(v){
		var r = v.split(',');
		for(var i in r){
			if(typeof(r[i]) == 'string'){
				n = r[i].replace(/([^a-zA-Z0-9\s\-\_])|^\s|\s$/g, '');			
				if(n == '') return false;

				var fn = $(this).data('name');
				var i = $('<input type="hidden" />').attr('name',fn).val(n);
					
				var t = $('<li />')
					.addClass('tagName')
					.data('hidden',i);
				
				var a = $('<a />').attr('title', "click to delete ").text(n)
					.hover(
						function () {
							$(this).data('parentL').addClass('mouseover')
							var span = $("<span />").addClass('delete_button');
							$(this).append(span);
						}, 
						function () {
							$(this).find("span:last").remove();
							$(this).data('parentL').removeClass('mouseover')
						}
					)
					.click(function(){
						var answer = confirm("Are you sure you want to remove '"+$(this).text()+"'");
						if(answer){
						// remove
							var parentL = $(this).data('parentL');
							var hidden = $(parentL).data('hidden');
							$(hidden).remove();
							$(parentL).remove();
						}
						return false;
					})
					.data('parentL', t);
				
				$(t).append(a);
				var l = $(this).data('list');
				$(l).append(t).append(i);
				
				var lastA = t.prev('input').prev('li.tagName').find("a:last");
				if(lastA.length){
					lastA.text(lastA.text()+",");
				}
			}
		}
	};
	$.fn.taggertoggle = function(){
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
					$(tagger).taggertoggle();
					$(this).taggertoggle();
					$(tagger.focus());
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
				b.taggertoggle();
				$(this).taggertoggle();
				$(this).val('');
				$(this).stop();
				return false;
			}
		})
		.bind('tags:tagSelected', function(e){
				//console.log(e.keyCode);
				$(this).addTag( $(this).val() );
				var b = $(this).prev('a');
				b.taggertoggle();
				$(this).taggertoggle();
				$(this).val('');
				$(this).stop();
				return false;
		});
	});
})(jQuery);
