# Jazz Style Audio Comparison UI

A React web application interface for comparing jazz style audio conversion results.

## Project Overview

This project provides a user-friendly interface for comparing and analyzing jazz style audio files converted through different versions of stable diffusion models. Users can upload audio files and view comparison results across different model versions (v1, v2, v3).

## Features

- 🎵 **Audio File Management** - Browse and select available audio files
- 🔄 **Multi-version Comparison** - Compare audio conversion results across different model versions
- 📊 **Visual Interface** - Clear table display of audio file information
- ⚡ **Real-time Preview** - Integrated audio player with real-time playback
- 🎨 **Responsive Design** - Modern UI adapted for different screen sizes

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Language**: TypeScript
- **Audio Player**: react-h5-audio-player
- **Styling**: CSS3

## Project Structure

```
jazz-style-ui/
├── public/
│   ├── items_config.json     # Audio file configuration
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── AudioPlayer.tsx   # Audio player component
│   │   ├── AudioTable.tsx    # Audio file table component
│   │   ├── LoadingCircle.tsx # Loading animation component
│   │   ├── TabContainer.tsx  # Tab container component
│   │   └── UploadSection.tsx # File upload component
│   ├── utils/
│   │   └── fileListGenerator.ts # File list generator utility
│   ├── App.tsx               # Main application component
│   ├── App.css               # Application styles
│   ├── index.css             # Global styles
│   └── main.tsx              # Application entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Quick Start

### Install Dependencies

node:22.15

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Download Data

Download zip file from https://drive.google.com/file/d/1hX59ateqF1Y5a6aol3xa2KwaQ2xfqoDM/view?usp=drive_link
unzip it under /public folder

## Configuration

### Audio File Configuration

The project uses `public/items_config.json` file to configure audio file information for All List tag, containing the following fields:

- `style`: Audio style (currently "jazz")
- `input_audio`: Original audio file path
- `output_audio`: Converted audio file path
- `config_path`: Model configuration file path
- `embedding_path`: Embedding file path

The project uses `public/demo_config.json` file to configure audio file information for Demo tag, containing the following fields:

- `style`: Audio style (currently "jazz")
- `input_audio`: Original audio file path
- `output_audio`: Converted audio file path
- `config_path`: Model configuration file path
- `embedding_path`: Embedding file path

### Supported Model Versions

- **v1**: Uses `configs/stable-diffusion/v1-inference.yaml`
- **v2**: Uses `configs/stable-diffusion/v2-inference.yaml`
- **v3**: Uses `configs/stable-diffusion/v3-inference.yaml`

## Usage Instructions

1. **Inference Tab**

   - Select audio file from dropdown menu
   - Click "Upload" button to start processing
   - View conversion results for individual files

2. **All Files Tab**
   - Browse all available audio files
   - View detailed information for each file
   - Compare conversion results across different versions

## Development Guide

### Adding New Audio Files

1. Add new configuration items in `public/items_config.json`
2. Ensure audio files exist at the specified paths
3. Restart development server to load new files

### Customizing Styles

- Modify `src/App.css` to customize application appearance
- Component styles can be adjusted in their respective component files

## Dependencies

### Main Dependencies

- `react`: React framework
- `react-dom`: React DOM rendering
- `react-h5-audio-player`: Audio player component

### Development Dependencies

- `vite`: Build tool and development server
- `typescript`: TypeScript support
- `eslint`: Code quality checking

## License

This project is licensed under the MIT License.

## Contributing

Issues and Pull Requests are welcome to improve this project.

## Contact

For questions or suggestions, please contact us through GitHub Issues.
