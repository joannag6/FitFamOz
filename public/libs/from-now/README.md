[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jifalops/from-now)

# from-now
Live relative time from (or to) now using Momentjs that strategically updates.

## Installation

```
bower install --save from-to-now
```

## Usage
Simply give it a timestamp including milliseconds at it will output time
relative to now in a human friendly format. It will also update the output
according to a far away it is (e.g. once per day/hour/minute).

## Demo
<!--
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="from-now.html">
    <next-code-block></next-code-block>   
  </template>
</custom-element-demo>
```
-->

```html
<from-now id="now"></from-now>
<script>
  document.getElementById('now').time = Date.now();
</script>
```

Full demo:
[webcomponents.org](https://www.webcomponents.org/element/jifalops/from-now/demo/demo/index.html)
| [github](https://jifalops.github.io/from-now/components/from-now/demo/).

API: [webcomponents.org](https://www.webcomponents.org/element/jifalops/from-now/from-now)
| [github](https://jifalops.github.io/from-now).

## Contributing

1. Fork it on Github.
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

[MIT](https://opensource.org/licenses/MIT)
