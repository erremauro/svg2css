# svg2css

A small [gulp](https://gulpjs.com/) utilty to compress `.svg` and convert them
to css background images.

## Usage

```bash
gulp --svg <PATH>
```
For example, to generate a css from a single file:

```bash
gulp --svg ./path/to/svg/files/myfile.svg
```

or to generate a single css from multiple svg files:

```bash
gulp --svg ./path/to/svg/files/*.svg
```