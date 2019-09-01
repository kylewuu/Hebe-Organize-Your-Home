var submit = function() {
  var command = document.getElementById('commandInput').value;
	command= command.toLowerCase();
	var keywordStoreTemp= "";
	var keywordFindTemp="";
	var storeCommandSuccess=false;
	var findCommandSuccess=false;
	var keywordStore="";
	var keywordFind="";


	var keywordsStore= [' in ', ' on ', ' beside ', ' with ', ' around ', ' on top ']//keywords that the comand looks for to store
	var keywordsFind=['where is my '];

	//storing only--------------
	//tesitng to see if the command contains those keywords
	for(var i=0;i<keywordsStore.length;i++){
		keywordStoreTemp=keywordsStore[i];
		if(command.includes(keywordStoreTemp)){
			storeCommandSuccess= true;
			keywordStore=keywordStoreTemp;
		}
	}

	if(storeCommandSuccess==true){
		ons.notification.toast('Stored', {animation: 'ascend', timeout:"1000"});
		var item= command.slice(0,command.indexOf(keywordStore))
		var location= command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);
		var combination=location.trim()+";"+item.trim();
		storeItem(combination); //temporarily storing the command and not the processed item
		document.getElementById('commandInput').value=""; //resets it back to clear
	}
	// else if( storeCommandSuccess== false && command!=""){
	// 	ons.notification.toast("Invalid command", {animation: 'ascend', timeout:"1000"})
	// }
	//finding only---------------------------
	for(var i=0;i<keywordsFind.length;i++){
		keywordFindTemp=keywordsFind[i];
		if(command.includes(keywordFindTemp)){
			findCommandSuccess= true;
			keywordFind=keywordFindTemp;
		}
	}
	if(findCommandSuccess==true){
		var targetItem=command.slice(keywordFind.length,command.length);
		if(globalItemArray.includes(targetItem)){
			ons.notification.toast(globalLocationArray[globalItemArray.indexOf(targetItem)], {animation: 'ascend', timeout:"1000"});
			document.getElementById('commandInput').value=""; //resets it back to clear
		}

	}

};

//side menu
window.fn = {};
window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

//hide all button
var hideAll=function(){

	for(var i=0;i<groupIDArray.length;i++){
		if(document.querySelector('#ID'+groupIDArray[i]).expanded == true){
			document.querySelector('#ID'+groupIDArray[i]).hideExpansion();
		}
	}
}
