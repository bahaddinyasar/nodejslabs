$(function(){
	
	$.getJSON('/api/pikz/photos/mirT21vyBH',function(photoData){
		$('#content a').append($('<img>',{id:'photo',src:photoData.imageUrl} ));
		//$('#content').preloader();
		
    });
	
	
});