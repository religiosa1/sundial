# Fancy sundial clock

Just some RPG-style clock dial, showing different sections of the day, sunset/sunrise times etc.

Sveltekit based sundial migrated from an old simple svelte project.

Actual calculations of different sections of the day performed by the wonderful suncalc library.

Actual calculations of different sections of the day performed by the wonderful
[suncalc](https://github.com/mourner/suncalc) library.

Currently localization was removed, as there's no native support in sveltekit itself,
and all of the current solutions seem half-assed.
Currently i18n is moved post 1.0: https://github.com/sveltejs/kit/issues/1274

```

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

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## License
Sundial is MIT licensed.