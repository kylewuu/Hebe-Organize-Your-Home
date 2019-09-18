
//global variables
var months=["Jan", "Feb", "Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]


// local storage initializations

if(window.localStorage.getItem('reminderTime')==null){
	window.localStorage.setItem('reminderTime', '12');
}

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

	var junkWordsFiltering=['i put my ', 'i put ','put my ','put ', 'store my ','i stored my ','store ','add ','insert my ','insert ','place my ','place '];
	var keywordsStore= [' in ', ' into ',' to ', ' on ', ' beside ', ' with ', ' around ', ' on top ', ' in my ', ' on my ', ' beside my ', ' to my ',' with my ', ' around my ', ' on top my ', ' in the ', ' to the ',' on the ', ' beside the ', ' with the ', ' around the ', ' on top the ']//keywords that the comand looks for to store
	var keywordsFind=['where ','where is ', 'where is my ','where are ','where are my ','where are the '];

	var keywordsMove=['move ','move my ','move the ','moved ','moved the ','moved my '];
	var keywordsMove1=[' to ',' to my ',' to the ',' into ',' into the ',' into my ','under ',' under my ',' under the '];


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

		var targetItem=command.slice(keywordMove.length,command.indexOf(keywordMove1));
		var newLocation= command.slice(command.indexOf(keywordMove1)+keywordMove1.length,command.length);

		if(globalItemArray.includes(targetItem)){

			var targetItemIndex=globalItemArray.indexOf(targetItem);
			var targetID=globalIDArray[targetItemIndex];
			var oldLocation= globalLocationArray[targetItemIndex];

			if(oldLocation==newLocation){
				// ons.notification.toast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...", {animation: 'ascend', timeout:"3000"});
				showToast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...");
				document.getElementById('commandInput').value=""; //resets it back to clear
			}
			else{
				// toolBarBlink("rgba(73, 252, 142");
				// ons.notification.toast("Moved successfully to "+newLocation+" from "+oldLocation+"!", {animation: 'ascend', timeout:"2000"});
				showToast("Moved successfully to "+newLocation+" from "+oldLocation+"!");
				// ons.notification.toast(targetItem+" "+oldLocation+" "+newLocation, {animation: 'ascend', timeout:"1000"});
				deleteItem(targetID)
				var date= new Date();
				var combination=newLocation.trim()+";"+targetItem.trim()+":"+date.getFullYear()+"::"+date.getMonth()+":::"+date.getDate();
				storeItem(combination);
				document.getElementById('commandInput').value=""; //resets it back to clear
			}
		}
		else{
			// toolBarBlink("rgba(73, 252, 142");

			showToast(" Woops! Looks like that item isn't stored yet... But I'll make a new item just for you");
			var date= new Date();
			var combination=newLocation.trim()+";"+targetItem.trim()+":"+date.getFullYear()+"::"+date.getMonth()+":::"+date.getDate();
			storeItem(combination); //temporarily storing the command and not the processed item
			document.getElementById('commandInput').value=""; //resets it back to clear
		}
	}

	//storing only--------------
	//testing to see if the command contains those keywords
	if(moveCommandSuccess==false){
		for(var i=0;i<keywordsStore.length;i++){
			keywordStoreTemp=keywordsStore[i];
			if(command.includes(keywordStoreTemp)){
				storeCommandSuccess= true;
				keywordStore=keywordStoreTemp;
			}
		}

	}

	if(storeCommandSuccess==true && moveCommandSuccess==false){


		var item= command.slice(0,command.indexOf(keywordStore))
		if(globalItemArray.includes(item)){

			//changed it to just move the item
			var targetItemIndex=globalItemArray.indexOf(item);
			var targetID=globalIDArray[targetItemIndex];
			var oldLocation= globalLocationArray[targetItemIndex];
			var newLocation=command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);

			if(oldLocation==newLocation){
				// ons.notification.toast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...", {animation: 'ascend', timeout:"3000"});
				showToast("It's already in your "+newLocation+" but I guess I'll move it again just because you told me to...");
			}
			else{
				// toolBarBlink("rgba(73, 252, 142");
				// ons.notification.toast("Moved successfully to "+newLocation+" from "+oldLocation+"!", {animation: 'ascend', timeout:"2000"});
				showToast("Moved successfully to "+newLocation+" from "+oldLocation+"!");
				// ons.notification.toast(targetItem+" "+oldLocation+" "+newLocation, {animation: 'ascend', timeout:"1000"});
				deleteItem(targetID)
				var combination=newLocation.trim()+";"+item.trim();
				storeItem(combination);
				document.getElementById('commandInput').value=""; //resets it back to clear
			}

		}
		else{
			// toolBarBlink("rgba(73, 252, 142");
			showToast("Stored");
			var location= command.slice(command.indexOf(keywordStore)+keywordStore.length,command.length);
			var date= new Date();
			var combination=location.trim()+";"+item.trim()+":"+date.getFullYear()+"::"+date.getMonth()+":::"+date.getDate();
			storeItem(combination); //temporarily storing the command and not the processed item
			document.getElementById('commandInput').value=""; //resets it back to clear

		}
	}

	//finding only---------------------------
	if(moveCommandSuccess== false && storeCommandSuccess==false){
		for(var i=0;i<keywordsFind.length;i++){
			keywordFindTemp=keywordsFind[i];
			if(command.includes(keywordFindTemp)){
				findCommandSuccess= true;
				keywordFind=keywordFindTemp;
			}
		}

	}

	if(findCommandSuccess==true && moveCommandSuccess== false && storeCommandSuccess==false){
		var targetItem=command.slice(keywordFind.length,command.length).trim();
		if(globalItemArray.includes(targetItem)){

			showToast(displayResult(globalLocationArray[globalItemArray.indexOf(targetItem)],targetItem));
			document.getElementById('commandInput').value=""; //resets it back to clear
		}
		else{
			// toolBarBlink("rgba(255, 0, 0");

			showToast("No such item!")

			if(targetItem.includes(" ")){
				var targetItemTemp=targetItem;

				while(targetItemTemp.includes(" ")){
					targetItemTemp=targetItemTemp.replace(" ","");
				}
				var separateWordsNum=(targetItem.length-targetItemTemp.length)+1 //this gives the number of separate words there are
				targetItemTemp=targetItem;
				console.log(targetItem);
				var separateWordsArray=new Array(separateWordsNum);
				var indexBefore=0;
				var indexAfter=targetItem.indexOf(" ");
				for(var i=0;i<separateWordsNum;i++){
					if(i==separateWordsNum-1){
						separateWordsArray[i]=targetItem.slice(indexBefore,targetItem.length).trim();
					}
					else{
						separateWordsArray[i]=targetItem.slice(indexBefore,indexAfter).trim();
						indexBefore= indexAfter;
						indexAfter=targetItem.indexOf(" ",indexAfter+1);
					}


				}

				var outputSearch="I couldn't find that exact item, but I did find the following that might have help...</br></br>";
				var outputSearchLength=outputSearch.length;

				for(var i=0;i<separateWordsArray.length;i++){
					for(var j=0; j<globalItemArray.length;j++){
						if(globalItemArray[j].includes(separateWordsArray[i])){
							outputSearch+=globalItemArray[j]+" in "+globalLocationArray[j]+"</br>";
						}
					}
				}

				//this is to make sure that the more lenient test does in fact find something and that if it doesn't then it doesn't show the prompt
				if(outputSearch.length>outputSearchLength){
					showToast(outputSearch);

				}
				else{
					showToast("Sorry! Nothing found!");
				}


			}
			else{
				var outputSearch="I couldn't find that exact item, but I did find the following that might have help...</br></br>";
				var outputSearchLength=outputSearch.length;

				for(var j=0; j<globalItemArray.length;j++){
					if(globalItemArray[j].includes(targetItem)){
						outputSearch+=globalItemArray[j]+" in "+globalLocationArray[j]+"</br>";
					}
				}
				//this is to make sure that the more lenient test does in fact find something and that if it doesn't then it doesn't show the prompt
				if(outputSearch.length>outputSearchLength){
					showToast(outputSearch);

				}
				else{
					showToast("Sorry! Nothing found!");
				}

			}
		}

	}

	if(moveCommandSuccess==false && findCommandSuccess==false && storeCommandSuccess==false){
		// toolBarBlink("rgba(255, 0, 0");

		showToast("Error! You have not entered a correct command. Please try again or visit the 'help' page to find a quick tutorial on how to use our very intuitive app");
		if(command=="fuck you"){ //incase anyone says anything bad to my command center >:(
			showToast("Hey be nice");
		}
		if(command=="i love ashley"){
			showToast("I do too");
			document.getElementById("commandInput").value="";
		}
	}
};

