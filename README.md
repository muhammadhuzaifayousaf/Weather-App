# Weather Now 🌤️

![Weather Now](https://github.com/user-attachments/assets/745df47a-7a5a-4bb8-9f60-f3a07ddb7b5b)

Welcome to **Weather Now**, a weather application built using HTML, fully styled with Tailwind CSS, and powered by JavaScript. This app provides real-time weather updates, including temperature, wind speed, humidity, and a 5-day weather forecast.

[Live Demo](https://muhammadhuzaifayousaf.github.io/Weather-App) 

## Features
- Real-time weather updates.
- Displays temperature, wind speed, and humidity.
- 5-day weather forecast with icons and descriptions.
- Responsive design with a modern and clean user interface.

## Setup Instructions

To set up Tailwind CSS for this project, follow the steps below:

1. **Install Tailwind CSS**  
   Open your terminal and run:
   ```bash
   npm install -D tailwindcss
   ```
   
2. **Initialize Tailwind CSS**  
   Initialize the Tailwind configuration file by running:
   ```bash
   npx tailwindcss init
   ```
   
3. **Configure Tailwind**  
   Update your `tailwind.config.js` file with the following content to specify where Tailwind should look for content:
   ```javascript
   module.exports = {
     content: ["*.html"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```
   
4. **Include Tailwind in Your CSS**  
   Create an `input.css` file and include the Tailwind directives:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
   
5. **Compile Tailwind CSS**  
   Compile the CSS by running the following command:
   ```bash
   npx tailwindcss -i ./input.css -o ./style.css --watch
   ```
   This command will process your `input.css` file and output the compiled CSS to `style.css`. The `--watch` flag will keep the process running and update the CSS automatically whenever changes are made.

## Usage
- Clone the repository.
- Set up Tailwind CSS as described above.
- Open `index.html` in your browser to view the application.

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT [LICENSE](LICENSE).
