# HTMLInclude

One simply does not

```html
<body>
  <include src="header.html"></include>
  Content
  <include src="footer.html"></include>
</body>
```

But now you can

```html
<body>
  <div data-include="header.html"></div>
  Content
  <div data-include="footer.html"></div>
  
  <script src="js/HTMLInclude.js"></script>
</body>
```

Also, if you want to, you can pass `replacements` to the include. Useful for re-use of templates.

```html
  <div data-include="infocard-template.html" data-replace="%country%:uk"></div>
  <div data-include="infocard-template.html" data-replace="%country%:france"></div>
  <div data-include="infocard-template.html" data-replace="%country%:germany"></div>
  <div data-include="infocard-template.html" data-replace="%country%:spain"></div>
```

And the contents of infocard-template would be something like this

```html
<div id="target-%country%">Loading...</div>
<script>
	var template = `
	<h1>{{country}}</h1>
	<img src="%country%.jpg">
	<ul>
		<li><strong>Population: </strong>{{population}}</li>
		<li><strong>Size: </strong>{{size}}</li>
		<li><strong>Language: </strong>{{lang}}</li>
	</ul>`;
	function ajaxRequest (url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
		    if (xhr.readyState == 4 && xhr.status == 200) {
		        callback(xhr.responseText);
		    }
		};
		xhr.open("GET", url, true);
		xhr.send();		
	}
	function render(json) {
		var parsedData = JSON.parse(json);
		var rendered = Mustache.render(template, parsedData);
		document.getElementById("target-%country%").innerHTML = rendered;
	}
	if(window.Mustache){
		ajaxRequest("%country%.json", function(response){
			render(response);
		})
	}else{
		ajaxRequest("js/mustache.js", function(){
			ajaxRequest("%country%.json", function(response){
				render(response);
			})
		})
	}
</script>
```

with the data looking like

```json
{
	"country": "United Kingdom",
	"population": "66 million", 
	"size": "242,495 km²", 
	"lang": "English" 
}
```

