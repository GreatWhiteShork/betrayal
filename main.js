var startDate = new Date();
var startTime = startDate.getMilliseconds();
var tick = 1000/60;
var subTick = tick / 1000;

// SELECTION SCREEN
// =======

var timeCode = 0.00;
var charo = null;
var clickX = null;
var clickY = null;

// CHARACTER TILE
// =======
var clickThresh = 17;

var touchOrigin = {pX: 0, pY: 0};
var paddingX = 0;
var paddingY = 0;
var size;
var highlightedStat = null;

var tempStoneInfo = {
      speed: 0,
      might: 0,
      sanity: 0,
      knowledge: 0
}

var permStoneInfo = {
      speed: 0,
      might: 0,
      sanity: 0,
      knowledge: 0
}

window.addEventListener("load", function() { window.scrollTo(0,0); } );

var selectionScreen = lottie.loadAnimation({
      container: document.getElementById("lottie"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: selectionScreen
});

selectionScreen.addEventListener("DOMLoaded", function() {
      document.getElementById("lottie").ontouchstart = function(e) {
            clickX = e.touches[0].clientX / window.innerWidth;
            clickY = e.touches[0].clientY / window.innerHeight;

            //var timeCode = 0.00;

            if ( clickY >= 0.37 && clickY < 46 ) timeCode = 0.04;
            if ( clickY >= 0.46 && clickY < 56 ) timeCode = 0.12;
            if ( clickY >= 0.56 && clickY < 66 ) timeCode = 0.20;
            if ( clickY >= 0.66 && clickY < 76 ) timeCode = 0.28;
            if ( clickY >= 0.76 && clickY < 86 ) timeCode = 0.36;
            if ( clickY >= 0.86 && clickY < 96 ) timeCode = 0.44;

            if ( clickX > 0.5 ) {
                  if ( clickY >= 0.37 && clickY < 96 ) timeCode += 0.04;
            }

            timeCode == 0.04 ? charo = "Missy" :
            timeCode == 0.08 ? charo = "Zoe" :
            timeCode == 0.12 ? charo = "Heather" :
            timeCode == 0.16 ? charo = "Jenny" :
            timeCode == 0.20 ? charo = "Vivian" :
            timeCode == 0.24 ? charo = "Madam" :
            timeCode == 0.28 ? charo = "Darrin" :
            timeCode == 0.32 ? charo = "Ox" :
            timeCode == 0.36 ? charo = "Peter" :
            timeCode == 0.40 ? charo = "Brandon" :
            timeCode == 0.44 ? charo = "Father" :
            timeCode == 0.48 ? charo = "Professor" :
            charo = null;

            selectionScreen.animationData.layers[0].tm.k = timeCode;

            if ( clickX <= 0.25 || clickX >= 0.79 ) return;
            if ( clickY <= 0.06 || clickY >= 0.19 ) return;
            if ( charo == null ) return;

            createJSON(charo);
            selectionScreen.destroy();
            createNewAnim();
      }
})

var anim;
function createNewAnim() {
      anim = lottie.loadAnimation({
      			container: document.getElementById("lottie"),
      			renderer: "svg",
      			loop: true,
      			autoplay: true,
      			animationData: animData
      		});

      anim.addEventListener("DOMLoaded", function() {
            //initialiseStones();
            //resetStones(); //
      	document.getElementById("lottie").ontouchstart = function(e) { touchStart(e) };
      	setInterval(animateValues, tick);
      })
}
//
// =======

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

//
// =======

function animateValues() {
      // Overall Rocking and Scaling
	anim.animationData.layers[0].ef[0].ef[0].v.k += subTick;

      //Inside Rocking and Scaling
	anim.assets[1].layers[3].ef[0].ef[0].v.k += subTick;
	// For some reason, only 1 stone updates...
}


function initialiseStones() {
      tempStoneInfo.knowledge = anim.animationData.layers[1].tm.k  * 24;
      tempStoneInfo.sanity = anim.animationData.layers[2].tm.k  * 24;
      tempStoneInfo.might = anim.animationData.layers[3].tm.k  * 24;
      tempStoneInfo.speed = anim.animationData.layers[4].tm.k  * 24;

      permStoneInfo.knowledge = tempStoneInfo.knowledge;
      permStoneInfo.sanity = tempStoneInfo.sanity;
      permStoneInfo.might = tempStoneInfo.might;
      permStoneInfo.speed = tempStoneInfo.speed;
}

function resetStones() {
      // anim.animationData.assets[4].layers[2].ef[0].ef[0].v.k = permStoneInfo.knowledge;
      // anim.animationData.assets[4].layers[3].ef[0].ef[0].v.k = permStoneInfo.sanity; //
      // anim.animationData.assets[4].layers[4].ef[0].ef[0].v.k = permStoneInfo.might;
      // anim.animationData.assets[4].layers[5].ef[0].ef[0].v.k = permStoneInfo.speed;

      // anim.animationData.layers[1].tm.k = permStoneInfo.knowledge/24;
      // anim.animationData.layers[2].tm.k = permStoneInfo.sanity/24;
      // anim.animationData.layers[3].tm.k = permStoneInfo.might/24;
      // anim.animationData.layers[4].tm.k = permStoneInfo.speed/24;

      animData.layers[0].ef[2].ef[0].v.k = permStoneInfo.speed;
      animData.layers[0].ef[3].ef[0].v.k = permStoneInfo.might;
      animData.layers[0].ef[4].ef[0].v.k = permStoneInfo.sanity;
      animData.layers[0].ef[5].ef[0].v.k = permStoneInfo.knowledge;
}

function touchStart(e) {
      document.getElementById("lottie").ontouchmove = function(e) { touchDrag(e) };
      document.getElementById("lottie").ontouchend = function(e) { cancelTouch() };
      document.getElementById("lottie").ontouchcancel = function(e) { cancelTouch() };

      var winH = window.innerHeight;
      var winW = window.innerWidth;
      size = Math.min(winH, winW);

      paddingX = 0;
      paddingY = 0;

      winH > winW ? paddingY = (winH - winW) / 2 : paddingX = (winW - winH) / 2;
      var mouseX = e.touches[0].clientX - paddingX;
      var mouseY = e.touches[0].clientY - paddingY;

      touchOrigin.pX = mouseX / size * 100;
      touchOrigin.pY = mouseY / size * 100;

      if ( Math.hypot(touchOrigin.pX - 18, touchOrigin.pY - 65.4) < clickThresh ) {
            highlightedStat = "SPEED";
      	anim.animationData.layers[0].ef[1].ef[0].v.k = 1;
      } else if ( Math.hypot(touchOrigin.pX - 30, touchOrigin.pY - 27.88) < clickThresh ) {
            highlightedStat = "MIGHT";
      	anim.animationData.layers[0].ef[1].ef[0].v.k = 2;
      } else if ( Math.hypot(touchOrigin.pX - 70, touchOrigin.pY - 30) < clickThresh ) {
            highlightedStat = "SANITY";
      	anim.animationData.layers[0].ef[1].ef[0].v.k = 3;
      } else if ( Math.hypot(touchOrigin.pX - 80, touchOrigin.pY - 66) < clickThresh ) {
            highlightedStat = "KNOWLEDGE";
      	anim.animationData.layers[0].ef[1].ef[0].v.k = 4;
      } else {
            highlightedStat = null;
      	anim.animationData.layers[0].ef[1].ef[0].v.k = 0;
      }

}

function touchDrag(e) {
      var nX = e.touches[0].clientX - paddingX;
      var nY = e.touches[0].clientY - paddingY;
      nX = nX / size * 100;
      nY = nY / size * 100;
      
      var limiter = 100;
      var offset = 0;
      var Xoffset = 0;
      var Yoffset = 0;

      var portrait = window.innerHeight > window.innerWidth ? true : false;

      //if ( portrait ) {
            Xoffset = range(-limiter, limiter, 8, -8, nX - touchOrigin.pX);
      //} else {
            Yoffset = range(-limiter, limiter, 8, -8, nY - touchOrigin.pY);

      //}    

      if ( highlightedStat == null ) return;

      if ( highlightedStat == "KNOWLEDGE" ) {
            //Yoffset *= -1;
            permStoneInfo.knowledge = calcOffset(tempStoneInfo.knowledge, "Y");
      } else if ( highlightedStat == "SANITY" ) {
            permStoneInfo.sanity = calcOffset(tempStoneInfo.sanity, "X");
      } else if ( highlightedStat == "MIGHT" ) {
            Xoffset *= -1;
            permStoneInfo.might = calcOffset(tempStoneInfo.might, "X");
      } else if ( highlightedStat == "SPEED" ) {
            permStoneInfo.speed = calcOffset(tempStoneInfo.speed, "Y");
      }

      function calcOffset(val, orient) {
            if ( orient == "X" ) return val + Xoffset < 0 ? 0 : val + Xoffset > 8 ? 8 : val + Xoffset;
            if ( orient == "Y" ) return val + Yoffset < 0 ? 0 : val + Yoffset > 8 ? 8 : val + Yoffset;
            
      }


      // anim.animationData.assets[4].layers[2].ef[0].ef[0].v.k = permStoneInfo.knowledge;
      // anim.animationData.assets[4].layers[3].ef[0].ef[0].v.k = permStoneInfo.sanity;
      // anim.animationData.assets[4].layers[4].ef[0].ef[0].v.k = permStoneInfo.might;
      // anim.animationData.assets[4].layers[5].ef[0].ef[0].v.k = permStoneInfo.speed;

      resetStones();

      // Dooope. Now test out the whole 'Swiping in different directions' thing
      // Then update the stones on the side
      // Then polish the animation
      // Maayyy need to re-evaluate the scroll thing. Like Speed and Knowledge should always scroll vertically.
      // Then consider a 'quick roll' thing
}

function cancelTouch() {
      tempStoneInfo.knowledge = permStoneInfo.knowledge;
      tempStoneInfo.sanity = permStoneInfo.sanity;
      tempStoneInfo.might = permStoneInfo.might;
      tempStoneInfo.speed = permStoneInfo.speed;

      permStoneInfo.knowledge = Math.round(tempStoneInfo.knowledge);
      permStoneInfo.sanity = Math.round(tempStoneInfo.sanity);
      permStoneInfo.might = Math.round(tempStoneInfo.might);
      permStoneInfo.speed = Math.round(tempStoneInfo.speed);

      // anim.animationData.assets[4].layers[2].ef[0].ef[0].v.k = permStoneInfo.knowledge;
      // anim.animationData.assets[4].layers[3].ef[0].ef[0].v.k = permStoneInfo.sanity;
      // anim.animationData.assets[4].layers[4].ef[0].ef[0].v.k = permStoneInfo.might;
      // anim.animationData.assets[4].layers[5].ef[0].ef[0].v.k = permStoneInfo.speed;

      resetStones();

      anim.animationData.layers[0].ef[1].ef[0].v.k = 0;
}

//
// =======

