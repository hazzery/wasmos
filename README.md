# Wasmos - Web Assembly Desmos

Wasmos is a graphing calculator.
To plot an expression, type it in an input field on the left side of the screen.
You can create an arbitrary number of expression inputs using the plus button
that sits below the lowest input field.
All expressions must be exclusively in terms of $x$. No other variables may be
used. For example, to plot the parabola $y = \frac{3 x^2}{4} - 2x + 5$, simply
enter `0.75 * x^2 - 2 * x + 5`. Please leave out any `y =`, relations may not
be plotted, only functions. The `*` is required when multiplying `x`.

## Supported Functions

The trigonometric functions $\sin$, $\cos$, and $\tan$ can be used by prefixing
them with `math::`. For example $y = \sin\left(x\right)$ can be plotted with
`math::sin(x)`

## Unsupported functionality

Reciprocal trigonometric functions $\csc$, $\sec$, and $\cot$; hyperbolic
functions $\sinh$, $\cosh$, and $\tanh$; and all inverse trigonometric functions
$\sin^{-1}$, $\cos^{-1}$, $\tan^{-1}$, $\csc^{-1}$, $\sec^{-1}$, $\cot^{-1}$,
$\sinh^{-1}$, $\cosh^{-1}$, $\tanh^{-1}$ are not supported. Exponentiation
functions such as $\log$, $\ln$, and $\exp$ are also not supported. Negative,
and fractional exponentiation, also does not work.

## Running the app

Running Wasmos requires that the rust code is built into a `.wasm` file. To
run this build process and then host a development server in one command,
execute the following in the top level directory.

```bash
make
```

Make has been instructed to build the web assembly (if it has not already been
built) using the following command.

```bash
cd wasmos-rs; wasm-pack build --target web --out-dir ../public/wasm
```

It then starts the development server with the following.

```bash
npm run dev
```
