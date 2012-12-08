s3d();

var pointA=new s3d.Point(0, 0.5443310539518172, 0, 1);
var pointB=new s3d.Point(-0.5, -0.2721655269759087, 0.28867513459481287, 1);
var pointC=new s3d.Point(0.5, -0.2721655269759087, 0.28867513459481287, 1);
var pointD=new s3d.Point(0, -0.2721655269759087, -0.5773502691896257, 1);

var circleModelA=new s3d.Model('svg:circle', {'r': '0.08', 'fill': 'rgb(255, 255, 255)', 'fill-opacity': '0.80', 'stroke': 'rgb(127, 127, 127)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var circleModelB=new s3d.Model('svg:circle', {'r': '0.08', 'fill': 'rgb(255, 0, 0)', 'fill-opacity': '0.80', 'stroke': 'rgb(127, 0, 0)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var circleModelC=new s3d.Model('svg:circle', {'r': '0.08', 'fill': 'rgb(0, 255, 0)', 'fill-opacity': '0.80', 'stroke': 'rgb(0, 127, 64)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var circleModelD=new s3d.Model('svg:circle', {'r': '0.08', 'fill': 'rgb(0, 0, 255)', 'fill-opacity': '0.80', 'stroke': 'rgb(0, 0, 127)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var polygonModelA=new s3d.Model('svg:polygon', {'fill': 'rgb(255, 255, 255)', 'fill-opacity': '0.80', 'stroke': 'rgb(127, 127, 127)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var polygonModelB=new s3d.Model('svg:polygon', {'fill': 'rgb(255, 0, 0)', 'fill-opacity': '0.80', 'stroke': 'rgb(127, 0, 0)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var polygonModelC=new s3d.Model('svg:polygon', {'fill': 'rgb(0, 255, 0)', 'fill-opacity': '0.80', 'stroke': 'rgb(0, 127, 64)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);
var polygonModelD=new s3d.Model('svg:polygon', {'fill': 'rgb(0, 0, 255)', 'fill-opacity': '0.80', 'stroke': 'rgb(0, 0, 127)', 'stroke-width': '0.02', 'stroke-opacity': '0.70', 'stroke-linejoin': 'round', 'stroke-linecap': 'round'}, null);

function onUpdateCircle(Node, Points){
	Node.setValue('cx', Points[0].x).setValue('cy', Points[0].y);
	return Points[0].z * 3;
}
function onUpdatePolygon(Node, Points){
	Node.setValue('points', [Points[0].x, Points[0].y, Points[1].x, Points[1].y, Points[2].x, Points[2].y].join(' '));
	return Points[0].z + Points[1].z + Points[2].z;
}

var circleObjectA=new s3d.Object(circleModelA, [pointA], onUpdateCircle);
var circleObjectB=new s3d.Object(circleModelB, [pointB], onUpdateCircle);
var circleObjectC=new s3d.Object(circleModelC, [pointC], onUpdateCircle);
var circleObjectD=new s3d.Object(circleModelD, [pointD], onUpdateCircle);
var polygonObjectA=new s3d.Object(polygonModelA, [pointB, pointC, pointD], onUpdatePolygon);
var polygonObjectB=new s3d.Object(polygonModelB, [pointA, pointD, pointC], onUpdatePolygon);
var polygonObjectC=new s3d.Object(polygonModelC, [pointD, pointA, pointB], onUpdatePolygon);
var polygonObjectD=new s3d.Object(polygonModelD, [pointC, pointB, pointA], onUpdatePolygon);

var circleMatrix=new s3d.Matrix().setScale(1.1, 1.1, 1.1);
var polygonMatrix=new s3d.Matrix();
var crossEyeLeftMatrix=new s3d.Matrix().setCommand('O', 0.5, 0.5, 0.0, 'R', 0.0, 1.0, 0.0, -0.08);
var crossEyeRightMatrix=new s3d.Matrix().setCommand('O', 2.5, 0.5, 0.0, 'R', 0.0, 1.0, 0.0, 0.08);

var circleGroup=new s3d.Group(circleMatrix, null, [circleObjectA, circleObjectB, circleObjectC, circleObjectD]);
var polygonGroup=new s3d.Group(polygonMatrix, [circleGroup], [polygonObjectA, polygonObjectB, polygonObjectC, polygonObjectD]);
var crossEyeLeftGroup=new s3d.Group(crossEyeLeftMatrix, [polygonGroup], null);
var crossEyeRightGroup=new s3d.Group(crossEyeRightMatrix, [polygonGroup], null);
var crossEyeSceneGroup=new s3d.Group(null, [crossEyeLeftGroup, crossEyeRightGroup], null);

var surface=new s3d.Surface('cross-eye-scene', crossEyeSceneGroup, false, true, false, 0);

var canvas=new s3d.Canvas(3, 1, 0, [surface]);

var targetNode=null;

function onMouseEnterCanvas(evt){
	if(targetNode)targetNode.setValue('stroke-width', '0.02').setValue('stroke-dasharray', '0');
	if(targetNode=evt.target.correspondingElement)targetNode.setValue('stroke-width', '0.04').setValue('stroke-dasharray', '0.00 0.04');
}

document.getElementById('container').appendChild(canvas.node.setValues({
	'width': '768', 'height': '256'
}).setStyles({
	'width': '768px', 'height': '256px', 'margin': '8px', 'outline': 'black solid 1px'
}).appendEvent(s3d.Event.onMouseEnter, onMouseEnterCanvas, false));

var vectors=[[1, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

setInterval(function(){
	for(var i=0,size=vectors.length;i<size;i++)vectors[i][1]=Math.random()-0.5;
}, 1000);

setInterval(function(){
	for(var i=0,size=vectors.length;i<size;i++)vectors[i][0]+=(vectors[i][2]=vectors[i][2]*0.94+(vectors[i][1]-vectors[i][0])*0.006);
}, 15);

setInterval(function(){
	var s=0.5+vectors[0][0]*0.6;
	polygonMatrix.setCommand('R',0,0,1,vectors[1][0]*6.28,'R',0,1,0,vectors[2][0]*6.28,'R',1,0,0,vectors[3][0]*6.28,'S',s,s,s);
	surface.update();
}, 50);
