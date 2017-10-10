# MS-MUI

why?:
- autocomplete dropdown should show options on top, if options are not visible at bottom
- should be fast. Perfomance is never too good on mobile. Small amount of elements, 
lazy rendering of options, so 10000 items works nicely on mobile)
- don't like inline styles, those are hitting perfomance, make style overrides complicated 
- should be small (i guess)

checkout [demo](https://maintstar.github.io/ms-mui/build/) 

didn't do precompilation, i belive it makes it bigger when compile 2 times
because babel inserts polyfills/helpers two times. 

Just include it into the build process 

### todo
- make other controls like tab, container, button, to remove mui dependency

