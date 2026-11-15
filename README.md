# TAS Tool

[Open TAS Tool](https://zeptjan.github.io/Tas-Tool/)

An unofficial browser port of the hardened PolyTrack 0.6.3 savestate tool, hosted on GitHub Pages.

## Controls

- Drive: WASD or arrow keys.
- Savestate panel: F8.
- Save / load the current track's state: Q / F.
- Pause / resume: F4.
- Advance one physics millisecond: **Step +1ms** in the bottom toolbar.
- The panel includes simulation speed controls and configurable key bindings. TAS import and export have been removed.

One state is retained per track while the page stays open. Settings and local records are namespaced so they do not overwrite another project hosted on the same GitHub Pages origin.

## Records and security

This browser version uses the existing separate TAS service and a `pt063:` track namespace, separating its records from the 0.6.2 tool. Ordinary leaderboard submissions and multiplayer are disabled in the supplied client.

**Browser code is inspectable and modifiable.** The desktop AES-encrypted loader, signing key, signed manifest and Electron IPC guards are not part of this website. Its request policy prevents unintended traffic; it cannot prove that a client is unmodified or that a run was human-made. The existing service checks recording structure and stored-data integrity, not full server-side physics. No new server security has been claimed or deployed.

Finishing a run may send that run to the separate TAS service. Native PolyTrack profile synchronization is disabled; the browser profile remains local.

## Validation

Browser checks verified driving, pause, save/load from frame 6753 back to saved frame 6128, and the new single-frame control advancing frame 716 to 717. Offline checks verified isolated storage, blocked ordinary writes, allowed TAS API requests, and disabled WebSocket/beacon transport. Live record submission has not been tested.

## Source and deployment

`site-bundle.tar.gz` contains the complete static HTML, JavaScript, CSS, WASM and game assets. To inspect or run it locally:

```sh
mkdir dist
tar -xzf site-bundle.tar.gz -C dist
node scripts/remove-transfer.cjs dist
python -m http.server 8000 --directory dist
```

The Pages workflow extracts this tested bundle, removes TAS import/export with the tracked patch script, and deploys the `dist` directory. No installation of the desktop game is required by a visitor. Desktop signing keys and authentication material are excluded.

## Credits

PolyTrack and the original game assets are by Kodub. Music: OpenGameArt.org “Sci-fi Theme” by Maou, CC-BY 4.0. This is an unofficial savestate port by zeptjan; existing in-game credits are preserved. No additional rights to third-party game assets are granted by this repository.
