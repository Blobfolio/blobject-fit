# blobject-fit

A lightweight, dependency-free `object-fit` polyfill.



##### Table of Contents

1. [Features](#features)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [License](#license)



## Features

blobject-fit provides fallback support for images with `object-fit: cover` and `object-fit: contain` styles via `background-size: cover` and `background-size: contain` respectively.

blobject-fit is responsive-capable so long as the visitor's browser supports the particular markup you have chosen. For example:

```html
<img src="small.jpg" srcset="medium.jpg 1000w, large.jpg 2000w" alt="Image" />
<!--
IE 11 will always use small.jpg, while Edge 14 will choose between small.jpg,
medium.jpg, and large.jpg depending on the screen size.
-->
```



## Requirements

blobject-fit does not require any Javascript frameworks, however browsers must support the following:
* [background-size](http://caniuse.com/#feat=background-img-opts)
* [classList](http://caniuse.com/#feat=classlist)
* [querySelector](http://caniuse.com/#feat=queryselector) + [querySelectorAll](http://caniuse.com/#feat=queryselector)

Responsive image sources (e.g. `srcset`, `<picture>`) require native browser support for the markup you've chosen. Otherwise it will just use the good ol' `src` source.



## Installation

### HTML

Download `blobject-fit.min.js`, add it to your project folder, and include it somewhere on the page.

```html
<script src="/path/to/blobject-fit.min.js"></script>
```

Or via Composer:
```bash
composer require "Blobfolio/blobject-fit:dev-master"
```

Or via Bower:
```bash
bower install blobject-fit
```

### CSS

Your existing `object-fit` CSS definitions may not be readable at runtime. Following the convention established by earlier `object-fit` polyfills, blobject-fit requires the inclusion of a clever `font-family` hack in your CSS:

```css
//an example using "cover"
.my-cover-image {
    object-fit: cover;
    font-family: 'object-fit: cover;';
}

//an example using "contain"
.my-contain-image {
    object-fit: contain;
    font-family: 'object-fit: contain;';
}
```

### Profit

That's it!

blobject-fit will automatically detect `object-fit` support when the DOM loads and, if necessary, adjust any fitted images it finds.



## License

Copyright © 2016 [Blobfolio, LLC](https://blobfolio.com) &lt;hello@blobfolio.com&gt;

This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2.

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    Version 2, December 2004
    
    Copyright (C) 2016 Sam Hocevar <sam@hocevar.net>
    
    Everyone is permitted to copy and distribute verbatim or modified
    copies of this license document, and changing it is allowed as long
    as the name is changed.
    
    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
    
    0. You just DO WHAT THE FUCK YOU WANT TO.