var displayResult=function(result,targetItem){
	var resultSentencePart1BankArray=["Last time I heard, your ", "I clearly remember your ","Hmmmm, prove me wrong, but I think your "]
	var resultSentencePart2BankArray=[" is in your "];
	var dateString= globalDateArray[globalItemArray.indexOf(targetItem)];
	return resultSentencePart1BankArray[Math.floor(Math.random()*(resultSentencePart1BankArray.length))]+targetItem+resultSentencePart2BankArray[Math.floor(Math.random()*(resultSentencePart2BankArray.length))]+result+" on "+months[dateString.slice(dateString.indexOf("::")+2,dateString.indexOf(":::"))]+" "+dateString.slice(dateString.indexOf(":::")+3,dateString.length)+", "+dateString.slice(0,dateString.indexOf("::"));
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


var setReminderTime=function(){
	var reminderTime=parseInt(document.getElementById('reminderTimeInput').value);
	if(isNaN(reminderTime)==false){
		window.localStorage.setItem('reminderTime', reminderTime.toString());
	}
	setReminderTimeSubtitle();
	document.getElementById('reminderTimeInput').value="";
	bootUpFlag=false;

};
var setReminderTimeSubtitle=function(){
	if(isNaN(window.localStorage.getItem('reminderTime'))==false){
		document.getElementById('reminderTimeSubtitle').innerHTML="It's currently set to: "+window.localStorage.getItem('reminderTime')+" months"
	}
	else{
		document.getElementById('reminderTimeSubtitle').innerHTML="It's currently set to: 12 months"
	}

}


var randomInt=function(min,max){
	min=parseInt(min);
	max=parseInt(max);
	return Math.floor((Math.random()*(max-min))+min)
}

var getDate=function(dateString){
	return (parseInt(dateString.slice(dateString.indexOf("::")+2,dateString.indexOf(":::")))+1).toString()+"/"+dateString.slice(dateString.indexOf(":::")+3,dateString.length)+"/"+dateString.slice(0,dateString.indexOf("::"));
}

//Tutorial page
//forces it to be the first time
// window.localStorage.setItem('firstTime','true');
//checks to see if it's the first time for boot before doing anything
// window.localStorage.setItem('firstTime','true'); //this is for testing the tutorial, forcing it to be the first time everytime
if(window.localStorage.getItem('firstTime')==null || window.localStorage.getItem('firstTime')=='true'){
	window.localStorage.setItem('firstTime', 'false');
	var tutorialPage1 = document.getElementById("tutorialPage1");
	var tutorialPage2 = document.getElementById("tutorialPage2");
	var tutorialPage3 = document.getElementById("tutorialPage3");
	tutorialPage1.show();
}

var nextTutorialPage=function(){
	tutorialPage1.hide();
	tutorialPage2.show();
}
var nextTutorialPage1=function(){
	tutorialPage2.hide();
	tutorialPage3.show();
}

var closeTutorial=function(){
	tutorialPage3.hide();
}


//settings page
var openSettings=function(){
	fn.load('about.html');
}
