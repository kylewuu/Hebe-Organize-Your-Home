var settingsPageOn=false;
var homePageOn=false;

document.addEventListener('init', function(event){
	if(event.target.id== "listPage" ){
		openDb();
		getItems();

	}
	else if(event.target.id=="settingsPage"){
		homePageOn=false;
		settingsPageOn=true;
		setReminderTimeSubtitle();

	}
	else if(event.target.id=="home"){
		homePageYes=true;
		settingsPageOn=false;
		getReminders();

	}
});

//for pressing the enter keys
window.addEventListener("keypress", keyPress, false);
function keyPress(key) {
	if (key.key == "Enter"){
		// document.getElementById("submitButton").click();
		submit();

	}

	else if (key.key == "Enter" && document.getElementById("setReminderButton")!=null){
		document.getElementById("setReminderButton").click();

	}

}



var db=null;
var openedID="";
var groupIDArray=[];
var idListTempArray=[];
var globalItemArray=[];
var globalLocationArray=[];
var globalIDArray=[];
var globalDateArray=[];
var remindersArray=[];
var bootUpFlag=false;

var onError= function(tx,e){
	alert("Something went wrong: " + e.Message)
}

var onSuccess= function(tx, r){
	getItems();
}

var openDb=function(){
	db= openDatabase("StorageList","1","Storage list",1024*1024);

	db.transaction(function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS items (ID INTEGER PRIMARY KEY ASC, item TEXT)", []);
	});

}

var getItems= function(){
	db.transaction(function(tx){
		tx.executeSql("SELECT * FROM items", [], renderItems, onError);
	});
}
var renderItems= function(tx, rs){
	var output= "";
	var combinedList= document.getElementById('itemList');
	var itemListArray=new Array(rs.rows.length);
	var locationListArray= new Array(rs.rows.length);
	var sortedCombinedListArray= new Array(rs.rows.length);
	var idListArray= new Array(rs.rows.length);
	var inCollapseableFlag=false;
	var headerIDArray= new Array(rs.rows.length);
	var headerIDTemp="";
	var dateListArray=new Array(rs.rows.length);

	//for loop for storing it into an array
	//-----
	for(var i=0;i<rs.rows.length;i++){
		var row=rs.rows.item(i);
		sortedCombinedListArray[i]=row.item+"."+row.ID;

	}
	sortedCombinedListArray=sortedCombinedListArray.sort();

	for(var i=0;i<sortedCombinedListArray.length;i++){
		itemListArray[i]=(sortedCombinedListArray[i].slice(sortedCombinedListArray[i].indexOf(";")+1,sortedCombinedListArray[i].indexOf(":"))).trim();
		locationListArray[i]=(sortedCombinedListArray[i].slice(0,sortedCombinedListArray[i].indexOf(";"))).trim()
		idListArray[i]= (sortedCombinedListArray[i].slice(sortedCombinedListArray[i].indexOf(".")+1,sortedCombinedListArray[i].length));
		dateListArray[i]=(sortedCombinedListArray[i].slice(sortedCombinedListArray[i].indexOf(":")+1,sortedCombinedListArray[i].indexOf(".")))

	}

	output+= "<ons-list-item expandable id="+"ID"+0+">" + locationListArray[0]+ "<div class='expandable-content'>"+"<ons-list-item>" +itemListArray[0] +"<div class='right' style='float: right'> <ons-button onclick='deleteItem("+idListArray[0]+")'><ons-icon icon= 'trash'></ons-icon></ons-button></div></ons-list-item>";
	inCollapseableFlag=true;
	headerIDArray[0]=0;
	headerIDTemp=0;

	for(var i=1;i<itemListArray.length;i++){

		if(inCollapseableFlag==true && locationListArray[i]==locationListArray[i-1]){
			output += "<ons-list-item>"+itemListArray[i] +"<div  class='right'> <ons-button onclick='deleteItem("+idListArray[i]+")'><ons-icon icon= 'trash'></ons-icon></ons-button></div></ons-list-item>";
		}
		else if(locationListArray[i]!=locationListArray[i-1] && inCollapseableFlag== true){
			inCollapseableFlag=false;
			output += "</div></ons-list-item>"
		}
		if(locationListArray[i]!=locationListArray[i-1] && inCollapseableFlag==false){
			headerIDTemp+=1;
			output+= "<ons-list-item expandable id='ID"+headerIDTemp+"'>" + locationListArray[i]+ "<div class='expandable-content'>"+"<ons-list-item>" +itemListArray[i] +"<div  class='right'> <ons-button onclick='deleteItem("+idListArray[i]+")'><ons-icon icon= 'trash'></ons-icon></ons-button></div></ons-list-item>";
			inCollapseableFlag=true;
			if(i==itemListArray.length-1){
				output+="</ons-list-item>"
			}
		}

		headerIDArray[i]=headerIDTemp;
	}

	//updating the global variables
	globalItemArray=itemListArray;
	globalLocationArray=locationListArray;
	globalIDArray=idListArray;
	globalDateArray=dateListArray;

	groupIDArray=headerIDArray;
	idListTempArray=idListArray;


	if(locationListArray[0]==null){
		output="";
	}

	if(combinedList!= null ){ //keeps giving the error, so need this if statement
		combinedList.innerHTML= output;
	}

	if(document.querySelector("#ID"+openedID)!=null){
		document.querySelector("#ID"+openedID).showExpansion();

	}

	if(bootUpFlag==false){ //this is to increase speed and not have the app do reminders every single time it runs
		getReminders();
		bootUpFlag=true;
	}


}

var storeItem=function(value){
	// var textbox= document.getElementById("commandInput");
	// var value= textbox.value;

	db.transaction(function(tx){
		tx.executeSql("INSERT INTO items (item) VALUES (?)", [value], onSuccess, onError);
	});

	// textbox.value="";
	// fn.load('list.html');
	// fn.load('home.html');
};

//delete button function
var deleteItem= function(id){

	openedID=idListTempArray.indexOf(id.toString());
	openedID=groupIDArray[openedID];

	db.transaction(function(tx){
		tx.executeSql("DELETE FROM items WHERE ID=?", [id], onSuccess, onError);
	})

}

var getReminders=function(){
	// console.log(globalDateArray)
	document.getElementById("results").innerHTML="";
	for(var i=0;i<globalDateArray.length;i++){
		var date= new Date();
		var currentDate=date.getFullYear()+"::"+date.getMonth()+":::"+date.getDate();
		// console.log(currentDate)
		currentDate=parseInt(currentDate.slice(currentDate.indexOf("::")+2,currentDate.indexOf(":::")))+parseInt(currentDate.slice(0,currentDate.indexOf("::")))*12;
		// console.log(currentDate)
		var dateTemp=globalDateArray[i];
		dateTemp=parseInt(dateTemp.slice(dateTemp.indexOf("::")+2,dateTemp.indexOf(":::")))+parseInt(dateTemp.slice(0,dateTemp.indexOf("::")))*12;

		//reminder time setting
		if((currentDate-dateTemp)==parseInt(window.localStorage.getItem('reminderTime'))){
			document.getElementById("results").innerHTML+="</br></br> It's been "+ parseInt(window.localStorage.getItem('reminderTime'))+" months since you've stored: "+globalItemArray[i]
		}
	}
}

openDb(); //opens it so that the page actually loads
getItems(); //loads it up so that everything works without having to go into the storage page
