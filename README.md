# AI-Powered Image Generator with Next.js and Tailwind CSS

## Next.js App with Tailwind CSS, Stable Diffusion API, GPT-3.5 Turbo API, and Google Cloud Vision API

This project is a Next.js app that demonstrates how to integrate Tailwind CSS for styling, the Stable Diffusion API for generating images from text, the GPT-3.5 Turbo API for providing a chat assistant to help users with their prompts, and Google Cloud Vision API for generating text descriptions from images. This example demonstrates an AI-powered image generator that utilizes Tailwind CSS and Next.js. The application allows users to input text prompts and generates images based on the provided prompts. It showcases the integration of generative AI models for creative purposes with an intuitive and user-friendly interface.

## Features

- Next.js for server-rendered React applications
- Tailwind CSS for rapid UI development
- Stable Diffusion API integration for generating images
- GPT-3.5 Turbo API integration for chat assistant functionality
- Google Cloud Vision API integration for generating text descriptions from images
- Responsive design
- Integrated ChatGPT Assistant for guidance and suggestions on prompt engineering, via floating chat button and chatbox
- Display of the last 10 generated images in a grid layout
- Ability to delete individual images from the generated images array
- Expandable and collapsible Image to Text form for converting images to text descriptions

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

git clone https://github.com/yourusername/nextjs-tailwind-stablediffusion-gpt3.git


2. Change to the project directory:

cd nextjs-tailwind-stablediffusion-gpt3

markdown


3. Install the dependencies:

npm install


4. Create a `.env.local` file in the root folder and add your API keys for Stable Diffusion, GPT-3.5 Turbo, and Google Cloud Vision:

NEXT_PUBLIC_STABLE_DIFFUSION_API_KEY=your_stable_diffusion_api_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_GOOGLE_VISION_API_KEY=your_google_vision_api_key


5. Run the development server:

npm run dev


6. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app.


## Building and Deploying

To build the app for production, run:

npm run build


This command will generate a production-optimized build in the `.next` folder. To start the production server, run:

npm run start


For deploying the app, refer to the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for various hosting options.

## Contributing

If you would like to contribute to this project, feel free to submit a pull request. If you encounter any issues or have suggestions, please open an issue.

## License

This project is licensed under the MIT License.

This README file provides a brief introduction to the app, its features, and instructions for getting started, building, and deploying the app.
