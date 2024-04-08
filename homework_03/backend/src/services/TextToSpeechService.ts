import { TextToSpeechClient, protos } from '@google-cloud/text-to-speech';

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
}
