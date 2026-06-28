# Beth's Sheep Counter

A fan-made mobile sheep counter inspired by the app Beth uses in *Rick and Morty*.  
It recreates the sleepy sheep-counting interaction as a small web app for fans who want to play with the scene on their phone.

## Local Preview

```bash
npm install
npm run dev
```

Open `http://localhost:5173/`.

## Deploy To Vercel

1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Keep the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`

## Interaction

The first screen shows the Sheep Counter splash screen. The counter screen starts with one sheep. Type the current total and press Enter:

- `1` sends the first sheep away and brings in the second.
- `2` sends the second sheep away and brings in the third.
- The count continues indefinitely.
