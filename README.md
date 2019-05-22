# HTMLInclude

Because, One simply does not

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
  
  <script src="js/HTMLInclude.min.js"></script>
</body>
```

### [DEMO](https://paul-browne.github.io/HTMLInclude/simple-demo.html)

---

Also, you can use `data-replace` to swap strings from within the `data-include` html.

```html
<div data-include="greeting.html" data-replace="%name%:Mike"></div>
<div data-include="greeting.html" data-replace="%name%:Frank"></div>
<div data-include="greeting.html" data-replace="%name%:Bob"></div>
```

###### greeting.html
```html
<h1>Hello %name%!!</h1>	  
```

###### output
```html
<h1>Hello Mike!!</h1>
<h1>Hello Frank!!</h1>
<h1>Hello Bob!!</h1>
```

NOTE: If there are multiple instances of the string `%name%` then all will be replaced

### [DEMO](https://paul-browne.github.io/HTMLInclude/greeting-demo.html)

---

You can swap multiple strings at a time

```html
<div data-include="welcome.html" data-replace="%welcome%:Hello, %name%:Mike, %emotion%:Happy"></div>
```

###### welcome.html
```html
<h1>%welcome% %name%!!</h1>
<p>I am very %emotion% to meet you!</p>
```

###### output
```html
<h1>Hello Mike!!</h1>
<p>I am very Happy to meet you!</p>
```

### [DEMO](https://paul-browne.github.io/HTMLInclude/welcome-demo.html)

---

The most practical use case for the `data-replace` is when using a templating engine like mustache

```html
<div data-include="countries.html" data-replace="%country%:uk"></div>
<div data-include="countries.html" data-replace="%country%:france"></div>
<div data-include="countries.html" data-replace="%country%:germany"></div>
```

### [DEMO](https://paul-browne.github.io/HTMLInclude/mustache-demo.html)

---

You can also lazyload includes by passing `data-lazy="100"` the number is the offset, eg. the amount of pixels from the bottom of the screen before the include will load. (this number can be negative and the include will load after it has scrolled into view by that amount of pixels)

```html
<div data-include="templates/countries.html" data-replace="%country%:uk" data-lazy="100" ></div>
<div data-include="templates/countries.html" data-replace="%country%:france" data-lazy="0" ></div>
<div data-include="templates/countries.html" data-replace="%country%:germany" data-lazy="-40" ></div>
```

Includes have no height, because they are empty (unless you add "loading..."), and this might cause following includes to be evaluated as "in the viewport" when they aren't. So you might want to add a fake height to includes before they are loaded like so

```css
[data-include]{
	min-height: 100px;
}
```

### [DEMO](https://paul-browne.github.io/HTMLInclude/lazy-demo.html)

---

You can also nest `includes`, you'll need to call the `HTMLInclude()` function again

```html
<div data-include="nested.html"></div>
```

##### nested.html
```html
<div data-include="footer.html"></div>
<script>HTMLInclude();</script>
```

### [DEMO](https://paul-browne.github.io/HTMLInclude/nested-demo.html)
