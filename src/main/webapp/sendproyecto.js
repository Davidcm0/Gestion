var self;
function ViewModel() {
	self = this;
	self.listaproyectos = ko.observableArray([]);
	self.proyectosSeleccionados = ko.observableArray([]);
	self.nombreProyecto = ko.observable('');
	self.user = ko.observable('');
	self.time = ko.observable('');
	self.datos = [];
	self.datos2 = [];
	self.datos3 = [];
	this.usuario = sessionStorage.userName;
	var url = "ws://" + window.location.host + "/Gestion";
	self.sws = new WebSocket(url);
	
	self.sws.onopen = function(event) {
		self.user(sessionStorage.userName);
		var msg = {
			type: "ready",
			nombre: sessionStorage.userName,
			vista: "gestionUsuarios",
			
		};
		self.sws.send(JSON.stringify(msg));
	};
	
	self.sws.onmessage = function(event) {


		var data = event.data;
		data = JSON.parse(data);
		var proyectos = data.proyectos;
		var resultados = data.resultados;
		var graficas = data.graficas;
		if(resultados != null){
			document.getElementById('timeMin').innerText = resultados[0].Time[0];
			document.getElementById('timeMax').innerText = resultados[0].Time[1];
			document.getElementById('timeMedia').innerText = resultados[0].Time[2];
			document.getElementById('timeQ1').innerText = resultados[0].Time[3];
			document.getElementById('timeQ3').innerText = resultados[0].Time[4];
			
			document.getElementById('HDDMin').innerText = resultados[0].HDD[0];
			document.getElementById('HDDMax').innerText = resultados[0].HDD[1];
			document.getElementById('HDDMedia').innerText = resultados[0].HDD[2];
			document.getElementById('HDDQ1').innerText = resultados[0].HDD[3];
			document.getElementById('HDDQ3').innerText = resultados[0].HDD[4];
			
			document.getElementById('GraphsMin').innerText = resultados[0].Grafica[0];
			document.getElementById('GraphsMax').innerText = resultados[0].Grafica[1];
			document.getElementById('GraphsMedia').innerText = resultados[0].Grafica[2];
			document.getElementById('GraphsQ1').innerText = resultados[0].Grafica[3];
			document.getElementById('GraphsQ3').innerText = resultados[0].Grafica[4];
			
			document.getElementById('ProcesadorMin').innerText = resultados[0].Procesador[0];
			document.getElementById('ProcesadorMax').innerText = resultados[0].Procesador[1];
			document.getElementById('ProcesadorMedia').innerText = resultados[0].Procesador[2];
			document.getElementById('ProcesadorQ1').innerText = resultados[0].Procesador[3];
			document.getElementById('ProcesadorQ3').innerText = resultados[0].Procesador[4];

			document.getElementById('MonitorMin').innerText = resultados[0].Monitor[0];
			document.getElementById('MonitorMax').innerText = resultados[0].Monitor[1];
			document.getElementById('MonitorMedia').innerText = resultados[0].Monitor[2];
			document.getElementById('MonitorQ1').innerText = resultados[0].Monitor[3];
			document.getElementById('MonitorQ3').innerText = resultados[0].Monitor[4];

			document.getElementById('DUTMin').innerText = resultados[0].DUT[0];
			document.getElementById('DUTMax').innerText = resultados[0].DUT[1];
			document.getElementById('DUTMedia').innerText = resultados[0].DUT[2];
			document.getElementById('DUTQ1').innerText = resultados[0].DUT[3];
			document.getElementById('DUTQ3').innerText = resultados[0].DUT[4];
			
			document.getElementById('Pro').innerText = self.nombreProyecto();
			//self.time(resultados[0].DUT[0]) ;
		}
		
		if(proyectos != null){
			for (var i = 0; i < proyectos.length; i++) {
				var proyecto = proyectos[i];
					self.listaproyectos.push(new Proyecto(proyecto.Nombre, proyecto.Descripcion, proyecto.Autor, proyecto.Fecha, proyecto.DUT, proyecto.Repeticiones, proyecto.Lenguaje, proyecto.estado, proyecto.proyecto_enviado));
				
				

			}
			
			for (var j = 0; j < proyectos.length; j++) {
				var proyecto = proyectos[j];
				if (proyecto.Nombre === self.nombreProyecto()) {
					if(sessionStorage.userName != "admin"){
						document.getElementById('nombreProyecto').placeholder = proyecto.Nombre;
					}
					
					document.getElementById('nombrepro').innerText = proyecto.Nombre;

				}
			}
		}
		
		if(graficas != null){
			
			
			//Para la variable datos
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaHDD = {country: nombre_proyecto+"_HDD", visits: graficas[i][0].DUT[3] }
				self.datos.push(tuplaHDD);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaGrafica = {country: nombre_proyecto+"_Grafica", visits: graficas[i][0].Grafica[3] }
				self.datos.push(tuplaGrafica);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaMonitor = {country: nombre_proyecto+"_Monitor", visits: graficas[i][0].Monitor[3] }
				self.datos.push(tuplaMonitor);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaProcesador = {country: nombre_proyecto+"_Procesador", visits: graficas[i][0].Procesador[3] }
				self.datos.push(tuplaProcesador);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaDUT = {country: nombre_proyecto+"_DUT", visits: graficas[i][0].DUT[3] }
				self.datos.push(tuplaDUT);
			}
			//para datos3
			//Para la variable datos
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaHDD = {country: nombre_proyecto+"_HDD", visits: graficas[i][0].DUT[3], error:10 }
				self.datos3.push(tuplaHDD);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaGrafica = {country: nombre_proyecto+"_Grafica", visits: graficas[i][0].Grafica[3], error:10}
				self.datos3.push(tuplaGrafica);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaMonitor = {country: nombre_proyecto+"_Monitor", visits: graficas[i][0].Monitor[3], error:10 }
				self.datos3.push(tuplaMonitor);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaProcesador = {country: nombre_proyecto+"_Procesador", visits: graficas[i][0].Procesador[3], error:10 }
				self.datos3.push(tuplaProcesador);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaDUT = {country: nombre_proyecto+"_DUT", visits: graficas[i][0].DUT[3], error:10 }
				self.datos3.push(tuplaDUT);
			}
			//// para la variable datos2
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				//self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name:"HDD", value: graficas[i][0].HDD[3]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				//self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "Grafica", value: graficas[i][0].Grafica[3]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				//self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name:"Procesador", value: graficas[i][0].Procesador[3]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				//self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "Monitor", value: graficas[i][0].Monitor[3]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				//self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "DUT", value: graficas[i][0].DUT[3]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			
			var nombre_proyecto = graficas;
			var chart = document.getElementById("chartdiv");
			var chart2 = document.getElementById("chartdiv2");
			var chart3 = document.getElementById("chartdiv3");
			var chart4 = document.getElementById("chartdiv4");
			var boxes = document.getElementById("boxes");
			boxes.style.display = "none";
			chart.style.display = "flex";
			chart2.style.display = "flex";
			chart3.style.display = "flex";
			chart4.style.display = "flex";
			//var boton = document.getElementsByClassName("elegirProyecto");
			//boton[0].style.display = "flex";
			
			am4core.ready;
		}
		
		
		document.getElementsByTagName('h1')[0].innerText = sessionStorage.userName;

		am4core.ready(function() {

			// Themes begin
			am4core.useTheme(am4themes_animated);
			// Themes end

			// Create chart instance
			var chart = am4core.create("chartdiv", am4charts.XYChart);
			chart.scrollbarX = new am4core.Scrollbar();

			// Add data
			chart.data = self.datos;

			// Create axes
			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "country";
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.renderer.minGridDistance = 30;
			categoryAxis.renderer.labels.template.horizontalCenter = "right";
			categoryAxis.renderer.labels.template.verticalCenter = "middle";
			categoryAxis.renderer.labels.template.rotation = 270;
			categoryAxis.tooltip.disabled = true;
			categoryAxis.renderer.minHeight = 110;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.renderer.minWidth = 50;

			// Create series
			var series = chart.series.push(new am4charts.ColumnSeries());
			series.sequencedInterpolation = true;
			series.dataFields.valueY = "visits";
			series.dataFields.categoryX = "country";
			series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
			series.columns.template.strokeWidth = 0;

			series.tooltip.pointerOrientation = "vertical";

			series.columns.template.column.cornerRadiusTopLeft = 10;
			series.columns.template.column.cornerRadiusTopRight = 10;
			series.columns.template.column.fillOpacity = 0.8;

			// on hover, make corner radiuses bigger
			var hoverState = series.columns.template.column.states.create("hover");
			hoverState.properties.cornerRadiusTopLeft = 0;
			hoverState.properties.cornerRadiusTopRight = 0;
			hoverState.properties.fillOpacity = 1;

			series.columns.template.adapter.add("fill", function(fill, target) {
			  return chart.colors.getIndex(target.dataItem.index);
			});

			// Cursor
			chart.cursor = new am4charts.XYCursor();
			
			//////////////////////////////grafica 2
			
			// Themes begin
			//am4core.useTheme(am4themes_dataviz);
			am4core.useTheme(am4themes_animated);
			// Themes end

			// Create chart
			var chart = am4core.create("chartdiv2", am4charts.PieChart);
			chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

			chart.data = self.datos;

			var series = chart.series.push(new am4charts.PieSeries());
			series.dataFields.value = "visits";
			series.dataFields.radiusValue = "visits";
			series.dataFields.category = "country";
			series.slices.template.cornerRadius = 6;
			series.colors.step = 3;

			series.hiddenState.properties.endAngle = -90;

			chart.legend = new am4charts.Legend();
			
			/////////grafica 3
			
			// Themes begin
			//am4core.useTheme(am4themes_dataviz);
			am4core.useTheme(am4themes_animated);
			// Themes end

			// create chart
			var chart = am4core.create("chartdiv3", am4charts.TreeMap);
			chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

			chart.data = self.datos2;
				
			chart.colors.step = 2;

			// define data fields
			chart.dataFields.value = "value";
			chart.dataFields.name = "name";
			chart.dataFields.children = "children";

			chart.zoomable = false;
			var bgColor = new am4core.InterfaceColorSet().getFor("background");

			// level 0 series template
			var level0SeriesTemplate = chart.seriesTemplates.create("0");
			var level0ColumnTemplate = level0SeriesTemplate.columns.template;

			level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
			level0ColumnTemplate.fillOpacity = 0;
			level0ColumnTemplate.strokeWidth = 4;
			level0ColumnTemplate.strokeOpacity = 0;

			// level 1 series template
			var level1SeriesTemplate = chart.seriesTemplates.create("1");
			var level1ColumnTemplate = level1SeriesTemplate.columns.template;

			level1SeriesTemplate.tooltip.animationDuration = 0;
			level1SeriesTemplate.strokeOpacity = 1;

			level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10)
			level1ColumnTemplate.fillOpacity = 1;
			level1ColumnTemplate.strokeWidth = 4;
			level1ColumnTemplate.stroke = bgColor;

			var bullet1 = level1SeriesTemplate.bullets.push(new am4charts.LabelBullet());
			bullet1.locationY = 0.5;
			bullet1.locationX = 0.5;
			bullet1.label.text = "{name}";
			bullet1.label.fill = am4core.color("#ffffff");

			chart.maxLevels = 2;
			
			//////grafica 4
			
			// Themes begin
			am4core.useTheme(am4themes_animated);
			// Themes end

			var chart = am4core.create("chartdiv4", am4charts.XYChart);

			chart.data = self.datos3;
				

			chart.padding(40, 40, 40, 40);

			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.renderer.grid.template.location = 0;
			categoryAxis.dataFields.category = "country";
			categoryAxis.renderer.minGridDistance = 60;
			categoryAxis.renderer.labels.template.horizontalCenter = "right";
			categoryAxis.renderer.labels.template.verticalCenter = "middle";
			categoryAxis.renderer.labels.template.rotation = 270;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

			var series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.categoryX = "country";
			series.dataFields.valueY = "visits";
			series.tooltipText = "{valueY.value} error:{error}"
				

			var errorBullet = series.bullets.create(am4charts.ErrorBullet);
			errorBullet.isDynamic = true;
			errorBullet.strokeWidth = 2;

			var circle = errorBullet.createChild(am4core.Circle);
			circle.radius = 3;
			circle.fill = am4core.color("#ffffff");

			// adapter adjusts height of a bullet
			errorBullet.adapter.add("pixelHeight", function (pixelHeight, target) {
			  var dataItem = target.dataItem;

			  if(dataItem){
			    var value = dataItem.valueY;
			    var errorTopValue = value + dataItem.dataContext.error / 2;
			    var errorTopY = valueAxis.valueToPoint(errorTopValue).y;

			    var errorBottomValue = value - dataItem.dataContext.error / 2;
			    var errorBottomY = valueAxis.valueToPoint(errorBottomValue).y;

			    return Math.abs(errorTopY - errorBottomY);
			   }
			   return pixelHeight;
			})

			chart.cursor = new am4charts.XYCursor();

			}); // end am4core.ready()
		
	}
	


	self.enviar = function() {	
		
		const info = {
			type: 'sendProyecto',
			usuario: sessionStorage.userName,
			success: function() {
				alert('Se ha enviar correctamente');
			},
			error: function() {

				alert('Se ha creado incorrectamente');
			}
		};
		self.sws.send(JSON.stringify(info));
	};
	
	self.explorador = function(){
		const info ={
				type: 'explorador',
		};
		self.sws.send(JSON.stringify(info));
	};
	
	self.excel = function() {
		const info ={
				type: 'excel',
				proyecto: self.nombreProyecto,
				usuario: sessionStorage.userName
		};
		self.sws.send(JSON.stringify(info));
	}
	
	self.compararPro = function() {
		for (var i = 0; i < self.listaproyectos().length; i++) {
			if (document.getElementsByClassName("form-check-input")[i].checked === true) {
				self.proyectosSeleccionados.push(document.getElementsByClassName("form-check-label")[i].innerHTML);
			}
		}
		
		const info ={
				type: 'comparar',
				usuario: sessionStorage.userName,
				proyectos: self.proyectosSeleccionados()
		};
		self.sws.send(JSON.stringify(info));
	}
	
	self.modificar = function() {
		var dut;
		var repeticiones;
		
		
		
		
		if(sessionStorage.userName != "admin"){
			if(document.getElementById("dut").value === ""){
				dut = 000;
			} else{
				dut =  document.getElementById("dut").value;
			}
			
			if(document.getElementById("repeticiones").value === ""){
				repeticiones = 000;
			} else{
				repeticiones =  document.getElementById("repeticiones").value;
			}
		var p = {
			type: "modificar",
			nombre: self.nombreProyecto(),
			new_nombre: document.getElementById("nombreProyecto").value,
			descripcion: document.getElementById("descripcion").value,
			dut: dut,
			repeticiones: repeticiones,
			lenguaje: document.getElementById("lenguaje").options[document.getElementById("lenguaje").selectedIndex].text,
			success: function() {
				location.reload();
			}
		};
		} else{
			var p = {
					type: "estado",
					proyecto: self.nombreProyecto(),
					estado: document.getElementById("Estado").options[document.getElementById("Estado").selectedIndex].text,
					success: function() {
						location.reload();
					}
				};
		}
		
		self.sws.send(JSON.stringify(p));
		location.reload();
	}
	
	

	
	class Proyecto {
		constructor (nombre, descripcion, autor, fecha, dut, repeticiones, lenguaje, estado, proyecto_enviado) {
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.autor = autor;
			this.fecha = fecha;
			this.dut = dut;
			this.repeticiones = repeticiones;
			this.lenguaje = lenguaje;
			this.estado = estado;
			this.proyecto_enviado = proyecto_enviado;
		}
		
		info() {
			self.nombreProyecto(this.nombre);
			var p = {
				type: "info",
				nombre: this.nombre,
				user:sessionStorage.userName
				
			};
			
			self.sws.send(JSON.stringify(p));

		}
		
		terminar() {
			var p = {
				type: "terminar",
				proyecto: this.nombre
			};
			
			self.sws.send(JSON.stringify(p));

		}
		

		resultados(){
			
			self.nombreProyecto(this.nombre);
			var p = {
				type: 'resultados',
				proyecto: this.nombre,
				usuario:sessionStorage.userName

			};
			//self.nombreUsuario(this.name);
			self.sws.send(JSON.stringify(p));
		}
		
		estado_proyecto() {
			var matches = document.querySelectorAll('select');
			var p = {
				type: "estado",
				estado: document.getElementById("Estado").options[document.getElementById("Estado").selectedIndex].text,
				proyecto: this.nombre
			};
			
			self.sws.send(JSON.stringify(p));

		}

		enviar() {	
			
			const info = {
				type: 'sendProyecto',
				usuario: sessionStorage.userName,
				nombre: this.nombre,
				success: function() {
					alert('Se ha enviar correctamente');
				},
				error: function() {

					alert('Se ha creado incorrectamente');
				}
			};
			self.sws.send(JSON.stringify(info));
			location.reload();
		};

	}

}
var vm = new ViewModel();
ko.applyBindings(vm);
