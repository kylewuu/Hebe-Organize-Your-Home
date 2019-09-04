
//global variables
var months=["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


//local storage initializations
window.localStorage.setItem('firstTime', 'false');
var test=function(){
	var count=window.localStorage.getItem('count');
	count+=1;
	window.localStorage.setItem('count',count.toString());
	document.getElementById("test").innerHTML= count.toString();
}
//

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

	var junkWordsFiltering=['i put my ', 'i put ','put my ','put ', 'store my ','i stored my ','store ','add '];
	var keywordsStore= [' in ', ' to ', ' on ', ' beside ', ' with ', ' around ', ' on top ', ' in my ', ' on my ', ' beside my ', ' to my ',' with my ', ' around my ', ' on top my ', ' in the ', ' to the ',' on the ', ' beside the ', ' with the ', ' around the ', ' on top the ']//keywords that the comand looks for to store
	var keywordsFind=['where is my ','where are my '];

	var keywordsMove=['move ','move my ','move the '];
	var keywordsMove1=[' to ',' to my ',' to the '];


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
					moveCommandSuccess=true;

				}
			}
		}
	}



	if(moveCommandSuccess==true){
		document.getElementById("results").innerHTML="";
		var targetItem=command.slice(keywordMove.length,command.indexOf(keywordMove1));
		var newLocation= command.slice(command.indexOf(keywordMove1)+keywordMove1.length,command.length);

		if(globalItemArray.includes(targetItem)){

			var targetItemIndex=globalItemArray.indexOf(targetItem);
			var targetID=globalIDArray[targetItemIndex];
			var oldLocation= globalLocationArray[targetItemIndex];

			if(oldLocation==newLocation){
				ons.notification.toast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...", {animation: 'ascend', timeout:"3000"});
			}
			else{
				toolBarBlink("rgba(73, 252, 142");
				ons.notification.toast("Moved successfully to "+newLocation+" from "+oldLocation+"!", {animation: 'ascend', timeout:"2000"});
				// ons.notification.toast(targetItem+" "+oldLocation+" "+newLocation, {animation: 'ascend', timeout:"1000"});
				deleteItem(targetID)
				var combination=newLocation.trim()+";"+targetItem.trim();
				storeItem(combination);
				document.getElementById('commandInput').value=""; //resets it back to clear
			}
		}
		else{
			toolBarBlink("rgba(73, 252, 142");
			document.getElementById("results").innerHTML=" Woops! Looks like that item isn't stored yet... But I'll make a new item just for you";
			ons.notification.toast('Stored', {animation: 'ascend', timeout:"1000"});

			var combination=newLocation.trim()+";"+targetItem.trim();
			storeItem(combination); //temporarily storing the command and not the processed item
			document.getElementById('commandInput').value=""; //resets it back to clear
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
			// ons.notification.toast('Error!', {animation: 'ascend', timeout:"1000"});
			// if(item.length<1){
			// 	document.getElementById("results").innerHTML=item.charAt(0).toUpperCase()+' already exists! Maybe try a different name?'
			//
			// }
			// else{
			// 	// console.log(typeof(item.slice(1,item.length)))
			// 	document.getElementById("results").innerHTML=item.charAt(0).toUpperCase()+item.slice(1,item.length)+' already exists! Maybe try a different name?'
			// }

			//changed it to just move the item
			var targetItemIndex=globalItemArray.indexOf(item);
			var targetID=globalIDArray[targetItemIndex];
			var oldLocation= globalLocationArray[targetItemIndex];
			var newLocation=command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);

			if(oldLocation==newLocation){
				ons.notification.toast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...", {animation: 'ascend', timeout:"3000"});
			}
			else{
				toolBarBlink("rgba(73, 252, 142");
				ons.notification.toast("Moved successfully to "+newLocation+" from "+oldLocation+"!", {animation: 'ascend', timeout:"2000"});
				// ons.notification.toast(targetItem+" "+oldLocation+" "+newLocation, {animation: 'ascend', timeout:"1000"});
				deleteItem(targetID)
				var combination=newLocation.trim()+";"+item.trim();
				storeItem(combination);
				document.getElementById('commandInput').value=""; //resets it back to clear
			}

		}
		else{
			toolBarBlink("rgba(73, 252, 142");
			ons.notification.toast('Stored', {animation: 'ascend', timeout:"1000"});
			var location= command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);
			var date= new Date();
			var combination=location.trim()+";"+item.trim()+":"+date.getFullYear()+"::"+date.getMonth()+":::"+date.getDate();
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
			toolBarBlink("rgba(73, 252, 142");
			displayResult(globalLocationArray[globalItemArray.indexOf(targetItem)],targetItem)
			ons.notification.toast("Found!", {animation: 'ascend', timeout:"1000"});
			document.getElementById('commandInput').value=""; //resets it back to clear
		}
		else{
			toolBarBlink("rgba(255, 0, 0");
			document.getElementById("results").innerHTML="";
			ons.notification.toast("No such item!", {animation: 'ascend', timeout:"1000"});
		}

	}

	if(moveCommandSuccess==false && findCommandSuccess==false && storeCommandSuccess==false){
		toolBarBlink("rgba(255, 0, 0");
		document.getElementById("results").innerHTML="Error! You have not entered a correct command. Please try again or visit the 'help' page to find a quick tutorial on how to use our very intuitive app";
		if(command=="fuck you"){ //incase anyone says anything bad to my command center >:(
			ons.notification.toast("Hey be nice", {animation: 'ascend', timeout:"1000"});
		}
	}



};

var displayResult=function(result,targetItem){
	var resultSentencePart1BankArray=["Last time I heard, you put your ", "I clearly remember you putting your ","Hmmmm, prove me wrong, but I think your "]
	var resultSentencePart2BankArray=[" is in your "];
	var dateString= globalDateArray[globalItemArray.indexOf(targetItem)];
	document.getElementById("results").innerHTML=resultSentencePart1BankArray[Math.floor(Math.random()*(resultSentencePart1BankArray.length))]+targetItem+resultSentencePart2BankArray[Math.floor(Math.random()*(resultSentencePart2BankArray.length))]+result+" on "+months[dateString.slice(dateString.indexOf("::")+2,dateString.indexOf(":::"))]+" "+dateString.slice(dateString.indexOf(":::")+3,dateString.length)+", "+dateString.slice(0,dateString.indexOf("::"));
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

// var moveAnyway=function(targetItem,newLocation,targetID){
// 	deleteItem(targetID)
// 	var combination=newLocation.trim()+";"+targetItem.trim();
// 	storeItem(combination);
// 	ons.notification.toast("Moved", {animation: 'ascend', timeout:"1000"});
// }

var toolBarBlink=function(color){
	document.getElementById("homeToolBar").style.backgroundColor=color+", 0.5)";
	setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor="white"	},150);
	setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor=color+", 0.5)"	},300);
	setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor="white"	},450);
	setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor=color+", 0.5)"	},600);
	setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor="white"	},750);
	// setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor=color+", 0.5)"	},900);
	// setTimeout(function(){document.getElementById("homeToolBar").style.backgroundColor="white"	},1050);
}
