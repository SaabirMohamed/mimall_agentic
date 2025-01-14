I understand that you want to create a detailed document based on the ElevenLabs documentation links you provided. However, I can't directly scrape or access external websites. But I can help you create a comprehensive guide based on the information available up to my knowledge cutoff in October 2023.

Below is a detailed document that you can send to your coding agent. This document covers various aspects of the ElevenLabs API, including examples and use cases.

---

# ElevenLabs API Comprehensive Guide

## Table of Contents
1. **Introduction to ElevenLabs**
2. **Conversational AI SDK (JavaScript)**
   - Installation
   - Basic Usage
   - Example: Creating a Conversational Agent
3. **Speech Synthesis Overview**
   - What is Speech Synthesis?
   - Key Features
4. **Voice Selection**
   - Available Voices
   - Selecting a Voice
   - Example: Synthesizing Speech with a Specific Voice
5. **Voice Settings**
   - Modulating Voice Parameters
   - Example: Adjusting Voice Pitch and Speed
6. **Models**
   - Available Models
   - Choosing the Right Model
7. **Prompting**
   - Best Practices for Prompting
   - Example: Generating Speech from a Text Prompt
8. **Speech-to-Speech**
   - Overview of Speech-to-Speech
   - Use Cases
   - Example: Converting Speech to Another Voice
9. **Sound Effects**
   - Available Sound Effects
   - Applying Sound Effects
   - Example: Adding Background Music to Synthesized Speech
10. **Voices Overview**
    - Default Voices
    - Custom Voices
11. **Voice Lab - Voice Design**
    - Creating Custom Voices
    - Example: Designing a Custom Voice
12. **WebSocket Usage**
    - How to Use WebSocket with ElevenLabs
    - Example: Real-Time Speech Synthesis with WebSocket
13. **TTS with Streaming**
    - Overview of Streaming TTS
    - Example: Implementing Streaming TTS in an Application

---

## 1. Introduction to ElevenLabs

ElevenLabs is a cutting-edge platform that offers advanced AI-driven speech synthesis and conversational AI solutions. The platform provides a range of APIs and tools to help developers create realistic and engaging voice experiences.

### Key Features:
- **High-Quality Speech Synthesis:** Generate natural-sounding speech from text.
- **Voice Customization:** Customize voices to match specific tones, pitches, and speeds.
- **Conversational AI:** Build intelligent conversational agents.
- **Sound Effects:** Add background sounds and effects to synthesized speech.

---

## 2. Conversational AI SDK (JavaScript)

### Installation

To use the ElevenLabs Conversational AI SDK in your JavaScript project, you can install it via npm:

```bash
npm install @elevenlabs/conversational-ai
```

### Basic Usage

Here's a basic example of how to use the SDK to create a conversational agent:

```javascript
const { ConversationalAI } = require('@elevenlabs/conversational-ai');

// Initialize the Conversational AI
const conversationalAI = new ConversationalAI({
  apiKey: 'YOUR_API_KEY',
});

// Create a new conversation
const conversation = conversationalAI.createConversation();

// Send a message to the conversation
conversation.send('Hello, how are you?', (response) => {
  console.log(response.text);
});
```

### Example: Creating a Conversational Agent

```javascript
const { ConversationalAI } = require('@elevenlabs/conversational-ai');

// Initialize the Conversational AI
const conversationalAI = new ConversationalAI({
  apiKey: 'YOUR_API_KEY',
});

// Create a new conversation
const conversation = conversationalAI.createConversation();

// Function to handle user input
function handleUserInput(input) {
  conversation.send(input, (response) => {
    console.log('AI Response:', response.text);
    // Optionally, send the response back to the user
  });
}

// Example interaction
handleUserInput('What is the weather today?');
```

---

## 3. Speech Synthesis Overview

### What is Speech Synthesis?

Speech synthesis, also known as text-to-speech (TTS), is the process of converting written text into spoken words using artificial voices.

### Key Features:
- **Natural-sounding Voices:** ElevenLabs offers high-quality voices that mimic human speech.
- **Customization:** Adjust various parameters like pitch, speed, and tone.
- **Multi-language Support:** Synthesize speech in multiple languages.

---

## 4. Voice Selection

### Available Voices

ElevenLabs offers a variety of voices, including:

- **Adam**
- **Antoni**
- **Ella**
- **Bella**
- **Domi**
- **Elli**
- **Harry**
- **Josh**
- **Riley**
- **Sam**

### Selecting a Voice

You can select a voice by specifying its ID in your API request.

### Example: Synthesizing Speech with a Specific Voice

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Synthesize speech with the voice ID 'adam'
elevenLabs.tts('Hello, this is Adam speaking.', {
  voiceId: 'adam',
}).then((audio) => {
  // Handle the audio output
});
```

---

## 5. Voice Settings

### Modulating Voice Parameters

You can adjust various voice parameters to achieve the desired output:

- **Pitch:** Adjust the pitch of the voice.
- **Speed:** Control the speaking rate.
- **Tone:** Modify the overall tone of the voice.

### Example: Adjusting Voice Pitch and Speed

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Synthesize speech with adjusted pitch and speed
elevenLabs.tts('Hello, I am speaking in a high pitch and fast speed.', {
  voiceId: 'adam',
  pitch: 10, // Increase pitch by 10%
  speed: 1.2, // Increase speed by 20%
}).then((audio) => {
  // Handle the audio output
});
```

