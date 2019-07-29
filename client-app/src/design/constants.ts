/*
$base_color: #252627;
$secondary_color: #09F6D2;
$accent_color: #FFE5D0;
$white: white;
$black: black;
$light_foreground: #000000;
$light_background: #eeeeee;
$dark_foreground: #ffffff;
$dark_background: #222222;
*/

let light_foreground = "#000000";
let light_background = "#eeeeee";

let dark_foreground = "#ffffff";
let dark_background = "#222222";

let secondary_color = "#09F6D2";

const themes = {
  light: {
    base: {
      name: "light",
      foreground: light_foreground,
      background: light_background,
      color: "black"
    },
    button: {
      backgroundColor: secondary_color
    }
  },
  dark: {
    base: {
      name: "dark",
      foreground: dark_foreground,
      background: dark_background,
      color: "white"
    },
    button: {
      backgroundColor: "gray"
    }
  }
};

export { themes };
