function showToast(prompt) {
  var x = document.getElementById("toast");

	x.innerHTML=prompt;
  if(document.getElementById('bunnyImage')!=null){
    document.getElementById('bunnyImage').src="imgs/awake.png";
    clearInterval(bunnySleepInterval);

  }
	setTimeout(function(){
		x.innerHTML="";
    //sets the interval for the sleepy bunny
    bunnySleepArray=['imgs/sleep.png','imgs/sleep1.png','imgs/sleep2.png','imgs/sleep3.png']
    i=0;
    clearInterval(bunnySleepInterval);
    bunnySleepInterval= setInterval(function(){
      if(document.getElementById('bunnyImage')!=null){
        document.getElementById('bunnyImage').src=bunnySleepArray[i];
      }
      if(i>=3){
        i=0
      }
      else{
        i++;
      }
      // console.log("adsf")
    },1000);

	},7000)
}

var bunnySleepArray=['imgs/sleep.png','imgs/sleep1.png','imgs/sleep2.png','imgs/sleep3.png']
var i=0;
var bunnySleepInterval= setInterval(function(){
  if(document.getElementById('bunnyImage')!=null){
    document.getElementById('bunnyImage').src=bunnySleepArray[i];
  }
  if(i>=3){
    i=0
  }
  else{
    i++;
  }
  // console.log("adsf")
},1000);
