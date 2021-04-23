var self;
function ViewModel() {
	self = this;
	self.listaproyectos = ko.observableArray([]);
	self.proyectosSeleccionados = ko.observableArray([]);
	self.nombreProyecto = ko.observable('');
	self.AutorProyecto = ko.observable('');
	self.email_userProyecto = ko.observable('');
	self.estadoProyecto = ko.observable('');
	self.user = ko.observable('');
	self.time = ko.observable('');
	self.datos = [];
	self.datos2 = [];
	self.datos3 = [];
	self.datos4 = [];
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
			// self.time(resultados[0].DUT[0]) ;
		}
		
		if(proyectos != null){
			for (var i = 0; i < proyectos.length; i++) {
				var proyecto = proyectos[i];
					self.listaproyectos.push(new Proyecto(proyecto.Nombre, proyecto.Descripcion, proyecto.Autor, proyecto.email_user, proyecto.Fecha, proyecto.DUT, proyecto.Repeticiones, proyecto.Lenguaje, proyecto.estado, proyecto.proyecto_enviado, proyecto.url, proyecto.password));
					
				

			}
			for(var i = 0; i < proyectos.length; i++){
				var proyecto = proyectos[i];
				if(proyecto.estado == "Medido"){
					document.getElementsByClassName("cards")[0].children[i].children[0].children[0].children[1].style.backgroundColor = "springgreen";
					//document.getElementsByClassName("cards")[0].children[i].children[0].children[0].children[1].style.backgroundColor = "springgreen";​
				}
				if(proyecto.estado == "Terminado"){
					document.getElementsByClassName("cards")[0].children[i].children[0].children[0].children[1].style.backgroundColor = "darkkhaki";
					
				}
				if(proyecto.estado == "Validado"){
					document.getElementsByClassName("cards")[0].children[i].children[0].children[0].children[1].style.backgroundColor = "skyblue";
					
					
				}
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


			// Para la variable datos

			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaHDD = {name: nombre_proyecto+"_HDD", value: graficas[i][0].HDD[2] }
				self.datos.push(tuplaHDD);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaGrafica = {name: nombre_proyecto+"_Grafica", value: graficas[i][0].Grafica[2] }
				self.datos.push(tuplaGrafica);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaMonitor = {name: nombre_proyecto+"_Monitor", value: graficas[i][0].Monitor[2] }
				self.datos.push(tuplaMonitor);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaProcesador = {name: nombre_proyecto+"_Procesador", value: graficas[i][0].Procesador[2] }
				self.datos.push(tuplaProcesador);
			}
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				const tuplaDUT = {name: nombre_proyecto+"_DUT", value: graficas[i][0].DUT[2] }
				self.datos.push(tuplaDUT);
			}
			
			// // para la variable datos2
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				// self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name:"HDD", value: graficas[i][0].HDD[2]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				// self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "Grafica", value: graficas[i][0].Grafica[2]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				// self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name:"Procesador", value: graficas[i][0].Procesador[2]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				// self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "Monitor", value: graficas[i][0].Monitor[2]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			for(var i = 0; i < graficas.length; i++){
				var parts = graficas[i][0].nombre.split("_");
				var nombre_proyecto = parts[0];
				var lista = [];
				// self.datos2.push(nombre_proyecto);
				var tuplaHDD = {name: "DUT", value: graficas[i][0].DUT[2]}
				lista.push(tuplaHDD);
				var final = {name: nombre_proyecto, children: lista}
				self.datos2.push(final);
			}
			
			
			
		// // para la variable datos4
			var e = {
				    "name": "Dummy",
				    "disabled": true,
				    "value": 1000,
				    "color": am4core.color("#dadada"),
				    "opacity": 0.3,
				    "strokeDasharray": "4,4"
				};
			self.datos4.push(e);
			for(var i = 0; i < self.datos.length; i++){
				self.datos4.push(self.datos[i]);
			}
			
			
			var nombre_proyecto = graficas;
			var chart = document.getElementById("chartdiv");
			var chart2 = document.getElementById("chartdiv2");
			var chart3 = document.getElementById("chartdiv3");
			var cha = document.getElementById("cha");
			var boxes = document.getElementById("boxes");
			boxes.style.display = "none";
			chart.style.display = "flex";
			chart2.style.display = "flex";
			chart3.style.display = "flex";
			cha.style.display = "flex";
			
			// var boton = document.getElementsByClassName("elegirProyecto");
			// boton[0].style.display = "flex";
			
			am4core.ready;
		}
		
		
		document.getElementsByTagName('h1')[0].innerText = sessionStorage.userName;

		am4core.ready(function() {
			// //grafica 1
			
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
			categoryAxis.dataFields.category = "name";
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
			series.dataFields.valueY = "value";
			series.dataFields.categoryX = "name";
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
			chart.exporting.menu = new am4core.ExportMenu();
			
			// ////////////////////////////grafica 2
			
			
			// Themes begin
			am4core.useTheme(am4themes_animated);
			// Themes end
			
			var data = self.datos4;


			// cointainer to hold both charts
			var container = am4core.create("chartdiv2", am4core.Container);
			container.width = am4core.percent(100);
			container.height = am4core.percent(100);
			container.layout = "horizontal";

			container.events.on("maxsizechanged", function () {
			    chart1.zIndex = 0;
			    separatorLine.zIndex = 1;
			    dragText.zIndex = 2;
			    chart2.zIndex = 3;
			})

			var chart1 = container.createChild(am4charts.PieChart);
			chart1 .fontSize = 11;
			chart1.hiddenState.properties.opacity = 0; // this makes initial
														// fade in effect
			chart1.data = data;
			chart1.radius = am4core.percent(70);
			chart1.innerRadius = am4core.percent(40);
			chart1.zIndex = 1;

			var series1 = chart1.series.push(new am4charts.PieSeries());
			series1.dataFields.value = "value";
			series1.dataFields.category = "name";
			series1.colors.step = 2;
			series1.alignLabels = false;
			series1.labels.template.bent = true;
			series1.labels.template.radius = 3;
			series1.labels.template.padding(0,0,0,0);

			var sliceTemplate1 = series1.slices.template;
			sliceTemplate1.cornerRadius = 5;
			sliceTemplate1.draggable = true;
			sliceTemplate1.inert = true;
			sliceTemplate1.propertyFields.fill = "color";
			sliceTemplate1.propertyFields.fillOpacity = "opacity";
			sliceTemplate1.propertyFields.stroke = "color";
			sliceTemplate1.propertyFields.strokeDasharray = "strokeDasharray";
			sliceTemplate1.strokeWidth = 1;
			sliceTemplate1.strokeOpacity = 1;

			var zIndex = 5;

			sliceTemplate1.events.on("down", function (event) {
			    event.target.toFront();
			    // also put chart to front
			    var series = event.target.dataItem.component;
			    series.chart.zIndex = zIndex++;
			})

			series1.ticks.template.disabled = true;

			sliceTemplate1.states.getKey("active").properties.shiftRadius = 0;

			sliceTemplate1.events.on("dragstop", function (event) {
			    handleDragStop(event);
			})

			// separator line and text
			var separatorLine = container.createChild(am4core.Line);
			separatorLine.x1 = 0;
			separatorLine.y2 = 300;
			separatorLine.strokeWidth = 3;
			separatorLine.stroke = am4core.color("#dadada");
			separatorLine.valign = "middle";
			separatorLine.strokeDasharray = "5,5";


			var dragText = container.createChild(am4core.Label);
			dragText.text = "Drag slices over the line";
			dragText.rotation = 90;
			dragText.valign = "middle";
			dragText.align = "center";
			dragText.paddingBottom = 5;

			// second chart
			var chart2 = container.createChild(am4charts.PieChart);
			chart2.hiddenState.properties.opacity = 0; // this makes initial
														// fade in effect
			chart2 .fontSize = 11;
			chart2.radius = am4core.percent(70);
			chart2.data = data;
			chart2.innerRadius = am4core.percent(40);
			chart2.zIndex = 1;

			var series2 = chart2.series.push(new am4charts.PieSeries());
			series2.dataFields.value = "value";
			series2.dataFields.category = "name";
			series2.colors.step = 2;

			series2.alignLabels = false;
			series2.labels.template.bent = true;
			series2.labels.template.radius = 3;
			series2.labels.template.padding(0,0,0,0);
			series2.labels.template.propertyFields.disabled = "disabled";

			var sliceTemplate2 = series2.slices.template;
			sliceTemplate2.copyFrom(sliceTemplate1);

			series2.ticks.template.disabled = true;

			function handleDragStop(event) {
			    var targetSlice = event.target;
			    var dataItem1;
			    var dataItem2;
			    var slice1;
			    var slice2;

			    if (series1.slices.indexOf(targetSlice) != -1) {
			        slice1 = targetSlice;
			        slice2 = series2.dataItems.getIndex(targetSlice.dataItem.index).slice;
			    }
			    else if (series2.slices.indexOf(targetSlice) != -1) {
			        slice1 = series1.dataItems.getIndex(targetSlice.dataItem.index).slice;
			        slice2 = targetSlice;
			    }


			    dataItem1 = slice1.dataItem;
			    dataItem2 = slice2.dataItem;

			    var series1Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series1.slicesContainer);
			    var series2Center = am4core.utils.spritePointToSvg({ x: 0, y: 0 }, series2.slicesContainer);

			    var series1CenterConverted = am4core.utils.svgPointToSprite(series1Center, series2.slicesContainer);
			    var series2CenterConverted = am4core.utils.svgPointToSprite(series2Center, series1.slicesContainer);

			    // tooltipY and tooltipY are in the middle of the slice, so we
				// use them to avoid extra calculations
			    var targetSlicePoint = am4core.utils.spritePointToSvg({ x: targetSlice.tooltipX, y: targetSlice.tooltipY }, targetSlice);

			    if (targetSlice == slice1) {
			        if (targetSlicePoint.x > container.pixelWidth / 2) {
			            var value = dataItem1.value;

			            dataItem1.hide();

			            var animation = slice1.animate([{ property: "x", to: series2CenterConverted.x }, { property: "y", to: series2CenterConverted.y }], 400);
			            animation.events.on("animationprogress", function (event) {
			                slice1.hideTooltip();
			            })

			            slice2.x = 0;
			            slice2.y = 0;

			            dataItem2.show();
			        }
			        else {
			            slice1.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
			        }
			    }
			    if (targetSlice == slice2) {
			        if (targetSlicePoint.x < container.pixelWidth / 2) {

			            var value = dataItem2.value;

			            dataItem2.hide();

			            var animation = slice2.animate([{ property: "x", to: series1CenterConverted.x }, { property: "y", to: series1CenterConverted.y }], 400);
			            animation.events.on("animationprogress", function (event) {
			                slice2.hideTooltip();
			            })

			            slice1.x = 0;
			            slice1.y = 0;
			            dataItem1.show();
			        }
			        else {
			            slice2.animate([{ property: "x", to: 0 }, { property: "y", to: 0 }], 400);
			        }
			    }

			    toggleDummySlice(series1);
			    toggleDummySlice(series2);

			    series1.hideTooltip();
			    series2.hideTooltip();
			}

			function toggleDummySlice(series) {
			    var show = true;
			    for (var i = 1; i < series.dataItems.length; i++) {
			        var dataItem = series.dataItems.getIndex(i);
			        if (dataItem.slice.visible && !dataItem.slice.isHiding) {
			            show = false;
			        }
			    }

			    var dummySlice = series.dataItems.getIndex(0);
			    if (show) {
			        dummySlice.show();
			    }
			    else {
			        dummySlice.hide();
			    }
			}

			series2.events.on("datavalidated", function () {

			    var dummyDataItem = series2.dataItems.getIndex(0);
			    // dummyDataItem.show(0);
			    dummyDataItem.slice.draggable = false;
			    dummyDataItem.slice.tooltipText = undefined;

			    for (var i = 1; i < series2.dataItems.length; i++) {
			        series2.dataItems.getIndex(i).hide(0);
			    }
			})

			series1.events.on("datavalidated", function () {
			    var dummyDataItem = series1.dataItems.getIndex(0);
			    // dummyDataItem.hide(0);
			    dummyDataItem.slice.draggable = false;
			    dummyDataItem.slice.tooltipText = undefined;
			})
			
			container.exporting.menu = new am4core.ExportMenu();
			
			// ///////grafica 3
			
			// Themes begin
			// am4core.useTheme(am4themes_dataviz);
			am4core.useTheme(am4themes_animated);
			// Themes end

			// create chart
			var chart = am4core.create("chartdiv3", am4charts.TreeMap);
			chart.hiddenState.properties.opacity = 0; // this makes initial
														// fade in effect

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
			chart.exporting.menu = new am4core.ExportMenu();

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
			var descripcion = escapeHtml(document.getElementById("descripcion").value);
			descripcion = stringEscape(descripcion);
			var new_nombre = escapeHtml( document.getElementById("nombreProyecto").value);
			new_nombre = stringEscape(new_nombre);
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
			new_nombre: new_nombre,
			descripcion: descripcion,
			dut: dut,
			repeticiones: repeticiones,
			lenguaje: document.getElementById("lenguaje").options[document.getElementById("lenguaje").selectedIndex].text,
			success: function() {
				location.reload();
			}
		};
		} else{
			var estado = document.getElementById("Estado").options[document.getElementById("Estado").selectedIndex].text;
			var mensaje = "The status of your project " + self.nombreProyecto() + " has changed from " + self.estadoProyecto() + " to " + estado + ".";
			var url = document.getElementById("url").value;
			if(estado != "Elige..."){
				if(estado === "En preparacion"){
					mensaje = mensaje + " This is because the code was not right, so try again or contact to dcarretero.1999@gmail.com, go to check it!";
				} else if(estado === "Medido"){
					mensaje = mensaje + " You can go to check the results!\n Here we give you the url of results: " + url + " and the password: " + document.getElementById("password").value;
				} else {
					mensaje = mensaje + " You have to wait for the measurement of your code.";
				}
				emailjs.init("user_kJwC21oweSb6llxLRUyRT");
				emailjs.send("service_zvob6fj","template_m06v46e",{
					from_name: "David",
					to_name: self.AutorProyecto(),
					message: mensaje,
					email_to: self.email_userProyecto(),
					});
			}

			sleep(2000);

			var p = {
					type: "estado",
					proyecto: self.nombreProyecto(),
					estado: estado,
					url: url,
					password: document.getElementById("password").value,
					success: function() {
						location.reload();
					}
				};
		}
		
		self.sws.send(JSON.stringify(p));
		location.reload();
	}
	
	function escapeHtml(text) {
		  var map = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#039;',
		    '"\"': '&#92;'
		  };
		  
		  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
		}
	function stringEscape(s) {
	    return s ? s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\v/g,'\\v').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/[\x00-\x1F\x80-\x9F]/g,hex) : s;
	    function hex(c) { var v = '0'+c.charCodeAt(0).toString(16); return '\\x'+v.substr(v.length-2); }
	}
	
	function sleep(milliseconds) {
		  const date = Date.now();
		  let currentDate = null;
		  do {
		    currentDate = Date.now();
		  } while (currentDate - date < milliseconds);
		}

	
	class Proyecto {
		constructor (nombre, descripcion, autor, email_user, fecha, dut, repeticiones, lenguaje, estado, proyecto_enviado, url, password) {
			this.nombre = nombre;
			this.descripcion = descripcion;
			this.autor = autor;
			this.email_user = email_user;
			this.fecha = fecha;
			this.dut = dut;
			this.repeticiones = repeticiones;
			this.lenguaje = lenguaje;
			this.estado = estado;
			this.proyecto_enviado = proyecto_enviado;
			this.url = url;
			this.password = password;
		}
		
		info() {
			self.nombreProyecto(this.nombre);
			self.AutorProyecto(this.autor);
			self.email_userProyecto(this.email_user);
			self.estadoProyecto(this.estado);
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
			location.reload();
		}
		

		resultados(){
			
			self.nombreProyecto(this.nombre);
			var p = {
				type: 'resultados',
				proyecto: this.nombre,
				usuario:sessionStorage.userName

			};
			// self.nombreUsuario(this.name);
			self.sws.send(JSON.stringify(p));
		}
		
		url_excel(){
			//location.href= this.url;
			window.open(this.url, '_blank');
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
