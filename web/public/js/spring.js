<script>
	
		var slider = new Slider('#ex1', {
		});
		
		function colorcode(data, value_radiob){
		var value_radiob = $('input:radio[name=airquality]:checked').val();
			if (value_radiob=="ozone"){
				var red=0; var green=0; var blue=0;
				if (data<=50){
					red=49/255; green=163/255; blue=84/255;
					}
				if (data>50 && data<=100){
					red=254/255; green=196/255; blue=79/255;
					}	
				if (data>100){
					red=240/255; green=59/255; 	blue=32/255;
					}
				return new WorldWind.Color(red, green, blue, 1);
			}
			if (value_radiob=="carbonm"){
				var red=0; var green=0; var blue=0;
				if (data<=10000){
					red=255/255; green=247/255; blue=188/255;    
					}
				if (data>10001 && data<=20000){
					red=254/255; green=196/255; blue=79/255;   
					}	
				if (data>20000){
					red=217/255; green=95/255; 	blue=14/255;   
					}
			return new WorldWind.Color(red, green, blue, 1);
			}
		}
			
		// Register an event listener to be called when the page is loaded.
		window.addEventListener("load", eventWindowLoaded, false);
		
		// Define the event listener to initialize Web World Wind.
		function eventWindowLoaded() {
		
			// Create a World Window for the canvas.
			var wwd = new WorldWind.WorldWindow("canvasOne");
		
			// Add some image layers to the World Window's globe.
			wwd.addLayer(new WorldWind.BMNGOneImageLayer());
			wwd.addLayer(new WorldWind.BingAerialWithLabelsLayer());

			// Add a compass, a coordinates display and some view controls to the World Window.
			wwd.addLayer(new WorldWind.CompassLayer());
			wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
			wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));
		
			//Making the slider change the data by hour
			slider.on('change', function(data)
			{var hour=data.newValue+'h';
			placemarks(hour);
			$('#time').text(data.newValue + ':00');
			});
				
			// Adjust the Navigator to place Springfield in the center of the Web World Window.
			wwd.navigator.lookAtLocation.latitude = 42.107821;   
			wwd.navigator.lookAtLocation.longitude = -72.588895;    
				// Approx. 2 million meters above the ellipsoid
				wwd.navigator.range = 1e4; 
			
			//'Click' button for moving between cities
			/*The 'click' code needs some fixing
			$('#springfield').click(function (){
				if ($('#springfield').text()=='Go to Springfield, Massachusetts') {
					wwd.goTo(new WorldWind.Location(42.119707, -72.540215));
					$('#springfield').text('Go to Kathmandu, Nepal');}
				
				if ($('#springfield').text()=='Go to Kathmandu, Nepal') {wwd.goTo(new WorldWind.Location(27.708172, 85.320029));
					$('#springfield').text('Go to Springfield, Massachusetts');}
					});
			*/
			
			//Ozone
			var aq = {
				'Trees': {'lat': 42.103475, 'lon': -72.591092,   
					'ozone': {'0h': 47.92118, '1h': 53.58477, '2h': 45.71833, '3h': 53.53736, '4h': 67.73004, '5h': 80.69892, '6h': 103.4811, '7h': 187.5755,  '8h': 232.3603, '9h': 187.6194, '10h': 169.1186, '11h': 159.2186, '12h': 114.8519, '13h': 94.24835, '14h': 116.444, '15h': 132.1116, '16h': 100.2266, '17h': 147.7985, '18h': 158.1631, '19h': 233.6985, '20h': 137.8675, '21h': 119.994, '22h': 116.4316, '23h': 90.20799},
					'carbonm': {'0h': 4746.773, '1h': 4952.593, '2h': 3931.299, '3h': 4430.562, '4h': 7716.874, '5h':10849.59, '6h': 30780.88, '7h': 40899.02, '8h': 42611.72, '9h': 32159.57, '10h': 38510.39, '11h': 21253.01, '12h': 15560.92, '13h':12558.84, '14h':12257.84, '15h':14228.92, '16h':17918.25, '17h':23905.46, '18h':23864.11, '19h':25313.55, '20h':25487.19, '21h': 14769.26, '22h': 10992.9, '23h': 7173.2}
				},
				'NoTrees': {'lat': 42.103283, 'lon': -72.592528,   
					'ozone': {'0h': 50.56784, '1h': 45.62557, '2h': 47.09283, '3h': 58.02612, '4h': 59.89293, '5h': 71.02728, '6h': 151.7122, '7h': 169.4788, '8h': 163.6705, '9h': 133.2655, '10h': 122.489, '11h': 107.5981, '12h': 81.93974, '13h': 64.61893, '14h': 104.5677, '15h': 104.3293, '16h': 95.28834, '17h':103.8256, '18h': 112.2574, '19h': 108.3082, '20h': 78.27865, '21h': 71.86175, '22h': 67.03719, '23h': 62.55157},
					'carbonm': {'0h': 5420.129, '1h': 5153.733, '2h': 4717.211, '3h': 6273.826, '4h': 6465.032, '5h': 8602.326, '6h': 28477.52, '7h': 41953.35, '8h': 31700.53, '9h': 29455.21, '10h': 31676.01, '11h': 22776.52, '12h': 19085.99, '13h': 16053.28, '14h': 15469.75, '15h': 25623.59, '16h': 26651.74, '17h': 25608.42, '18h': 21514.58, '19h': 16655.05, '20h': 13894.31, '21h': 10183.73, '22h': 8148.711, '23h': 6931}
				}
			};

		//Placing placemarks with air pollution data by hour
	
		placemarks('0h');
			function placemarks(hour){
			var value_radiob = $('input:radio[name=airquality]:checked').val();
					
			//Add a placemark at Trees, Springfield
			placemarkAttributes = new WorldWind.PlacemarkAttributes();
			placemarkAttributes.imageScale = 30;
			placemarkAttributes.imageColor = colorcode(aq.Trees[value_radiob][hour],value_radiob);  
			var placemark = new WorldWind.Placemark(
				new WorldWind.Position(aq.Trees.lat,aq.Trees.lon,0),
				true,
				placemarkAttributes
			);
			var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
			placemarkLayer.addRenderable(placemark);
			wwd.addLayer(placemarkLayer);
		
			//Add a placemark at NoTrees, Springfield
			placemarkAttributes = new WorldWind.PlacemarkAttributes();
			placemarkAttributes.imageScale = 30;
			placemarkAttributes.imageColor = colorcode(aq.NoTrees[value_radiob][hour],value_radiob);  
			var placemark = new WorldWind.Placemark(
				true,
				placemarkAttributes
			);
			var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
			placemarkLayer.addRenderable(placemark);
			wwd.addLayer(placemarkLayer);
		
			//Add a placemark at UnderTrees, Springfield
			placemarkAttributes = new WorldWind.PlacemarkAttributes();
			placemarkAttributes.imageScale = 30;
			placemarkAttributes.imageColor = colorcode(aq.UnderTrees[value_radiob][hour],value_radiob); 
			var placemark = new WorldWind.Placemark(
				true,
				placemarkAttributes
			);
			var placemarkLayer = new WorldWind.RenderableLayer("Placemarks");
			placemarkLayer.addRenderable(placemark);
			wwd.addLayer(placemarkLayer);		
		}
	}
		
						
	</script>