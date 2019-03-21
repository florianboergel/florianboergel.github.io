$(function(){
// ------------ Gallery
function pic_links(){
$("a[rel^='image_content']").prettyPhoto({
show_title:false,
social_tools:false,
changepicturecallback: function(){
$(".pp_details").css('top', '-20px');
$(".pp_details").css('width', '820px');
$(".pp_nav").css('float', 'right');
$(".pp_nav").css('top', '615px');
$(".pp_description").css('visibility', 'hidden');
$(".pp_description").css('display', 'none');
$(".pp_mediathek").css('display', 'none');
pop_up();}
})

$("a[rel^='photo']").prettyPhoto({
show_title:false,
social_tools:false,
changepicturecallback: function(){$(".pp_details").css('top', '410px');
$(".pp_description").css('visibility', 'hidden');
$(".pp_description").css('display', 'none');
if (lang=='eng'){
$(".pp_mediathek").html('<a href="/en/mediathek/photos/series/" class="link-pfeil">another photo series in the FONA-Mediathek</a>');
}else{
$(".pp_mediathek").html('<a href="/de/mediathek/fotos/reihen/" class="link-pfeil">weitere Fotoreihen in der FONA-Mediathek</a>');
};
pop_up();}
})}

function audio_links(){
$("a[rel^='audio']").prettyPhoto({
show_title:false,
social_tools:false,
changepicturecallback: function(){$(".pp_details").css('top', '520px');
$(".pp_mediathek").html('<a href="/de/mediathek/audios/reihen/" class="link-pfeil">weitere Audioreihen in der FONA-Mediathek</a>');
pop_up();}
})}

function pop_up(){
$(".button").button();
$("#popup_img").bind('click', function() {$.prettyPhoto.changePage('next');})
tag_links("pop_info");
}

function karte_links(){
$("a[rel^='karte']").prettyPhoto({
show_title:false,
social_tools:false,
	custom_markup: '',
	changepicturecallback: function(){
	$(".pp_details").css('top', '0px');
	$(".pp_mediathek").css('visibility', 'hidden');
	$(".pp_description").css('visibility', 'hidden');
}})}

function tag_links(div){// Tag Verlinkung
$("#"+div+" a[tag]").bind('click', function() {
if (div=="pop_info"){$.prettyPhoto.close();};
var tag=$(this).attr('tag');p=1;
url = "/de/mediathek/index.php?do=tags&tag="+tag;
window.open(url);
return false;})}
pic_links();audio_links();karte_links();

// ------------ Projekte
$("#fona_projekte a[projekt]").bind('click', function() {
var projekt=$(this).attr('projekt');
$("#projekt_more_data_pre_"+projekt).toggle();
$("#projekt_more_data_"+projekt).slideToggle();
return false;})

// aufklappen von projekt bei ankerpunkt
if ($("#projekt_start").html()!=""){
var projekt=$("#projekt_start").html();
$("#projekt_more_data_pre_"+projekt).toggle(0);
$("#projekt_more_data_"+projekt).slideToggle(0);
$(document).scrollTop( $("#projekt_anchor_"+projekt).offset().top );
return false;}
})