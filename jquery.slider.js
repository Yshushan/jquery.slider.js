;(function($){
	var name="slider";
	Plugin.prototype={
		defaults:{  
			width: 333,
			height: 333,
			speed: 333,
			easing: "linear",
			navOption: {
				direction: "bottom", 
				size: "25px",
				shape: "rect",
				number: true
			}
		}
	};
	function Plugin(element,options){
		var $scope=this;
		$scope.$element=$(element);
		$scope.element=element;
		$scope.options=$.extend(this.defaults,options);
		$scope.init=function(){
			$scope.$element.addClass("slider-frame").css({ 
				width: $scope.options.width,
				height: $scope.options.height
			});

$scope.$element.append('<ul class="slider-nav"></ul>'); 
			var sliderItems = $scope.$element.find('div, img'); 
			sliderItems.wrapAll("<section class='slider-container'></section>"); 
			var sliderContainer=$scope.$element.find('.slider-container');
			var sliderNav = $scope.$element.find('.slider-nav'); 
			for (var i=0; i<sliderItems.length; i++) {
				sliderNav.append("<li><a href='#"+i+"' "+((i===0)?"class='active'":"")+">"+(i+1)+"</a></li>");
			}
			var navList=sliderNav.find("li");
			var navLinks=navList.find("a");
			navLinks.css({
				width: $scope.options.navOption.size,
				height: $scope.options.navOption.size
			});
			if($scope.options.navOption.number){
				var _fontSize=0.6*parseInt($scope.options.navOption.size)+"px";
				navLinks.css({
					fontSize: _fontSize,
					lineHeight: $scope.options.navOption.size,
					textAlign: "center"
				});
			}
			else{
				navLinks.empty();
			}
			if($scope.options.navOption.shape==="circle"){
				navLinks.css("border-radius",$scope.options.navOption.size);
			}
			if($scope.options.navOption.direction==="bottom"||$scope.options.navOption.direction==="top"){
				sliderContainer.css({ 
					width: $scope.options.width * sliderItems.length,
					height: $scope.options.height,
					position: 'relative'
				});
				sliderItems.css({ 
					float: 'left',
					width: $scope.options.width,
					height: $scope.options.height
				});
				sliderNav.on("click", "li a", function(){
					var index = this.hash.replace("#", "");
					sliderNav.find('li a').removeClass("active"); 
					$(this).addClass("active");
					sliderContainer.animate({
						marginLeft: -(index * $scope.options.width) + "px"
					},$scope.options.speed,$scope.options.easing);
				});
				if($scope.options.navOption.direction==="bottom"){
					sliderNav.addClass("bottom");
					sliderNav.css("padding-bottom",$scope.options.height/20+"px");
					navList.addClass("top-bottom");
				}
				else{
					sliderNav.addClass("top");
					sliderNav.css("padding-top",$scope.options.height/20+"px");
					navList.addClass("top-bottom");
				}
			}
			else if($scope.options.navOption.direction==="right"||$scope.options.navOption.direction==="left"){
				sliderContainer.css({ 
					width: $scope.options.width,
					position: 'relative'
				});
				sliderItems.css({ 
					display:"block",
					width: $scope.options.width,
					height: $scope.options.height
				});
				sliderNav.on("click", "li a", function(){
					var index = this.hash.replace("#", "");
					sliderNav.find('li a').removeClass("active"); 
					$(this).addClass("active");
					sliderContainer.animate({
						marginTop: -(index * $scope.options.height) + "px"
					},$scope.options.speed,$scope.options.easing);
				});
				if($scope.options.navOption.direction==="right"){
					sliderNav.addClass("right");
					sliderNav.css("padding-right",$scope.options.height/20+"px");
					navList.addClass("left-right");
				}
				else{
					sliderNav.addClass("left");
					sliderNav.css("padding-left",$scope.options.height/20+"px");
					navList.addClass("left-right");
				}
			}
		}
	}
	$.fn[name]=function(options){
		return this.each(function(){
			new Plugin(this,options).init();
		});
	}
})(jQuery)