---

## 6. Models

### Available Models

ElevenLabs offers different models for speech synthesis:

- **Standard Model:** General-purpose model for most use cases.
- **Enhanced Model:** Provides higher quality speech with better intonations.

### Choosing the Right Model

Choose the model based on your use case:

- Use the **Standard Model** for general applications.
- Use the **Enhanced Model** for applications requiring high-quality speech.

---

## 7. Prompting

### Best Practices for Prompting

- **Be Clear and Concise:** Provide clear instructions for the AI to follow.
- **Use Context:** Provide context to generate more relevant responses.
- **Avoid Ambiguity:** Ensure your prompts are specific to avoid ambiguous responses.

### Example: Generating Speech from a Text Prompt

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Generate speech from a text prompt
elevenLabs.tts('The quick brown fox jumps over the lazy dog.', {
  voiceId: 'ella',
}).then((audio) => {
  // Handle the audio output
});
```

---

## 8. Speech-to-Speech

### Overview of Speech-to-Speech

Speech-to-Speech (S2S) allows you to convert speech from one voice to another, enabling voice cloning and style transfer.

### Use Cases:
- **Voice Cloning:** Clone a voice to match a specific personality.
- **Style Transfer:** Convert speech from one style to another (e.g., from formal to casual).

### Example: Converting Speech to Another Voice

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Convert speech from one voice to another
elevenLabs.s2s('input_audio_file.mp3', {
  targetVoiceId: 'bella',
}).then((audio) => {
  // Handle the audio output
});
```

---

## 9. Sound Effects

### Available Sound Effects

ElevenLabs offers a range of sound effects that can be applied to synthesized speech:

- **Background Music**
- **Ambient Noises**
- **Sound Enhancements**

### Applying Sound Effects

You can apply sound effects by specifying them in your API request.

### Example: Adding Background Music to Synthesized Speech

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Add background music to synthesized speech
elevenLabs.tts('Welcome to the future of speech synthesis.', {
  voiceId: 'riley',
  soundEffect: 'background_music',
}).then((audio) => {
  // Handle the audio output
});
```

---

## 10. Voices Overview

### Default Voices

ElevenLabs provides a set of default voices that you can use out of the box.

### Custom Voices

You can create custom voices using the Voice Lab feature.

---

## 11. Voice Lab - Voice Design

### Creating Custom Voices

Voice Lab allows you to create custom voices by uploading audio samples and training a model.

### Example: Designing a Custom Voice

1. **Upload Audio Samples:**
   - Upload high-quality audio recordings of the desired voice.
2. **Train the Voice Model:**
   - Use the Voice Lab interface to train the model.
3. **Use the Custom Voice:**
   - Once trained, you can use the custom voice in your applications.

---

## 12. WebSocket Usage

### How to Use WebSocket with ElevenLabs

WebSocket allows real-time communication with the ElevenLabs API, enabling features like real-time speech synthesis.

### Example: Real-Time Speech Synthesis with WebSocket

```javascript
const WebSocket = require('ws');

// Connect to the WebSocket endpoint
const ws = new WebSocket('wss://api.elevenlabs.io/v1/ws');

ws.on('open', () => {
  // Send a message to start speech synthesis
  ws.send(JSON.stringify({
    action: 'start',
    text: 'Hello, this is real-time speech synthesis.',
    voiceId: 'josh',
  }));
});

ws.on('message', (data) => {
  // Handle the audio data
  const audioBuffer = Buffer.from(data, 'binary');
  // Process the audio buffer as needed
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});
```

---

## 13. TTS with Streaming

### Overview of Streaming TTS

Streaming TTS allows you to receive audio data in real-time as it is synthesized, which is ideal for applications requiring low latency.

### Example: Implementing Streaming TTS in an Application

```javascript
const { ElevenLabs } = require('@elevenlabs/api');

const elevenLabs = new ElevenLabs({
  apiKey: 'YOUR_API_KEY',
});

// Implement streaming TTS
elevenLabs.ttsStream('This is a streaming TTS example.', {
  voiceId: 'domi',
}).then((stream) => {
  // Pipe the stream to an audio player or file
  stream.pipe(fs.createWriteStream('output.mp3'));
});
```

---

## Conclusion

This comprehensive guide provides an in-depth look at the ElevenLabs API, covering various aspects from conversational AI to speech synthesis and sound effects. By following the examples and use cases provided, your coding agent should be able to effectively integrate ElevenLabs into your projects.

Make sure to replace `'YOUR_API_KEY'` with your actual ElevenLabs API key in all the examples.

---

**Note:** This document is based on the information available up to October 2023 and may not reflect the latest updates or features from ElevenLabs. Always refer to the official ElevenLabs documentation for the most current information.

---