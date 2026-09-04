# Marketplace screenshots

Drop screenshots for `/marketplace` in this folder, then point an entry in
[`lib/marketplace.ts`](../../lib/marketplace.ts) at it:

```ts
image: "/works/my-project.png",
```

- **Aspect ratio** — cards render 16:9, so 1600×900 (or any 16:9 shot) fits
  without cropping. Anything else is cropped to fill; set
  `imageFit: "contain"` to fit the whole image instead (good for logos).
- **Format** — PNG or JPG. Keep files under ~500 KB; they are served as-is.
- **Naming** — use the entry's `id`, e.g. `cmu-learning-hub.png`.

Leave `image` out entirely and the card falls back to a branded gradient
placeholder, so a work can be listed before its screenshot exists.
