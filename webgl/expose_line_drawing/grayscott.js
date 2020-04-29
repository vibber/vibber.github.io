/* 
 * Gray-Scott
 *
 * A solver of the Gray-Scott model of reaction diffusion.
 *
 * ©2012 pmneila.
 * p.mneila at upm.es
 */

(function(){

// Canvas.
var textureSizeX;
var textureSizeY;
var countPngs = 0;

var canvas;
var canvasQ;
var canvasWidth;
var canvasHeight;

var mMouseX, mMouseY;
var mMouseDown = false;

var mRenderer;
var mScene;
var mCamera;
var mUniforms;
var mColors;
var mColorsNeedUpdate = true;
var mLastTime = 0;

var mMap;
var mTexture1, mTexture2;
var mGSMaterial, mScreenMaterial;
var mScreenQuad;

var mToggled = false;

var mMinusOnes = new THREE.Vector2(-1, -1);

// Configuration.
var feed = 0.060;
var kill = 0.067;

var sourceImage = new Image();
sourceImage.src = "img/test2.png";

sourceImage.onload = function(){init()};

init = function()
{

    if ( ! Detector.webgl ) 
    {
        Detector.addGetWebGLMessage();
    } else {
        $("#container").css("display", "block");
        $("#open-modal").leanModal();
        $("#open-modal").click();
    }


    textureSizeX = sourceImage.width;
    textureSizeY = sourceImage.height;
    
    canvasQ = $('#myCanvas');
    canvas = canvasQ.get(0);
    
    canvas.onmousedown = onMouseDown;
    canvas.onmouseup = onMouseUp;
    canvas.onmousemove = onMouseMove;
    
    //mRenderer = new THREE.WebGLRenderer({canvas: canvas, preserveDrawingBuffer: true});
    mRenderer = new THREE.WebGLRenderer({canvas: canvas });

    mScene = new THREE.Scene();
    mCamera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -10000, 10000);
    mCamera.position.z = 100;
    mScene.add(mCamera);
    
    mMap = new THREE.Texture(sourceImage);
    mMap.wrapS = THREE.RepeatWrapping;
    mMap.wrapT = THREE.RepeatWrapping;
    mMap.repeat.x = textureSizeX;
    mMap.repeat.y = textureSizeY;
    mMap.needsUpdate = true;
    mUniforms = {
        screenWidth: {type: "f", value: undefined},
        screenHeight: {type: "f", value: undefined},
        tSource: {type: "t", value: undefined},
        delta: {type: "f", value: 1.0},
        feed_texture: {type: "t", value: mMap},
        kill: {type: "f", value: kill},
        brush: {type: "v2", value: new THREE.Vector2(-10, -10)},
        color1: {type: "v4", value: new THREE.Vector4(0, 0, 0.0, 0)},
        color2: {type: "v4", value: new THREE.Vector4(0, 1, 0, 0.2)},
        color3: {type: "v4", value: new THREE.Vector4(1, 1, 0, 0.21)},
        color4: {type: "v4", value: new THREE.Vector4(1, 0, 0, 0.4)},
        color5: {type: "v4", value: new THREE.Vector4(1, 1, 1, 0.6)},
        invertImage: {type: "f", value: 0}   
    };
    mColors = [mUniforms.color1, mUniforms.color2, mUniforms.color3, mUniforms.color4, mUniforms.color5];
    
    mGSMaterial = new THREE.ShaderMaterial({
            uniforms: mUniforms,
            vertexShader: document.getElementById('standardVertexShader').textContent,
            fragmentShader: document.getElementById('gsFragmentShader').textContent,
        });
    mScreenMaterial = new THREE.ShaderMaterial({
                uniforms: mUniforms,
                vertexShader: document.getElementById('standardVertexShader').textContent,
                fragmentShader: document.getElementById('screenFragmentShader').textContent,
            });
    
    var plane = new THREE.PlaneGeometry(1.0, 1.0);
    mScreenQuad = new THREE.Mesh(plane, mScreenMaterial);
    mScene.add(mScreenQuad);
    
    mColorsNeedUpdate = true;
    
    //resize(512, 512);
    resize(textureSizeX,textureSizeY);

    render(0);
        //starting point in range 0-1
    mUniforms.brush.value = new THREE.Vector2(0.5, 0.5);
    mLastTime = new Date().getTime();
    requestAnimationFrame(render);
}

var resize = function(width, height)
{
    // Set the new shape of canvas.
    canvasQ.width(width);
    canvasQ.height(height);
    
    // Get the real size of canvas.
    canvasWidth = canvasQ.width();
    canvasHeight = canvasQ.height();
    
    mRenderer.setSize(canvasWidth, canvasHeight);
    
    // TODO: Possible memory leak?
    var scale = 1.0;
    mTexture1 = new THREE.WebGLRenderTarget(canvasWidth*scale, canvasHeight*scale,
                        {minFilter: THREE.LinearFilter,
                         magFilter: THREE.LinearFilter,
                         format: THREE.RGBFormat,
                         type: THREE.FloatType});
    mTexture2 = new THREE.WebGLRenderTarget(canvasWidth*scale, canvasHeight*scale,
                        {minFilter: THREE.LinearFilter,
                         magFilter: THREE.LinearFilter,
                         format: THREE.RGBFormat,
                         type: THREE.FloatType});
    
    mUniforms.screenWidth.value = canvasWidth*scale;
    mUniforms.screenHeight.value = canvasHeight*scale;
}

var render = function(time)
{
    var deltaRate = 20.0;
    var dt = (time - mLastTime)/deltaRate;
    if(dt > 0.8 || dt<=0)
        dt = 0.8;
    mLastTime = time;

    //adjust speed
    //dt = dt * 2.1;
    
    mScreenQuad.material = mGSMaterial;
    mUniforms.delta.value = dt;
    //mUniforms.feed.value = feed;
    mUniforms.kill.value = kill;
    
    for(var i=0; i<8; ++i)
    {
        if(!mToggled)
        {
            mUniforms.tSource.value = mTexture1;
            mRenderer.render(mScene, mCamera, mTexture2, true);
            mUniforms.tSource.value = mTexture2;
        }
        else
        {
            mUniforms.tSource.value = mTexture2;
            mRenderer.render(mScene, mCamera, mTexture1, true);
            mUniforms.tSource.value = mTexture1;
        }
        
        mToggled = !mToggled;
        mUniforms.brush.value = mMinusOnes;
    }
    
    mScreenQuad.material = mScreenMaterial;
    mRenderer.render(mScene, mCamera);
    
    //saveCanvas(canvas);

    requestAnimationFrame(render);
}

var onMouseMove = function(e)
{
    var ev = e ? e : window.event;
    
    mMouseX = ev.pageX - canvasQ.offset().left; // these offsets work with
    mMouseY = ev.pageY - canvasQ.offset().top; //  scrolled documents too
    
    if(mMouseDown)
        mUniforms.brush.value = new THREE.Vector2(mMouseX/canvasWidth, 1-mMouseY/canvasHeight);
}

var onMouseDown = function(e)
{
    var ev = e ? e : window.event;
    mMouseDown = true;
    
    mUniforms.brush.value = new THREE.Vector2(mMouseX/canvasWidth, 1-mMouseY/canvasHeight);
}

var onMouseUp = function(e)
{
    mMouseDown = false;
}

clean = function()
{
    mUniforms.brush.value = new THREE.Vector2(-10, -10);
}

snapshot = function()
{
    var dataURL = canvas.toDataURL("image/png");
    window.open(dataURL, "name-"+Math.random());
}

// resize canvas to fullscreen, scroll to upper left 
// corner and try to enable fullscreen mode and vice-versa
fullscreen = function() {

    var canv = $('#myCanvas');
    var elem = canv.get(0);
    
    if(isFullscreen())
    {
        // end fullscreen
        if (elem.cancelFullscreen) {
            elem.cancelFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    
    if(!isFullscreen())
    {
        // save current dimensions as old
        window.oldCanvSize = {
            width : canv.width(), 
            height: canv.height()
        };
        
        // adjust canvas to screen size
        resize(screen.width, screen.height);
        
        // scroll to upper left corner
        $('html, body').scrollTop(canv.offset().top);
        $('html, body').scrollLeft(canv.offset().left);
        
        // request fullscreen in different flavours
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
}

var isFullscreen = function()
{
    return document.mozFullScreenElement ||
        document.webkitCurrentFullScreenElement ||
        document.fullscreenElement;
}

$(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(ev) {
    // restore old canvas size
    if(!isFullscreen())
        resize(window.oldCanvSize.width, window.oldCanvSize.height);
});

var worldToForm = function()
{
    //document.ex.sldReplenishment.value = feed * 1000;
    $("#sld_replenishment").slider("value", feed);
    $("#sld_diminishment").slider("value", kill);
}

})();
