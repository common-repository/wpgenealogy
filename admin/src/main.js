(function($) {
	$(window).on('load', function() {
		$('a.switch_now').click(function() {
			$.post(ajaxurl, {
				action: 'switch_now',
			}).done(function(data) {
				window.location.href = data.url;
			}).fail(function(data) {});
			return false;
		})
	})
	$('.stages-nav a').each(function() {
		$(this).click(function() {
			var stage = $(this).attr('data-target');
			if (stage == 'stage-02' || stage == 'stage-03' || stage == 'stage-04' || stage == 'stage-05') {
				if (!$('input[name="wpg_page_name"]').val() && !$('input[name="wpg_page_id"]').val()) {
					alert('Page Name is required');
					return;
				}
			}
			if (stage == 'stage-03') {}
			if (stage == 'stage-04') {}
			if (stage == 'stage-05') {}
			$('.stages-nav a').removeClass('active');
			$(this).addClass('active');
			$('.stages > div').hide();
			$('.stages > div.' + stage).show();
			return false;
		})
	})
	$('.nav_cont a').each(function() {
		$(this).click(function() {
			var stage = $(this).attr('data-target');
			$('.stages-nav a[data-target="' + stage + '"]').click();
			return false;
		})
	});
	$('.wpg_create_page_name').click(function() {
		if (!$('input[name="wpg_page_name"]').val()) {
			alert('Page name is required');
			return false;
		}
		$.post(ajaxurl, {
			action: 'wpg_create_page_name',
			page_name: $('input[name="wpg_page_name"]').val()
		}).done(function(data) {
			if (data.message == 'Page Created') {
				$('input[name="wpg_page_name"], .wpg_create_page_name').attr('disabled', true)
				$('.wpg_create_page_name').parents('.box').append('✔ Completed')
				$('input[name="wpg_page_id"]').val(data.page.ID);
				$('.import_people').attr('disabled', false).attr('href', data.page_link+'#/dashboard/migrate/')
				$('.add_people').attr('disabled', false).attr('href', data.page_link+'#/dashboard/people/add')
			}
			alert(data.message);
		}).fail(function(data) {});
		return false;
	})
	$('.save_hub_content').click(function() {
		$.post(ajaxurl, {
			action: 'save_hub_content',
			wpg_page_heading: $('input[name="wpg_page_heading"]').val(),
			wpg_page_text: $('textarea[name="wpg_page_text"]').val(),
			wpg_button_text: $('input[name="wpg_button_text"]').val(),
			wpg_button_link: $('input[name="wpg_button_link"]').val(),
			wpg_image_link: $('input[name="wpg_image_link"]').val(),
		}).done(function(data) {
			alert(data.message);
		}).fail(function(data) {});
		return false;
	})
	$('.wpg_create_tree').click(function() {
		$.post(ajaxurl, {
			action: 'wpg_create_tree',
			gedcom: $('input[name="tree_name"]').val(),
		}).done(function(data) {
			if(data.messages){
				if(data.messages[0]){
					if(data.messages[0].text) {
						alert(data.messages[0].text);
						$('input[name="tree_name"], .wpg_create_tree').attr('disabled', true)
						$('.wpg_create_tree').parents('.box').append('✔ Completed')
					}
				}
			}
		}).fail(function(data) {});
	})
	$('.wpg_create_branch').click(function() {
		$.post(ajaxurl, {
			action: 'wpg_create_branch',
			gedcom: $('input[name="tree_name"]').val(),
			branch: $('input[name="branch_name"]').val(),
		}).done(function(data) {
			if(data.messages){
				if(data.messages[0]){
					if(data.messages[0].text) {
						alert(data.messages[0].text);
						$('input[name="branch_name"], .wpg_create_branch').attr('disabled', true)
						$('.wpg_create_branch').parents('.box').append('✔ Completed')
					}
				}
			}
		
		}).fail(function(data) {});
	})
	$('.save_hub_content_fnish').click(function() {
		if(!$('input[name="wpg_page_id"]').val()){
			alert('Stae 1 must be complited to fnish setup.');
			return false;
		}
		$.post(ajaxurl, {
			action: 'save_hub_content_fnish',
		}).done(function(data) {
			window.location.href = wpGenealogy.site_url+'/wp-admin/admin.php?page=wpgenealogy'; 
		}).fail(function(data) {});
	})

	$('input[name="wpg_button_link"]').focus(function(){
		if($(this).parent().find('.wpg_button_links_box').length==0){
			$(this).parent().append('<ul class="wpg_button_links_box">Loading...</ul>');
		}
		$.post(ajaxurl, {
			action: 'get_wpg_button_link',
		}).done(function(data) {
			$('input[name="wpg_button_link"]').parent().find('.wpg_button_links_box').html(data);
			$('input[name="wpg_button_link"]').parent().find('.wpg_button_links_box li').each(function(){
				$(this).click(function(){
					$('input[name="wpg_button_link"]').val($(this).text());
				})
			})
		}).fail(function(data) {});
		$(document).mouseup(function(e) {
		    var container1 = $('input[name="wpg_button_link"]').parent().find('.wpg_button_links_box')
		    var container2 = $('input[name="wpg_button_link"]')
		    if ((!container1.is(e.target) && container1.has(e.target).length === 0) && (!container2.is(e.target) && container2.has(e.target).length === 0) ) {
		        container1.remove();
		    }
		});
	})
})(jQuery)