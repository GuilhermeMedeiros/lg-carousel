# LG Carousel
A simple, lightweight and responsive carousel built with ES6 and Webpack

## Technical decisions and details

### 1. Folder structure
I decided to keep the folder structure very flat. Everything that is inside `src` will be bundled on the dist folder. The index.html is outside to keep the entry point in evidence, and the application has a main javascript file (which bootstraps the application) and a main css file with global styles.

### 2. ES6
I used a lot of ES6, including classes wich I personally don't like that much. I like the syntax sugar though.

### 3. Chrome only
Safari doesn't have the fetch api. I think adding polyfills wouldn't be relevant.

### 4. Responsiveness for free -> Avoid `width`
From the beginning I tried to avoid using fixed width and decided to rely on css techniques. On this situation, the responsiveness come "for free".
I also think that I saved a lot of lines of code handling resize and I can let the browser do it for me.