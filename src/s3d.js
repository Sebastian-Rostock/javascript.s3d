/** s3d - svg 3D - [cc-by] Sebastian Rostock **/
/** Dieses Werk ist unter einem Creative Commons Namensnennung 3.0 Deutschland Lizenzvertrag lizenziert. Um die Lizenz anzusehen, gehen Sie bitte zu:  [ http://creativecommons.org/licenses/by/3.0/de/ ] oder schicken Sie einen Brief an:  [ Creative Commons, 171 Second Street, Suite 300, San Francisco, California 94105, USA. ] **/

function s3d(){ // (): s3d
	pc();
	var s3dUserData=pc.Of(function(){ // (): Object
		this.This.userData=null;
		this.This.setUserData=function(UserData){ // (UserData: Object): s3d.UserData
			this.userData=UserData;
			return this;
		};
		return function(){ // (): s3d.UserData
		};
	},true);
	var s3dSkipMode=pc.Of(function(){ // (): Object
		this.This.skipMode=0;
		return function(){ // (): s3d.SkipMode
		};
	},true);
	s3d=pc.Ns({SKIP_APPLY:1,SKIP_UPDATE:2,SKIP_DISPLAY:4,Event:{onClick:'click',onMouseDown:'mousedown',onMouseUp:'mouseup',onMouseEnter:'mouseover',onMouseMove:'mousemove',onMouseLeave:'mouseout',onMouseWheel:'mousewheel',onZoom:'SVGZoom',onLoad:'SVGLoad',onUnload:'SVGUnload',onAbort:'SVGAbort',onError:'SVGError',onResize:'SVGResize',onScroll:'SVGScroll',onActivate:'DOMActivate',onFocusEnter:'DOMFocusIn',onFocusLeave:'DOMFocusOut',onNodeRemoved:'DOMNodeRemoved',onNodeRemovedFromDocument:'DOMNodeRemovedFromDocument',onNodeInserted:'DOMNodeInserted',onNodeInsertedIntoDocument:'DOMNodeInsertedIntoDocument',onSubtreeModified:'DOMSubtreeModified',onAttributeModified:'DOMAttrModified',onCharacterdataModified:'DOMCharacterDataModified'},NameSpace:{svg:'http://www.w3.org/2000/svg',xhtml:'http://www.w3.org/1999/xhtml',xlink:'http://www.w3.org/1999/xlink'}});
	s3d.Base=pc.Of(function(){ // (): s3d.SkipMode, s3d.UserData
		this.Super(s3dSkipMode,s3dUserData);
		this.This.setSkipMode=function(SkipMode){ // (SkipMode: Number): s3d.Base
			this.skipMode=Number(SkipMode)||0;
			return this;
		};
		return function(){ // (): s3d.Base
		};
	},true);
	var copy=function(This,Data){ // (This, Data: Object{}): Object{}
		for(var key in Data)This[key]=Data[key];
		return This;
	};
	s3d.Text=pc.Of(function(){ // (Text: String): DOMNode
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Text',[pc.TextToString(this.nodeValue)],false);
		};
		return function(Text){ // (Text: String): s3d.Text
			return copy(document.createTextNode(String(Text)),this);
		};
	},true);
	var names={}; // String[]{}
	var nameOf=function(Key){ // (Key: String): String[]
		return (names[Key]||(names[Key]=((Key=Key.split(/:/))[1]?[s3d.NameSpace[Key[0]],Key[1]]:Key)));
	};
	s3d.Node=pc.Of(function(){ // (Name, NameSpace: String): DOMNode, s3d.UserData
		this.Super(s3dUserData);
		this.This.assignNodes=function(Nodes){ // (Nodes: DOMNode[]): s3d.Node
			return this.deleteNodes().appendNodes(Nodes);
		};
		this.This.deleteNodes=function(){ // (): s3d.Node
			while(this.lastChild)this.removeChild(this.lastChild);
			return this;
		};
		this.This.appendNode=function(Node){ // (Node: DOMNode): s3d.Node
			if(Node)this.appendChild(Node);
			return this;
		};
		this.This.appendNodes=function(Nodes){ // (Nodes: DOMNode[]): s3d.Node
			if(Nodes)for(var i=0,size=Nodes.length;i<size;i++)this.appendNode(Nodes[i]);
			return this;
		};
		this.This.removeNode=function(Node){ // (Node: DOMNode): s3d.Node
			if(Node)this.removeChild(Node);
			return this;
		};
		this.This.removeNodes=function(Nodes){ // (Nodes: DOMNode[]): s3d.Node
			if(Nodes)for(var i=0,size=Nodes.length;i<size;i++)this.removeNode(Nodes[i]);
			return this;
		};
		this.This.appendEvent=function(Type,Method,Capture){ // (Type: String; Method: DOMEventListener; Capture: Boolean): s3d.Node
			if(Type&&Method)this.addEventListener(s3d.Event[Type]||Type,Method,Capture);
			return this;
		};
		this.This.appendEvents=function(Methods,Capture){ // (Methods: DOMEventListener{}; Capture: Boolean): s3d.Node
			if(Methods)for(var key in Methods)this.appendEvent(key,Methods[key],Capture);
			return this;
		};
		this.This.removeEvent=function(Type,Method,Capture){ // (Type: String; Method: DOMEventListener; Capture: Boolean): s3d.Node
			if(Type&&Method)this.removeEventListener(s3d.Event[Type]||Type,Method,Capture);
			return this;
		};
		this.This.removeEvents=function(Methods,Capture){ // (Methods: DOMEventListener{}; Capture: Boolean): s3d.Node
			if(Methods)for(var key in Methods)this.removeEvent(key,Methods[key],Capture);
			return this;
		};
		this.This.getValue=function(Key){ // (Key: String): String
			return ((Key=nameOf(Key))[1]?this.getAttributeNS(Key[0],Key[1]):this.getAttribute(Key[0]));
		};
		this.This.getValues=function(Keys){ // (Keys: String[]): String{}
			var map={};
			if(Keys)for(var i=0,size=Keys.length,key;i<size;i++)map[key=Keys[i]]=this.getValue(key);
			return map;
		};
		this.This.setValue=function(Key,Value){ // (Key, Value: String): s3d.Node
			if((Key=nameOf(Key))[1])this.setAttributeNS(Key[0],Key[1],Value);else this.setAttribute(Key[0],Value);
			return this;
		};
		this.This.setValues=function(Values){ // (Values: String{}): s3d.Node
			if(Values)for(var key in Values)this.setValue(key,Values[key]);
			return this;
		};
		this.This.getStyle=function(Key){ // (Key: String): String
			return this.style[Key];
		};
		this.This.getStyles=function(Keys){ // (Keys: String[]): String{}
			var map={};
			if(Keys)for(var i=0,size=Keys.length,key;i<size;i++)map[key=Keys[i]]=this.style[key];
			return map;
		};
		this.This.setStyle=function(Key,Style){ // (Key, Style: String): s3d.Node
			this.style[Key]=Style;
			return this;
		};
		this.This.setStyles=function(Styles){ // (Styles: String{}): s3d.Node
			if(Styles)for(var key in Styles)this.style[key]=Styles[key];
			return this;
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Node',[pc.TextToString(this.nodeName),pc.TextToString(this.namespaceURI)],false);
		};
		return function(Name,NameSpace){ // (Name, NameSpace: String): s3d.Node
			return copy((NameSpace?document.createElementNS(NameSpace,Name):((Name=nameOf(Name))[1]?document.createElementNS(Name[0],Name[1]):document.createElement(Name[0]))),this);
		};
	},true);
	s3d.Model=pc.Of(function(){ // (Name: String; Values: String{}; Models: ?<String; s3d.Model>[]): s3d.UserData
		this.Super(s3dUserData);
		this.This.set=function(Name,Values,Models,Styles,BubbleEvents,CaptureEvents,UserData){ // (Name: String; Values: String{}; Models: ?<String; s3d.Model>[]; Styles: String{}; BubbleEvents, CaptureEvents: DOMEventListener{}; UserData: Object): s3d.Model
			return this.setName(Name).setValues(Values).setModels(Models).setStyles(Styles).setBubbleEvents(BubbleEvents).setCaptureEvents(CaptureEvents).setUserData(UserData);
		};
		this.This.setName=function(Name){ // (Name: String): s3d.Model
			this.name=Name;
			return this;
		};
		this.This.setValues=function(Values){ // (Values: String{}): s3d.Model
			this.values=Values||null;
			return this;
		};
		this.This.setModels=function(Models){ // (Models: ?<String; s3d.Model>[]): s3d.Model
			this.models=Models||null;
			return this;
		};
		this.This.setStyles=function(Styles){ // (Styles: String{}): s3d.Model
			this.styles=Styles||null;
			return this;
		};
		this.This.setBubbleEvents=function(BubbleEvents){ // (BubbleEvents: DOMEventListener{}): s3d.Model
			this.bubbleEvents=BubbleEvents||null;
			return this;
		};
		this.This.setCaptureEvents=function(CaptureEvents){ // (CaptureEvents: DOMEventListener{}): s3d.Model
			this.captureEvents=CaptureEvents||null;
			return this;
		};
		this.This.setModel=function(Model){ // (Model: s3d.Model): s3d.Model
			return this.set(Model.name,Model.values,Model.models,Model.styles,Model.bubbleEvents,Model.captureEvents,Model.userData);
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Model',[pc.TextToString(this.name),pc.MapToString(this.values),pc.ListToString(this.models)],true);
		};
		this.Type.toNode=function(Model){ // (Model: ?<String; s3d.Model>): ?<s3d.Text; s3d.Node>
			return ((Model&&(typeof(Model)=='object'))?new s3d.Node(Model.name).setValues(Model.values).appendNodes(this.toNodes(Model.models)).setStyles(Model.styles).setUserData(Model.userData).appendEvents(Model.bubbleEvents,false).appendEvents(Model.captureEvents,true):new s3d.Text(Model));
		};
		this.Type.toNodes=function(Models){ // (Models: ?<String; s3d.Model>[]): ?<s3d.Text; s3d.Node>[]
			var list=[];
			if(Models)for(var i=0,size=Models.length;i<size;i++)list.push(this.toNode(Models[i]));
			return list;
		};
		return function(Name,Values,Models){ // (Name: String; Values: String{}; Models: ?<String; s3d.Model>[]): s3d.Model
			this.set(Name,Values,Models,null,null,null,null);
		};
	},true);
	s3d.Point=pc.Of(function(){ // (X, Y, Z, I: Number): Object
		this.This.set=function(X,Y,Z,I){ // (X, Y, Z, I: Number): s3d.Point
			this.x=X;
			this.y=Y;
			this.z=Z;
			this.i=I;
			return this;
		};
		this.This.setPoint=function(Point){ // (Point: s3d.Point): s3d.Point
			return this.set(Point.x,Point.y,Point.z,Point.i);
		};
		this.This.clipI=function(){ // (): s3d.Point
			var i=this.i;
			return (i?this.set(this.x/i,this.y/i,this.z/i,1):this);
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Point',[this.x,this.y,this.z,this.i],false);
		};
		return function(X,Y,Z,I){ // (X, Y, Z, I: Number): s3d.Point
			this.set(X,Y,Z,I);
		};
	},true);
	s3d.Matrix=pc.Of(function(){ // (XX, XY, XZ, XI, YX, YY, YZ, YI, ZX, ZY, ZZ, ZI, IX, IY, IZ, II: Number): Object
		this.This.set=function(XX,XY,XZ,XI,YX,YY,YZ,YI,ZX,ZY,ZZ,ZI,IX,IY,IZ,II){ // (XX, XY, XZ, XI, YX, YY, YZ, YI, ZX, ZY, ZZ, ZI, IX, IY, IZ, II: Number): s3d.Matrix
			this.x.set(XX,XY,XZ,XI);
			this.y.set(YX,YY,YZ,YI);
			this.z.set(ZX,ZY,ZZ,ZI);
			this.i.set(IX,IY,IZ,II);
			return this;
		};
		this.This.setId=function(){ // (): s3d.Matrix
			return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		};
		this.This.setChain=function(){ // (...: s3d.Matrix): s3d.Matrix
			var i=0,size=arguments.length,last=chainLast,next=chainNext;
			switch(size){
				case 0:return this.setId();
				case 1:return this.setMatrix(arguments[0]);
				default:last.setMatrix(arguments[0]);
			}
			while(++i<size)next=last.applyToMatrix(last=next,arguments[i]);
			return this.setMatrix(last);
		};
		this.This.setScale=function(X,Y,Z){ // (X, Y, Z: Number): s3d.Matrix
			return this.set(X,0,0,0,0,Y,0,0,0,0,Z,0,0,0,0,1);
		};
		this.This.setScaleX=function(X){ // (X: Number): s3d.Matrix
			return this.setScale(X,1,1);
		};
		this.This.setScaleY=function(Y){ // (Y: Number): s3d.Matrix
			return this.setScale(1,Y,1);
		};
		this.This.setScaleZ=function(Z){ // (Z: Number): s3d.Matrix
			return this.setScale(1,1,Z);
		};
		this.This.setOffset=function(X,Y,Z){ // (X, Y, Z: Number): s3d.Matrix
			return this.set(1,0,0,X,0,1,0,Y,0,0,1,Z,0,0,0,1);
		};
		this.This.setOffsetX=function(X){ // (X: Number): s3d.Matrix
			return this.setOffset(X,0,0);
		};
		this.This.setOffsetY=function(Y){ // (Y: Number): s3d.Matrix
			return this.setOffset(0,Y,0);
		};
		this.This.setOffsetZ=function(Z){ // (Z: Number): s3d.Matrix
			return this.setOffset(0,0,Z);
		};
		this.This.setAspect=function(X,Y,Z){ // (X, Y, Z: Number): s3d.Matrix
			return this.set(1,0,0,0,0,1,0,0,0,0,1,0,X,Y,Z,1);
		};
		this.This.setAspectX=function(X){ // (X: Number): s3d.Matrix
			return this.setAspect(X,0,0);
		};
		this.This.setAspectY=function(Y){ // (Y: Number): s3d.Matrix
			return this.setAspect(0,Y,0);
		};
		this.This.setAspectZ=function(Z){ // (Z: Number): s3d.Matrix
			return this.setAspect(0,0,Z);
		};
		this.This.setRotate=function(X,Y,Z,A){ // (X, Y, Z, A: Number): s3d.Matrix
			var sqrN=X*X+Y*Y+Z*Z,sqrtN=Math.sqrt(sqrN),sinA=Math.sin(A)/sqrtN,cosA=Math.cos(A),nosA=(1-cosA)/sqrN;
			return this.set(X*X*nosA+1*cosA,Y*X*nosA-Z*sinA,Z*X*nosA+Y*sinA,0,X*Y*nosA+Z*sinA,Y*Y*nosA+1*cosA,Z*Y*nosA-X*sinA,0,X*Z*nosA-Y*sinA,Y*Z*nosA+X*sinA,Z*Y*nosA+1*cosA,0,0,0,0,1);
		};
		this.This.setRotateX=function(X){ // (X: Number): s3d.Matrix
			var sinX=Math.sin(X),cosX=Math.cos(X);
			return this.set(1,0,0,0,0,cosX,-sinX,0,0,sinX,cosX,0,0,0,0,1);
		};
		this.This.setRotateY=function(Y){ // (Y: Number): s3d.Matrix
			var sinY=Math.sin(Y),cosY=Math.cos(Y);
			return this.set(cosY,0,-sinY,0,0,1,0,0,sinY,0,cosY,0,0,0,0,1);
		};
		this.This.setRotateZ=function(Z){ // (Z: Number): s3d.Matrix
			var sinZ=Math.sin(Z),cosZ=Math.cos(Z);
			return this.set(cosZ,-sinZ,0,0,sinZ,cosZ,0,0,0,0,1,0,0,0,0,1);
		};
		this.This.setMatrix=function(Matrix){ // (Matrix: s3d.Matrix): s3d.Matrix
			this.x.setPoint(Matrix.x);
			this.y.setPoint(Matrix.y);
			this.z.setPoint(Matrix.z);
			this.i.setPoint(Matrix.i);
			return this;
		};
		this.This.setCommand=function(){ // (...: ?<String; Number; s3d.Matrix>): s3d.Matrix
			var i=0,size=arguments.length,item,last=commandLast,next=commandNext,temp=commandThis,list;
			if(size==0)return this.setId();else list=[];
			last.setId();
			while(i<size)if((item=arguments[i++])=='T')list.push('M',this);else list.push(item);
			while(list.length)if((item=list.shift())&&item.split&&(item=commandMap[item]))next=last.applyToMatrix(last=next,temp[item].apply(temp,list));
			return this.setMatrix(last);
		};
		this.This.applyTo=function(Matrix){ // (Matrix: s3d.Matrix): s3d.Matrix
			return this.applyToMatrix(this,Matrix);
		};
		this.This.applyToPoint=function(Target,Source){ // (Target, Source: s3d.Point): s3d.Matrix
			if(Source&&(Source!==Target)){
				var p=this.x;
				Target.x=p.x*Source.x+p.y*Source.y+p.z*Source.z+p.i*Source.i;
				p=this.y;
				Target.y=p.x*Source.x+p.y*Source.y+p.z*Source.z+p.i*Source.i;
				p=this.z;
				Target.z=p.x*Source.x+p.y*Source.y+p.z*Source.z+p.i*Source.i;
				p=this.i;
				Target.i=p.x*Source.x+p.y*Source.y+p.z*Source.z+p.i*Source.i;
			}else{
				this.applyToPoint(applyPoint,Target);
				Target.setPoint(applyPoint);
			}
			return this;
		};
		this.This.applyToMatrix=function(Target,Source){ // (Target, Source: s3d.Matrix): s3d.Matrix
			if(Source&&(Source!==Target)){
				var p=this.x;
				Target.x.set(p.x*Source.x.x+p.y*Source.y.x+p.z*Source.z.x+p.i*Source.i.x,p.x*Source.x.y+p.y*Source.y.y+p.z*Source.z.y+p.i*Source.i.y,p.x*Source.x.z+p.y*Source.y.z+p.z*Source.z.z+p.i*Source.i.z,p.x*Source.x.i+p.y*Source.y.i+p.z*Source.z.i+p.i*Source.i.i);
				p=this.y;
				Target.y.set(p.x*Source.x.x+p.y*Source.y.x+p.z*Source.z.x+p.i*Source.i.x,p.x*Source.x.y+p.y*Source.y.y+p.z*Source.z.y+p.i*Source.i.y,p.x*Source.x.z+p.y*Source.y.z+p.z*Source.z.z+p.i*Source.i.z,p.x*Source.x.i+p.y*Source.y.i+p.z*Source.z.i+p.i*Source.i.i);
				p=this.z;
				Target.z.set(p.x*Source.x.x+p.y*Source.y.x+p.z*Source.z.x+p.i*Source.i.x,p.x*Source.x.y+p.y*Source.y.y+p.z*Source.z.y+p.i*Source.i.y,p.x*Source.x.z+p.y*Source.y.z+p.z*Source.z.z+p.i*Source.i.z,p.x*Source.x.i+p.y*Source.y.i+p.z*Source.z.i+p.i*Source.i.i);
				p=this.i;
				Target.i.set(p.x*Source.x.x+p.y*Source.y.x+p.z*Source.z.x+p.i*Source.i.x,p.x*Source.x.y+p.y*Source.y.y+p.z*Source.z.y+p.i*Source.i.y,p.x*Source.x.z+p.y*Source.y.z+p.z*Source.z.z+p.i*Source.i.z,p.x*Source.x.i+p.y*Source.y.i+p.z*Source.z.i+p.i*Source.i.i);
			}else{
				this.applyToMatrix(applyMatrix,Target);
				Target.setMatrix(applyMatrix);
			}
			return this;
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Matrix',[this.x.x,this.x.y,this.x.z,this.x.i,this.y.x,this.y.y,this.y.z,this.y.i,this.z.x,this.z.y,this.z.z,this.z.i,this.i.x,this.i.y,this.i.z,this.i.i],false);
		};
		return function(XX,XY,XZ,XI,YX,YY,YZ,YI,ZX,ZY,ZZ,ZI,IX,IY,IZ,II){ // (XX, XY, XZ, XI, YX, YY, YZ, YI, ZX, ZY, ZZ, ZI, IX, IY, IZ, II: Number): s3d.Matrix
			this.x=new s3d.Point(XX,XY,XZ,XI);
			this.y=new s3d.Point(YX,YY,YZ,YI);
			this.z=new s3d.Point(ZX,ZY,ZZ,ZI);
			this.i=new s3d.Point(IX,IY,IZ,II);
			if(arguments.length!=16)this.setId();
		};
	},true);
	var applyPoint=new s3d.Point();
	var applyMatrix=new s3d.Matrix();
	var chainLast=new s3d.Matrix();
	var chainNext=new s3d.Matrix();
	var commandMap={D:'set',S:'setScale',O:'setOffset',A:'setAspect',R:'setRotate',M:'setMatrix'};
	var commandLast=new s3d.Matrix();
	var commandNext=new s3d.Matrix();
	var commandThis=new s3d.Matrix();
	s3d.Group=pc.Of(function(){ // (Matrix: s3d.Matrix; Groups: s3d.Group[]; Objects: s3d.Object[]): s3d.Base
		this.Super(s3d.Base);
		this.This.set=function(Matrix,Groups,Objects,UserData,SkipMode){ // set(Matrix: s3d.Matrix; Groups: s3d.Group[]; Objects: s3d.Object[]; UserData: Object; SkipMode: Number): s3d.Group
			return this.setMatrix(Matrix).setGroups(Groups).setObjects(Objects).setUserData(UserData).setSkipMode(SkipMode);
		};
		this.This.setMatrix=function(Matrix){ // (Matrix: s3d.Matrix): s3d.Group
			this.matrix=Matrix||null;
			return this;
		};
		this.This.setGroups=function(Groups){ // (Groups: s3d.Group[]): s3d.Group
			this.groups=Groups||null;
			return this;
		};
		this.This.setObjects=function(Objects){ // (Objects: s3d.Object[]): s3d.Group
			this.objects=Objects||null;
			return this;
		};
		this.This.setGroup=function(Group){ // (Group: s3d.Group): s3d.Group
			return this.set(Group.matrix,Group.groups,Group.objects,Group.userData,Group.skipMode);
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Group',[this.matrix,pc.ListToString(this.groups),pc.ListToString(this.objects)],true);
		};
		return function(Matrix,Groups,Objects){ // (Matrix: s3d.Matrix; Groups: s3d.Group[]; Objects: s3d.Object[]): s3d.Group
			this.set(Matrix,Groups,Objects,null,0);
		};
	},true);
	s3d.Object=pc.Of(function(){ // (Model: s3d.Model; Points: s3d.Point[]; OnUpdate: s3d.OnUpdateMethod): s3d.Base
		this.Super(s3d.Base);
		this.This.set=function(Model,Points,OnUpdate,UserData,SkipMode){ // (Model: s3d.Model; Points: s3d.Point[]; OnUpdate: s3d.OnUpdateMethod; UserData: Object; SkipMode: Boolean): s3d.Object
			return this.setModel(Model).setPoints(Points).setOnUpdate(OnUpdate).setUserData(UserData).setSkipMode(SkipMode);
		};
		this.This.setModel=function(Model){ // (Model: s3d.Model): s3d.Object
			this.model=Model||null;
			return this;
		};
		this.This.setPoints=function(Points){ // (Points: s3d.Point[]): s3d.Object
			this.points=Points||null;
			return this;
		};
		this.This.setOnUpdate=function(OnUpdate){ // (OnUpdate: s3d.OnUpdateMethod): s3d.Object
			this.onUpdate=OnUpdate||null;
			return this;
		};
		this.This.setObject=function(Object){ // (Object: s3d.Object): s3d.Object
			return this.set(Object.model,Object.points,Object.onUpdate,Object.userData,Object.skipMode);
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Object',[this.model,pc.ListToString(this.points),this.onUpdate],true);
		};
		return function(Model,Points,OnUpdate){ // (Model: s3d.Model; Points: s3d.Point[]; OnUpdate: s3d.OnUpdateMethod): s3d.Object
			this.set(Model,Points,OnUpdate,null,0);
		};
	},true);
	var canvasModel=new s3d.Model('svg:svg',{width:'1',height:'1',viewBox:'0,0,1,1',preserveAspectRatio:'none'},[new s3d.Model('svg:defs'),new s3d.Model('svg:rect',{x:'0',y:'0',width:'1',height:'1'}),new s3d.Model('svg:use',{x:'0',y:'0',width:'1',height:'1'})]);
	s3d.Canvas=pc.Of(function(){ // (Width, Height, Index: Number; Surfaces: s3d.Surface[]): s3d.UserData
		this.Super(s3dUserData);
		this.This.set=function(Width,Height,Index,Surfaces,UserData){ // (Width, Height, Index: Number; Surfaces: s3d.Surface[]; UserData: Object): s3d.Canvas
			return this.setWidth(Width).setHeight(Height).setIndex(Index).setSurfaces(Surfaces).setUserData(UserData);
		};
		this.This.setWidth=function(Width){ // (Width: Number): s3d.Canvas
			this.node.setValue('viewBox',[0,0,this.width=(Number(Width)||0),this.height].join(',')).firstChild.nextSibling.setValue('width',Width);
			return this;
		};
		this.This.setHeight=function(Height){ // (Height: Number): s3d.Canvas
			this.node.setValue('viewBox',[0,0,this.width,this.height=(Number(Height)||0)].join(',')).firstChild.nextSibling.setValue('height',Height);
			return this;
		};
		this.This.setIndex=function(Index){ // (Index: Number): s3d.Canvas
			this.index=Number(Index)||0;
			return this.update();
		};
		this.This.setSurfaces=function(Surfaces){ // (Surfaces: s3d.Surface[]): s3d.Canvas
			this.surfaces=Surfaces||null;
			return this.update();
		};
		this.This.setCanvas=function(Canvas){ // (Canvas: s3d.Canvas): s3d.Canvas
			return this.set(Canvas.width,Canvas.height,Canvas.index,Canvas.surfaces,Canvas.userData);
		};
		this.This.clear=function(){ // (): s3d.Canvas
			this.node.lastChild.setValue('xlink:href','nil').previousSibling.setValue('fill','none').previousSibling.deleteNodes();
			return this;
		};
		this.This.update=function(){ // (): s3d.Canvas
			var node=this.node.firstChild,surface,surfaces=this.surfaces;
			if(surfaces&&(surface=surfaces[this.index])){
				for(var i=0,size=surfaces.length,newNode,nowNode,nowNodes=node.childNodes;i<size;i++)if((nowNode=nowNodes[i])!==(newNode=surfaces[i].node))node.insertBefore(newNode,nowNode||null);
				node.nextSibling.setValue('fill',surface.fillRef).nextSibling.setValue('xlink:href',surface.useRef);
				if(surface.virtual)surface.node.setValue('width',this.width).setValue('height',this.height).setValue('viewBox',[0,0,this.width,this.height].join(','));
			}else this.clear();
			return this;
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Canvas',[this.width,this.height,this.index,pc.ListToString(this.surfaces)],true);
		};
		return function(Width,Height,Index,Surfaces){ // (Width, Height, Index: Number; Surfaces: s3d.Surface[]): s3d.Canvas
			this.node=s3d.Model.toNode(canvasModel);
			this.set(Width,Height,Index,Surfaces,null);
		};
	},true);
	var surfaceRealModel=new s3d.Model('svg:g');
	var surfaceVirtualModel=new s3d.Model('svg:pattern',{width:'1',height:'1',viewBox:'0,0,1,1',patternUnits:'userSpaceOnUse',preserveAspectRatio:'none'});
	var surfaceCompareOrder=function(First,Second){ // (First, Second: S3DCacheObject): Number
		return ((First.order!==First.order)?((Second.order!==Second.order)?0:1):((Second.order!==Second.order)?-1:(First.order-Second.order)||(First.index-Second.index)));
	};
	var surfaceGenerateCache=function(Cache,Skip,Group,Matrix,NoJoin){ // (Cache: s3d.CacheSurface; Skip: s3d.SkipMode; Group: s3d.Group; Matrix: s3d.Matrix; NoJoin: Boolean): s3d.CacheGroup[]
		var groupSkip,pointMap={},pointSkip,pointCount=Cache.points.length,matrix=Matrix||Group.matrix,matrixSkip,matrixCount=Cache.matrices.length;
		if(Matrix&&Group.matrix)Cache.matrices.push(groupSkip=(matrixSkip=new s3d.CacheOperation(Matrix,Group.matrix,matrix=new s3d.Matrix())));else groupSkip=new s3dSkipMode();
		Cache.skips.push(new s3d.CacheOperation(Skip,Group,groupSkip));
		for(var o=0,object,objectList=Group.objects,objectSize=(objectList?objectList.length:0),objectSkip,objectPoints;o<objectSize;o++)if((object=objectList[o])&&object.model){
			Cache.objects.push(objectSkip=new s3d.CacheObject(Cache.objects.length,object,objectPoints=[]));
			Cache.skips.push(new s3d.CacheOperation(groupSkip,object,objectSkip));
			if(matrix){
				if(NoJoin){
					pointCount=Cache.points.length;
					for(var p=0,point,pointList=object.points,pointSize=(pointList?pointList.length:0);p<pointSize;p++)if(point=pointList[p]){
						Cache.points.push(point=new s3d.CacheOperation(matrix,point,new s3d.Point()));
						objectPoints.push(point.target);
					}else objectPoints.push(null);
					if(pointSkip=Cache.points[pointCount]){
						Cache.skips.push(new s3d.CacheOperation(objectSkip,objectSkip,pointSkip));
						pointSkip.skipCount=Cache.points.length-pointCount-1;
					}
				}else{
					for(var p=0,point,pointList=object.points,pointSize=(pointList?pointList.length:0),key;p<pointSize;p++)if(point=pointList[p]){
						point=pointMap[key=[point.x,point.y,point.z,point.o].join('_')]||(pointMap[key]=new s3d.CacheOperation(matrix,point,new s3d.Point()));
						objectPoints.push(point.target);
					}else objectPoints.push(null);
				}
			}else{
				for(var p=0,pointList=object.points,pointSize=(pointList?pointList.length:0);p<pointSize;p++)
					objectPoints.push(pointList[p]||null);
			}
		}
		if(!NoJoin){
			for(var key in pointMap)Cache.points.push(pointMap[key]);
			if(pointSkip=Cache.points[pointCount]){
				Cache.skips.push(new s3d.CacheOperation(groupSkip,groupSkip,pointSkip));
				pointSkip.skipCount=Cache.points.length-pointCount-1;
			}
		}
		for(var g=0,groupList=Group.groups,groupSize=(groupList?groupList.length:0);g<groupSize;g++)
			surfaceGenerateCache(Cache,groupSkip,groupList[g],matrix,NoJoin);
		if(matrixSkip)matrixSkip.skipCount=Cache.matrices.length-matrixCount-1;
	};
	s3d.Surface=pc.Of(function(){ // (Id: String; Group: s3d.Group; Virtual, NoClip, NoJoin, NoSkip: Boolean): s3d.UserData
		this.Super(s3dUserData);
		this.This.set=function(Id,Group,Virtual,NoClip,NoJoin,NoSkip,UserData){ // (Id: String; Group: s3d.Group; Virtual, NoClip, NoJoin, NoSkip: Boolean; UserData: Object): s3d.Surface
			return this.setVirtual(Virtual).setId(Id).setNoClip(NoClip).setNoJoin(NoJoin).setNoSkip(NoSkip).setGroup(Group).setUserData(UserData);;
		};
		this.This.setId=function(Id){ // (Id: String): s3d.Surface
			this.id=String(Id);
			this.useRef=(this.virtual?'':'#r_'+this.id);
			this.fillRef=(this.virtual?'url(#v_'+this.id+')':'none');
			this.node.setValue('id',(this.virtual?'v_':'r_')+this.id);
			return this;
		};
		this.This.setGroup=function(Group){ // (Group: s3d.Group): s3d.Surface
			this.group=Group||null;
			return this.update(true);
		};
		this.This.setVirtual=function(Virtual){ // (Virtual: Boolean): s3d.Surface
			Virtual=s3d.Model.toNode(((this.virtual=Boolean(Virtual))?surfaceVirtualModel:surfaceRealModel));
			if(this.node){
				if(this.node.parentNode)this.node.parentNode.replaceChild(Virtual,this.node);
				this.node.deleteNodes();
			}
			this.node=Virtual;
			return this.setId(this.id).update(false);
		};
		this.This.setNoClip=function(NoClip){ // (NoClip: Boolean): s3d.Surface
			this.noClip=Boolean(NoClip);
			return this.update(false);
		};
		this.This.setNoJoin=function(NoJoin){ // (NoJoin: Boolean): s3d.Surface
			this.noJoin=Boolean(NoJoin);
			return this.update(true);
		};
		this.This.setNoSkip=function(NoSkip){ // (NoSkip: Boolean): s3d.Surface
			this.noSkip=Boolean(NoSkip);
			return this.update(false);
		};
		this.This.setSurface=function(Surface){ // (Surface: s3d.Surface): s3d.Surface
			return this.set(Surface.id,Surface.group,Surface.virtual,Surface.noClip,Surface.noJoin,Surface.noSkip,Surface.userData);
		};
		this.This.clear=function(Cache){ // (Cache: Boolean): s3d.Surface
			if(this.node)this.node.deleteNodes();
			if(Cache)this.cache=new s3d.CacheSurface([],[],[],[]);
			return this;
		};
		this.This.update=function(Cache){ // (Cache: Boolean): s3d.Surface
			if(Cache&&this.clear(Cache).group)surfaceGenerateCache(this.cache,new s3dSkipMode(),this.group,null,this.noJoin);
			if(this.noSkip){
				for(var i=0,item,list=this.cache.matrices,size=list.length;i<size;i++)
					(item=list[i]).parent.applyToMatrix(item.target,item.source);
				if(this.noClip){
					for(var i=0,item,list=this.cache.points,size=list.length;i<size;i++)
						(item=list[i]).parent.applyToPoint(item.target,item.source);
				}else{
					for(var i=0,item,list=this.cache.points,size=list.length,data;i<size;i++)
						{(item=list[i]).parent.applyToPoint(data=item.target,item.source);data.clipI();}
				}
				for(var i=0,item,list=this.cache.objects,size=list.length,data;i<size;i++)
					(item=list[i]).order=((data=item.object).onUpdate?Number(data.onUpdate(item.node,item.points)):NaN);
			}else{
				for(var i=0,item,list=this.cache.skips,size=list.length;i<size;i++)
					(item=list[i]).target.skipMode=item.parent.skipMode|item.source.skipMode;
				for(var i=0,item,list=this.cache.matrices,size=list.length;i<size;i++)
					if((item=list[i]).skipMode&1)i+=item.skipCount;
					else item.parent.applyToMatrix(item.target,item.source);
				if(this.noClip){
					for(var i=0,item,list=this.cache.points,size=list.length;i<size;i++)
						if((item=list[i]).skipMode&1)i+=item.skipCount;
						else item.parent.applyToPoint(item.target,item.source);
				}else{
					for(var i=0,item,list=this.cache.points,size=list.length,data;i<size;i++)
						if((item=list[i]).skipMode&1)i+=item.skipCount;
						else{item.parent.applyToPoint(data=item.target,item.source);data.clipI();}
				}
				for(var i=0,item,list=this.cache.objects,size=list.length,data;i<size;i++)
					(item=list[i]).order=((item.skipMode&2)?((item.skipMode&4)?NaN:item.order):((data=item.object).onUpdate?Number(data.onUpdate(item.node,item.points))+(item.skipMode&4?NaN:0):NaN));
			}
			for(var i=0,item,list=this.cache.objects.sort(surfaceCompareOrder),size=list.length,node=this.node,last=node.childNodes,next;i<size;i++)if((item=list[i]).order!=item.order){
				if(item=(next=item.node).parentNode)item.removeChild(next);
			}else if((item=item.node)!==(next=last[i]))node.insertBefore(item,next||null);
			return this;
		};
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.Surface',[pc.TextToString(this.id),this.group,this.virtual,this.noClip,this.noJoin,this.noSkip],true);
		};
		return function(Id,Group,Virtual,NoClip,NoJoin,NoSkip){ // (Id: String; Group: s3d.Group; Virtual, NoClip, NoJoin, NoSkip: Boolean): s3d.Surface
			this.clear(true).set(Id,Group,Virtual,NoClip,NoJoin,NoSkip,null);
		};
	},true);
	s3d.CacheObject=pc.Of(function(){ // (Index: Number; Object: s3d.Object; Points: s3d.Point[]): Object
		this.Super(s3dSkipMode);
		this.This.order=0;
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.CacheObject',[this.index,this.object,pc.ListToString(this.points)],true);
		};
		return function(Index,Object,Points){ // (Index: Number; Object: s3d.Object; Points: s3d.Point[]): s3d.CacheObject
			this.node=s3d.Model.toNode(Object.model);
			this.index=Index;
			this.object=Object;
			this.points=Points;
		};
	},true);
	s3d.CacheSurface=pc.Of(function(){ // (Skips: s3d.CacheOperation<s3d.SkipMode; s3d.SkipMode>[]; Points: s3d.CacheOperation<s3d.Matrix; s3d.Point>[]; Objects: s3d.CacheObject[]; Matrices: s3d.CacheOperation<s3d.Matrix; s3d.Matrix>[]): Object
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.CacheSurface',[pc.ListToString(this.skips),pc.ListToString(this.points),pc.ListToString(this.objects),pc.ListToString(this.matrices)],true);
		};
		return function(Skips,Points,Objects,Matrices){ // (Skips: s3d.CacheOperation<s3d.SkipMode; s3d.SkipMode>[]; Points: s3d.CacheOperation<s3d.Matrix; s3d.Point>[]; Objects: s3d.CacheObject[]; Matrices: s3d.CacheOperation<s3d.Matrix; s3d.Matrix>[]): s3d.CacheSurface
			this.skips=Skips;
			this.points=Points;
			this.objects=Objects;
			this.matrices=Matrices;
		};
	},true);
	s3d.CacheOperation=pc.Of(function(){ // <GParent; GValue>(Parent: GParent; Source, Target: GValue): s3d.SkipMode
		this.Super(s3dSkipMode);
		this.This.skipCount=0;
		this.This.toString=function(){ // (): String
			return pc.NewToString('s3d.CacheOperation',[this.parent,this.source,this.target],true);
		};
		return function(Parent,Source,Target){ // <GParent; GValue>(Parent: GParent; Source, Target: GValue): s3d.CacheOperation
			this.parent=Parent;
			this.source=Source;
			this.target=Target;
		};
	},true);
	return s3d;
}
