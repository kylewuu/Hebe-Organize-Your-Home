var submit = function() {
  var command = document.getElementById('commandInput').value;
	command= command.toLowerCase();
	var keywordStoreTemp= "";
	var keywordFindTemp="";
	var keywordMoveTemp="";
	var keywordMoveTemp1="";
	var keywordMoveTemp2="";
	var storeCommandSuccess=false;
	var findCommandSuccess=false;
	var moveCommandSuccess=false;
	var keywordStore="";
	var keywordFind="";
	var keywordMove="";
	var keywordMove1="";
	var keywordMove2="";

	var keywordMove

	var junkWordsFiltering=['i put my ', 'i put ','put '];
	var keywordsStore= [' in ', ' to ', ' on ', ' beside ', ' with ', ' around ', ' on top ', ' in my ', ' on my ', ' beside my ', ' to my ',' with my ', ' around my ', ' on top my ', ' in the ', ' to the ',' on the ', ' beside the ', ' with the ', ' around the ', ' on top the ']//keywords that the comand looks for to store
	var keywordsFind=['where is my '];

	var keywordsMove=['move ','move my ','move the '];
	var keywordsMove1=[' from ',' from my ', ' from the '];
	var keywordsMove2=[' to ',' to my ',' to the '];

	for(var i=0; i<junkWordsFiltering.length;i++){
		if(command.includes(junkWordsFiltering[i])){
			command=command.replace(junkWordsFiltering[i],"");
		}
	}

	// console.log(command)


	//move------------------------------
	for(var i=0;i<keywordsMove.length;i++){
		keywordMoveTemp=keywordsMove[i];
		if(command.includes(keywordMoveTemp)){
			keywordMove=keywordMoveTemp;

			for(var j=0;j<keywordsMove1.length;j++){
				keywordMoveTemp1=keywordsMove1[j];
				if(command.includes(keywordMoveTemp1)){
					keywordMove1=keywordMoveTemp1;

					for(var k=0;k<keywordsMove2.length;k++){
						keywordMoveTemp2=keywordsMove2[k];
						if(command.includes(keywordMoveTemp2)){
							moveCommandSuccess=true;
							keywordMove2=keywordMoveTemp2;
						}
					}

				}
			}
		}
	}


	if(moveCommandSuccess==true){
		document.getElementById("results").innerHTML="";
		var targetItem=command.slice(keywordMove.length,command.indexOf(keywordMove1));
		var oldLocation= command.slice(command.indexOf(keywordMove1)+keywordMove1.length,command.indexOf(keywordMove2));
		var newLocation= command.slice(command.indexOf(keywordMove2)+keywordMove2.length,command.length);

		if(globalItemArray.includes(targetItem)){

			var targetItemIndex=globalItemArray.indexOf(targetItem);

			if(globalLocationArray.includes(oldLocation)){
				var targetID=globalIDArray[targetItemIndex];

				if(globalLocationArray.indexOf(oldLocation)==targetItemIndex){
					ons.notification.toast("Move success!", {animation: 'ascend', timeout:"1000"});
					// ons.notification.toast(targetItem+" "+oldLocation+" "+newLocation, {animation: 'ascend', timeout:"1000"});
					deleteItem(targetID)
					var combination=newLocation.trim()+";"+targetItem.trim();
					storeItem(combination);
					document.getElementById('commandInput').value=""; //resets it back to clear
				}
				//if the item isn't stored in the place that you thought it was stored
				else if(globalLocationArray.indexOf(oldLocation)!=targetItemIndex){
					ons.notification.toast("it aint there", {animation: 'ascend', timeout:"1000"});
					document.getElementById("results").innerHTML= "It looks like your "+targetItem+" is actually stored in "+globalLocationArray[targetItemIndex];
				}
			}
			else{
				ons.notification.toast("it aint there", {animation: 'ascend', timeout:"1000"});
				document.getElementById("results").innerHTML= "It looks like your "+targetItem+" is actually stored in "+globalLocationArray[targetItemIndex]+
				"<ons-button id='moveAnyway' onclick='' style='margin: 3%'>Move Anyway</ons-button>";

			}
		}
	}

	//storing only--------------
	//tesitng to see if the command contains those keywords
	for(var i=0;i<keywordsStore.length;i++){
		keywordStoreTemp=keywordsStore[i];
		if(command.includes(keywordStoreTemp)){
			storeCommandSuccess= true;
			keywordStore=keywordStoreTemp;
		}
	}

	if(storeCommandSuccess==true && moveCommandSuccess==false){
		document.getElementById("results").innerHTML="";

		var item= command.slice(0,command.indexOf(keywordStore))
		if(globalItemArray.includes(item)){
			ons.notification.toast('Error!', {animation: 'ascend', timeout:"1000"});
			if(item.length<1){
				document.getElementById("results").innerHTML=item.charAt(0).toUpperCase()+' already exists! Maybe try a different name?'

			}
			else{
				// console.log(typeof(item.slice(1,item.length)))
				document.getElementById("results").innerHTML=item.charAt(0).toUpperCase()+item.slice(1,item.length)+' already exists! Maybe try a different name?'
			}
		}
		else{
			ons.notification.toast('Stored', {animation: 'ascend', timeout:"1000"});
			var location= command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);
			var combination=location.trim()+";"+item.trim();
			storeItem(combination); //temporarily storing the command and not the processed item
			document.getElementById('commandInput').value=""; //resets it back to clear

		}
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
			displayResult(globalLocationArray[globalItemArray.indexOf(targetItem)],targetItem)
			ons.notification.toast("Found!", {animation: 'ascend', timeout:"1000"});
			document.getElementById('commandInput').value=""; //resets it back to clear
		}

	}

};

var displayResult=function(result,targetItem){
	var resultSentencePart1BankArray=["Last time I heard, you put your ", "I clearly remember you putting your ","Hmmmm, prove me wrong, but I think your "]
	var resultSentencePart2BankArray=[" in your "];

	document.getElementById("results").innerHTML=resultSentencePart1BankArray[Math.floor(Math.random()*(resultSentencePart1BankArray.length))]+targetItem+resultSentencePart2BankArray[Math.floor(Math.random()*(resultSentencePart2BankArray.length))]+result;
}

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
		if(document.querySelector('#ID'+groupIDArray[i])!=null){
			if(document.querySelector('#ID'+groupIDArray[i]).expanded == true){
				document.querySelector('#ID'+groupIDArray[i]).hideExpansion();
			}

		}
	}
}
