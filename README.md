# parcel-plugin-inliner

A Parcel plugin to inline CSS and JS code in your HTML file.

This plugin uses [PostHTML](https://www.npmjs.com/package/posthtml) and [posthtml-inline-assets](https://www.npmjs.com/package/posthtml-inline-assets) to inline your HTML files.

## Usage

Just install the plugin as a dependency using yarn or npm and build normally with Parcel. There are no configuration options.

## Installation

```
yarn add parcel-plugin-inliner
```

or

```
npm install parcel-plugin-inliner
```

## Caveats

This library only inlines files that are referenced directly in your entry point HTML file. It doesn't inline dependencies referenced inside JS and CSS files. It also doesn't inline files loaded asyncronously using Javascript. It doesn't affect code-splitting.

It only inlines the entry point of your app, and only works with HTML files.

It does not delete the JS and CSS files.

## Example

#### Original HTML file:

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Project</title>
    <link rel="style.css" type="stylesheet">
  </head>
  <body>
    <main></main>
    <script src="main.jsx"></script>
  </body>
</html>
```

#### Resulting HTML file:

```
<!DOCTYPE html><html> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width,initial-scale=1.0"> <title>Project</title> <style> html{-webkit-text-size-adjust:100%;line-height:1.15}body{margin:0} ... .h-100{height:100%}</style></head> <body> <main></main> <script>parcelRequire=function(e,t,n,r){function o(n,r){ ... },{preact:"WHr8",tachyons:"kuxM"}]},{},["WoLR"]);</script> </body> </html>
```

CSS and JS sections were shortened for example.

## License

```

MIT License

Copyright (c) 2018 Silvio Henrique Ferreira

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
