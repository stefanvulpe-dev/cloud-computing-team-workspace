/*import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

const client = new TextToSpeechClient();

export async function synthesizeText(text: string): Promise<{
  audioContent: Buffer;
  response: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse;
}> {
  const request = {
    input: { text: text },
    voice: { languageCode: 'en-US', name: 'en-US-Wavenet-C' },
    audioConfig: {
      audioEncoding: protos.google.cloud.texttospeech.v1.AudioEncoding.MP3,
    },
  };

  const [response] = await client.synthesizeSpeech(request);

  return { audioContent: response.audioContent! as Buffer, response };
}*/

import * as TextToSpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { secretClient } from './azure';

export async function synthesizeText(text: string): Promise<{
  audioContent: Buffer;
}> {
  const azureSpeechKey = await secretClient.getSecret('text-to-speech-key');
  const azureSpeechRegion = await secretClient.getSecret(
    'text-to-speech-region',
  );

  const speechConfig = TextToSpeechSDK.SpeechConfig.fromSubscription(
    azureSpeechKey.value!,
    azureSpeechRegion.value!,
  );

  const audioConfig = TextToSpeechSDK.AudioConfig.fromDefaultSpeakerOutput();

  const synthesizer = new TextToSpeechSDK.SpeechSynthesizer(
    speechConfig,
    audioConfig,
  );

  return new Promise((resolve, reject) => {
    synthesizer.speakTextAsync(
      text,
      (result) => {
        if (result.errorDetails) {
          reject(result.errorDetails);
        } else {
          resolve({ audioContent: Buffer.from(result.audioData) });
        }
      },
      (error) => {
        reject(error);
      },
    );
  });
}
