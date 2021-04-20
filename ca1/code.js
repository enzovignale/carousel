// Utility function

function Log(arg) {
    console.log(arg);
  }
  
  // function out(arg) {
  //   document.getElementById("debug").innerHTML = arg;
  // }
  // function out2(arg) {
  //   document.getElementById("debug2").innerHTML = arg;
  // }
  //---------------------------------------------------------------------------------------------------

  //Carousel
    var Carousel = function () {
        // var defs and int
        //var me = this;

        //Configuration variables
        var carouselW = 600;
        var carouselH = 300;
        var itemW = 100;
        var itemH = 200;
        var numberOfItemToAdd = 2;

        //Working variables (DO NOT MODIFY)
        var carousel = document.getElementById("carousel");
        var itemContainer = carousel.getElementsByClassName("item-container")[0];
        var btnPrevious = document.getElementsByClassName("btn-previous")[0];
        var btnNext = document.getElementsByClassName("btn-next")[0];
        var items = [];
        var deg = 0;
        var rangeX = carouselW - itemW;
        var rangeY = carouselH - itemH;
        var itemDegreeSeparation = 360 / (numberOfItemToAdd);

        var itemCount = 1;
        var reqanimationreference;
        var tweenObject = {
            deg:0
        }

        //Simulate construction from other languages
        init();//TODO: do i need this? -> Yes


        //Constructor (not a js constructor)
        function init() {
            //Attache event listener
            btnPrevious.addEventListener('click',btnPreviousClickHandler);
            btnNext.addEventListener('click',btnNextClickHandler);  
            // Add items
            for(var i=0; i < numberOfItemToAdd/*items.length*/; i++){
            addItem();
        }

            // Start Animation
            animate();
        }
        //---------------------------------------------------------------------------------------------------
        //***************Method to just control button***************//
        function btnPreviousClickHandler(e){
            Log("btnPreviousClickHandler");

            cancelAnimationFrame(reqanimationreference);

        }
        function btnNextClickHandler(e){
            Log("btnNextClickHandler");
            // var targetDeg = tweenObject.deg + itemDegreeSeparation;
            // TweenMax.to(tweenObject,1,{deg:targetDeg, onUpdate:animate})
            //deg += 180;
            //animate();
            
            requestAnimationFrame(animate);
        }
        //---------------------------------------------------------------------------------------------------
        function addItem(){
            var item = document.createElement("div");
            item.classList.add("item");

            var label = document.createElement("div");
            label.classList.add("item-label");

            label.innerHTML = itemCount;
            item.appendChild(label);
            
            itemContainer.appendChild(item);
            var itemObject ={
            carouselItem:item
            }
            items.push(itemObject);
            itemCount++;
        }

        function animate(first = .5){
            deg += .5;//<======  This need to change
            for(var i=0; i < items.length; i++){
                var itemDeg = deg /* tweenObject.deg */ +(itemDegreeSeparation * i);
                console.log(deg+"<-- Deg        itemDegreeSeparation-->"+itemDegreeSeparation+"    -->Value i"+i);
                var sin = 0.5 + Math.sin(degToRad(itemDeg)) * 0.5;
                console.log(itemDegreeSeparation);
                var cos = 0.5 + Math.cos(degToRad(itemDeg)) * 0.5;
                var itemObject = items[i];
                var posX = sin*rangeX;
                var posY = cos*rangeY;
                itemObject.carouselItem.style.left = posX + 'px';
                itemObject.carouselItem.style.top = posY + 'px';

                var zIndex = 1 + Math.round(cos * 100);
                itemObject.carouselItem.style.zIndex = zIndex;

                var scale = .5 + (cos * .9);
                itemObject.carouselItem.style.transform = "scale("+scale+")";

                // var opacity = .3 + (cos * .7);
                // itemObject.carouselItem.style.opacity = opacity;
                itemObject.carouselItem.style.opacity = cos;
            }

            //TODO: Take a second look at this if statement
            if(deg < itemDegreeSeparation){
                reqanimationreference = requestAnimationFrame(animate);//<==========  This need to change
            }
            else{
                
                //TODO: Added
                cancelAnimationFrame(reqanimationreference); 
                //itemDegreeSeparation = 360 / (numberOfItemToAdd);
                deg = 0;
            }

            //reqanimationreference = requestAnimationFrame(animate);// This will make it to run non stop
            /*
            myReq = requestAnimationFrame(step);
        // the cancelation uses the last requestId
        cancelAnimationFrame(myReq);
            */
        }

        //---------------------------------------------------------------------------------------------------
        //Utility Function

        function degToRad(input) {
            return input * (Math.PI / 180);
        }

    };
  //---------------------------------------------------------------------------------------------------

  //Init page Load
    function pageLoadInit() {
        var myCarousel = new Carousel();
    }
  //---------------------------------------------------------------------------------------------------