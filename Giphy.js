	$(document).ready(function() {

			//Array of GIFs
			var gifs = ["Game of thrones", "Family Guy", "Supernatural", "Quantico"];
			
			//Function of re-rendering HTML to display new GIFs
			function displayDiv(){

				var gif = $(this).attr("data-name");
				var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&limit=10&rating=g&api_key=dc6zaTOxFJmzC";
				//Create AJAX call
				$.ajax({
					url: queryURL,
					method: "GET"
				}).done(function(response){
					//Accessing array of GIFs
					var results = response.data;
					
					for (var i = 0; results.length; i++) {
						var img = $("<img>");
						var r = $("<p>").text("Rating: " + results[i].rating);
						var still = response.data[i].images.fixed_height_still.url;
						var animated = results[i].images.fixed_height.url;

						img.addClass("gifToggle");
						img.attr("data-still", still);
						img.attr("data-state", "still");
                    	img.attr("data-animate", animated);
						img.attr("src", still);
						
						$("#gif-view").prepend(img);
						$("#gif-view").prepend(r);

					}
				});
			}

			//Function to animate or still GIFs
			function animation(){
					var state = $(this).attr("data-state");
					if (state === "still"){
						$(this).attr("src",$(this).data("animate"));
						$(this).attr("data-state", "animate");
					} else {
						$(this).attr("src", $(this).data("still"));
						$(this).attr("data-state", "still");
					}
				};

			//Rendering new buttons to page
			function newButtons(){
				//Empties div 
				$("#newbuttons").empty();
				//Loop through the array
				for (var i = 0; i < gifs.length; i++) {
					var b = $("<button>").attr({
						"id": "gifButton",
						"data-name": gifs[i],
					}); 
					b.text(gifs[i]);
					b.addClass("btn btn-info");
					$("#newbuttons").append(b); 
				}
			}
			$("#add-gif").on("click", function(event){
				event.preventDefault();
				var userInput = $("#gif-input").val().trim();
				gifs.push(userInput);
				$("#gif-input").val(" ");
				newButtons();
			});

			$(document).on("click", "#gifButton", displayDiv);
			$(document).on("click", ".gifToggle", animation);
			newButtons();

			

	});