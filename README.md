# Sundial clock and sunlight phases calculations

A webapp for displaying sunlight phases (times for sunrise, sunset, dusk, etc.)
on per day or per year basis for the provided date and location.

Can be viewed in a browser, or installed as a PWA.

Can display daylight phases for your current or chosen locations as:

- sun dial; inspired by the Kingdom Come: Deliverance PC game
- table; showing the same information in a tabular view
- yearly chart; plotting sunrise and sunset times for each day of the year.

Actual calculations of different sections of the day performed by the wonderful
[suncalc](https://github.com/mourner/suncalc) library written by
[Vladimir Agafonkin](http://agafonkin.com/en)
([@mourner](https://github.com/mourner))

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## License

Sundial is MIT licensed.
