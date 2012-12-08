# s3d - svg 3D

	[cc-by] Sebastian Rostock (bee-creative@gmx.de)

---

### DEUTSCH

Diese Bibliothek definiert einige Klassen zur Erstellung von animierbaren 3D-Szenen mit SVG. Sie hängt von der Bibliothek `pc` ab. Um den Namensraum nutzen zu können, ruft man einfach die Funktion `s3d` auf. Diese erstellt den Namensraum, ersetzt sich mit ihm und gibt ihn zurück.

Das nun folgende Beispiel soll die Verwendung dieser Bibliothek illustrieren. Wie schon beschrieben, muss zuerst der Namensraum `s3d` initialisiert werden.

	s3d();

Für die Beschreibung von Szenenobjekten benötigt man Modelle von Elementknoten. Die hier verwendeten Modelle definieren `SVGCircleElement`- und `SVGPolygonElement`-Elementknoten in den Farben Weiß, Rot, Grün und Blau.

	var circleModelA=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(255,255,255)', 'fill-opacity':'0.80', 'stroke':'rgb(127,127,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	},null);
	var circleModelB=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(255,0,0)', 'fill-opacity':'0.80', 'stroke':'rgb(127,0,0)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var circleModelC=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(0,255,0)', 'fill-opacity':'0.80', 'stroke':'rgb(0,127,64)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var circleModelD=new s3d.Model('svg:circle',{
		'r':'0.08', 'fill':'rgb(0,0,255)', 'fill-opacity':'0.80', 'stroke':'rgb(0,0,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelA=new s3d.Model('svg:polygon', {
		'fill':'rgb(255,255,255)', 'fill-opacity':'0.80', 'stroke':'rgb(127,127,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelB=new s3d.Model('svg:polygon', {
		'fill':'rgb(255,0,0)', 'fill-opacity':'0.80', 'stroke':'rgb(127,0,0)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelC=new s3d.Model('svg:polygon', {
		'fill':'rgb(0,255,0)', 'fill-opacity':'0.80', 'stroke':'rgb(0,127,64)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelD=new s3d.Model('svg:polygon', {
		'fill':'rgb(0,0,255)', 'fill-opacity':'0.80', 'stroke':'rgb(0,0,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);

Um Szenenobjekte positionieren zu können, mussen sie Punkte besitzen, die über Matrizen transformiert werden. Die hier definierten Punkte entsprechen den Eckpunkten eines Tetraeders.

	var pointA=new s3d.Point(0,0.5443310539518172,0,1);
	var pointB=new s3d.Point(-0.5,-0.2721655269759087,0.28867513459481287,1);
	var pointC=new s3d.Point(0.5,-0.2721655269759087,0.28867513459481287,1);
	var pointD=new s3d.Point(0,-0.2721655269759087,-0.5773502691896257,1);

Wie die transformierten Punkte eines Szenenobjektes auf seinen Elementknoten übertragen werden, wird durch einen Ereignisempfänger beschrieben.

	function onUpdateCircle(Node,Points){
		Node.setValue('cx',Points[0].x).setValue('cy',Points[0].y);
		return Points[0].z*3;
	}
	function onUpdatePolygon(Node,Points){
		Node.setValue('points',[Points[0].x,Points[0].y,Points[1].x,Points[1].y,Points[2].x,Points[2].y].join(' '));
		return Points[0].z+Points[1].z+Points[2].z;
	}

Aus den bisher definierten Werten können nun acht Objekte erzeugt werden, die den Seitenflächen und Eckpunkte des Tetraeders entsprechen.

	var circleObjectA=new s3d.Object(circleModelA, [pointA], onUpdateCircle);
	var circleObjectB=new s3d.Object(circleModelB, [pointB], onUpdateCircle);
	var circleObjectC=new s3d.Object(circleModelC, [pointC], onUpdateCircle);
	var circleObjectD=new s3d.Object(circleModelD, [pointD], onUpdateCircle);
	var polygonObjectA=new s3d.Object(polygonModelA, [pointB, pointC, pointD], onUpdatePolygon);
	var polygonObjectB=new s3d.Object(polygonModelB, [pointA, pointD, pointC], onUpdatePolygon);
	var polygonObjectC=new s3d.Object(polygonModelC, [pointD, pointA, pointB], onUpdatePolygon);
	var polygonObjectD=new s3d.Object(polygonModelD, [pointC, pointB, pointA], onUpdatePolygon);

Als Nächstes folgt die Definition einiger Matrizen zur Positionierung der Szenenobjekte.

	var circleMatrix=new s3d.Matrix().setScale(1.1, 1.1, 1.1);
	var polygonMatrix=new s3d.Matrix();
	var crossEyeLeftMatrix=new s3d.Matrix().setCommand('O', 0.5, 0.5, 0, 'R', 0, 1, 0, -0.08);
	var crossEyeRightMatrix=new s3d.Matrix().setCommand('O', 2.5, 0.5, 0, 'R', 0, 1, 0, 0.08);

Die nachfolgend definierten Szenengruppen ermöglichen die Anwendung der Matrizen auf die Szenenobjekte.

	var circleGroup=new s3d.Group(circleMatrix, null, [circleObjectA, circleObjectB, circleObjectC, circleObjectD]);
	var polygonGroup=new s3d.Group(polygonMatrix, [circleGroup], [polygonObjectA, polygonObjectB, polygonObjectC, polygonObjectD]);
	var crossEyeLeftGroup=new s3d.Group(crossEyeLeftMatrix, [polygonGroup], null);
	var crossEyeRightGroup=new s3d.Group(crossEyeRightMatrix, [polygonGroup], null);
	var crossEyeSceneGroup=new s3d.Group(null, [crossEyeLeftGroup, crossEyeRightGroup], null);

Zum Zeichnen dieser Szenengruppe wird nun eine Zeichenfläche definiert.

	var surface=new s3d.Surface('cross-eye-scene', crossEyeSceneGroup, false, true, false, 0);

Zur Anzeige der Zeichenfläche wird eine Leinwand erzeugt.

	var canvas=new s3d.Canvas(3, 1, 0, [surface]);

An dieser Leinwand soll ein Ereignisempfänger für das Ereignisse `onMouseEnter` angehängt werden, welcher den Linienstil des unter dem Mauszeiger befindlichen Elementknotens verändern.

	var targetNode=null;
	function onMouseEnterCanvas(evt){
		if(targetNode)targetNode.setValue('stroke-width','0.02').setValue('stroke-dasharray','0');
		targetNode=evt.target.correspondingElement;
		if(targetNode)targetNode.setValue('stroke-width','0.04').setValue('stroke-dasharray','0 0.04');
	}

Zum Schluss werden die Größe der Leinwand gesetzt, der Ereignisempfänger der Leinwand angehängt und der Elementknoten der Leinwand in die Webseite eingefügt werden.

	document.getElementById('container').appendChild(canvas.node.setValues({
		'width':'768', 'height':'256'
	}).setStyles({
		'width':'768px', 'height':'256px', 'margin':'8px', 'outline':'black solid 1px'
	}).appendEvent(s3d.Event.onMouseEnter, onMouseEnterCanvas, false));

Diese Letze Zeile schließt das Beispiel für ein statisches Bild ab.

Im Folgenden soll das begonnene Beispiel um animierte Änderung von Größe und Rotation der Szenengruppe `polygonGroup` erweitert werden. Für diese Änderungen werden Partikelvektoren mit Trägheits- und Reibungssimulation verwendet. Diese bestehen je aus einem Jetzt-, einem Ziel- und einem Geschwindigkeitswert.

	var vectors=[[1, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

Die Zielwerte werden alle `1000` Millisekunden zufällig neun bestimmt.

	setInterval(function(){
		for(var i=0,size=vectors.length;i&lt;size;i++)vectors[i][1]=Math.random()-0.5;
	}, 1000);

Die Jetzt- und Geschwindigkeitswerte werden alle `15` Millisekunden neu berechnet.

	setInterval(function(){
		for(var i=0,size=vectors.length;i&lt;size;i++)vectors[i][0]+=(vectors[i][2]=vectors[i][2]*0.94+(vectors[i][1]-vectors[i][0])*0.006);
	}, 15);

Zum Schluss werden die Jetztwerte der Vektoren zur Berechnung der Matrix der Szenengruppe verwendet. Nach der Manipulation der Matrix werden die Knoten der Zeichenfläche aktualisiert. Dieser Prozess wiederholt sich alle `50` Millisekunden.
	
	setInterval(function(){
		var s=0.5+vectors[0][0]*0.6;
		polygonMatrix.setCommand('R',0,0,1,vectors[1][0]*6.28,'R',0,1,0,vectors[2][0]*6.28,'R',1,0,0,vectors[3][0]*6.28,'S',s,s,s);
		surface.update();
	}, 50);

Alles zusammen sieht dann so aus: [demo/s3d-demo.html](demo/s3d-demo.html "s3d-demo.html")

---

### ENGLISH

This library defines some classes for creating animatable 3D-scenes with SVG. It depends on the library `pc`. To be able use the name-space, one simply calls the function `s3d`. It creates the name-space, replaces itself with it and returns it.

The now following example should illustrate the usage of this library. Like already described, the name-space `s3d` has to be initialized first.

	s3d();

For the description of scene-objects one needs models of element-nodes. The models used here define `SVGCircleElement`- and `SVGPolygonElement`-element-nodes in the colors white, red, green and blue.

	var circleModelA=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(255,255,255)', 'fill-opacity':'0.80', 'stroke':'rgb(127,127,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	},null);
	var circleModelB=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(255,0,0)', 'fill-opacity':'0.80', 'stroke':'rgb(127,0,0)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var circleModelC=new s3d.Model('svg:circle', {
		'r':'0.08', 'fill':'rgb(0,255,0)', 'fill-opacity':'0.80', 'stroke':'rgb(0,127,64)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var circleModelD=new s3d.Model('svg:circle',{
		'r':'0.08', 'fill':'rgb(0,0,255)', 'fill-opacity':'0.80', 'stroke':'rgb(0,0,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelA=new s3d.Model('svg:polygon', {
		'fill':'rgb(255,255,255)', 'fill-opacity':'0.80', 'stroke':'rgb(127,127,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelB=new s3d.Model('svg:polygon', {
		'fill':'rgb(255,0,0)', 'fill-opacity':'0.80', 'stroke':'rgb(127,0,0)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelC=new s3d.Model('svg:polygon', {
		'fill':'rgb(0,255,0)', 'fill-opacity':'0.80', 'stroke':'rgb(0,127,64)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	var polygonModelD=new s3d.Model('svg:polygon', {
		'fill':'rgb(0,0,255)', 'fill-opacity':'0.80', 'stroke':'rgb(0,0,127)', 'stroke-width':'0.02', 'stroke-opacity':'0.70', 'stroke-linejoin':'round', 'stroke-linecap':'round'
	}, null);
	
In order to be able to position scene-objects, they must have points that are transformed via matrices. The points defined here correspond to the vertices of a tetrahedron.

	var pointA=new s3d.Point(0,0.5443310539518172,0,1);
	var pointB=new s3d.Point(-0.5,-0.2721655269759087,0.28867513459481287,1);
	var pointC=new s3d.Point(0.5,-0.2721655269759087,0.28867513459481287,1);
	var pointD=new s3d.Point(0,-0.2721655269759087,-0.5773502691896257,1);

How the transformed points of an scene-object are transfered to its element-node, is determined by an event-listener.

	function onUpdateCircle(Node,Points){
		Node.setValue('cx',Points[0].x).setValue('cy',Points[0].y);
		return Points[0].z*3;
	}
	function onUpdatePolygon(Node,Points){
		Node.setValue('points',[Points[0].x,Points[0].y,Points[1].x,Points[1].y,Points[2].x,Points[2].y].join(' '));
		return Points[0].z+Points[1].z+Points[2].z;
	}
From the previously defined values now eight objects can be created, that correspond to the faces and vertices of the tetrahedron.

	var circleObjectA=new s3d.Object(circleModelA, [pointA], onUpdateCircle);
	var circleObjectB=new s3d.Object(circleModelB, [pointB], onUpdateCircle);
	var circleObjectC=new s3d.Object(circleModelC, [pointC], onUpdateCircle);
	var circleObjectD=new s3d.Object(circleModelD, [pointD], onUpdateCircle);
	var polygonObjectA=new s3d.Object(polygonModelA, [pointB, pointC, pointD], onUpdatePolygon);
	var polygonObjectB=new s3d.Object(polygonModelB, [pointA, pointD, pointC], onUpdatePolygon);
	var polygonObjectC=new s3d.Object(polygonModelC, [pointD, pointA, pointB], onUpdatePolygon);
	var polygonObjectD=new s3d.Object(polygonModelD, [pointC, pointB, pointA], onUpdatePolygon);

Next is the definition of some matrices for positioning scene-objects.

	var circleMatrix=new s3d.Matrix().setScale(1.1, 1.1, 1.1);
	var polygonMatrix=new s3d.Matrix();
	var crossEyeLeftMatrix=new s3d.Matrix().setCommand('O', 0.5, 0.5, 0, 'R', 0, 1, 0, -0.08);
	var crossEyeRightMatrix=new s3d.Matrix().setCommand('O', 2.5, 0.5, 0, 'R', 0, 1, 0, 0.08);
	
The following defined scene-groups allows the application of the matrices to the scene-objects.

	var circleGroup=new s3d.Group(circleMatrix, null, [circleObjectA, circleObjectB, circleObjectC, circleObjectD]);
	var polygonGroup=new s3d.Group(polygonMatrix, [circleGroup], [polygonObjectA, polygonObjectB, polygonObjectC, polygonObjectD]);
	var crossEyeLeftGroup=new s3d.Group(crossEyeLeftMatrix, [polygonGroup], null);
	var crossEyeRightGroup=new s3d.Group(crossEyeRightMatrix, [polygonGroup], null);
	var crossEyeSceneGroup=new s3d.Group(null, [crossEyeLeftGroup, crossEyeRightGroup], null);

To draw the scene-group now a surface is defined.

	var surface=new s3d.Surface('cross-eye-scene', crossEyeSceneGroup, false, true, false, 0);
	
To display the surface now a canvas is created.

	var canvas=new s3d.Canvas(3, 1, 0, [surface]);
	
To this canvas an event-listeners for the event `onMouseEnter` that change the stroke-style of the element-node under the cursor should be appended.

	var targetNode=null;
	function onMouseEnterCanvas(evt){
		if(targetNode)targetNode.setValue('stroke-width','0.02').setValue('stroke-dasharray','0');
		targetNode=evt.target.correspondingElement;
		if(targetNode)targetNode.setValue('stroke-width','0.04').setValue('stroke-dasharray','0 0.04');
	}

Finally, the size of the canvas is set, the event-listener is appended to the canvas and the element-node of the canvas is inserted into the web-page.

	document.getElementById('container').appendChild(canvas.node.setValues({
		'width':'768', 'height':'256'
	}).setStyles({
		'width':'768px', 'height':'256px', 'margin':'8px', 'outline':'black solid 1px'
	}).appendEvent(s3d.Event.onMouseEnter, onMouseEnterCanvas, false));
	
This last line closes the example for a static image.

Here, the begun example is extended by animation of size and rotation of the scene-group `polygonGroup`. For these changes particle-vectors will be used for inertia- and friction-simulation. This vectors consist of a now-, a target- and a speed-value.

	var vectors=[[1, 1, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

The target-values will be set to random values every `1000` milliseconds.

	setInterval(function(){
		for(var i=0,size=vectors.length;i&lt;size;i++)vectors[i][1]=Math.random()-0.5;
	}, 1000);

The now- and speed-values are recalculated every `15` milliseconds.

	setInterval(function(){
		for(var i=0,size=vectors.length;i&lt;size;i++)vectors[i][0]+=(vectors[i][2]=vectors[i][2]*0.94+(vectors[i][1]-vectors[i][0])*0.006);
	}, 15);

Finally, the now-values of the vectors are used to calculate the matrix of the scene-group. After the manipulation of the matrix the nodes of the surface are updated. This process is repeated every `50` milliseconds.

	setInterval(function(){
		var s=0.5+vectors[0][0]*0.6;
		polygonMatrix.setCommand('R',0,0,1,vectors[1][0]*6.28,'R',0,1,0,vectors[2][0]*6.28,'R',1,0,0,vectors[3][0]*6.28,'S',s,s,s);
		surface.update();
	}, 50);

All together looks like that: [demo/s3d-demo.html](demo/s3d-demo.html "s3d-demo.html")

---

##### [cc-by] Sebastian Rostock ( bee-creative@gmx.de )

Dieses Werk ist unter einem Creative Commons Namensnennung 3.0 Deutschland Lizenzvertrag lizenziert. Um die Lizenz anzusehen, gehen Sie bitte zu: [ http://creativecommons.org/licenses/by/3.0/de/ ] oder schicken Sie einen Brief an: [ Creative Commons, 171 Second Street, Suite 300, San Francisco, California 94105, USA. ]
