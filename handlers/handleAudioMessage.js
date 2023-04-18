const Transcription = require("../Transcription");
const { createChatcompletion, createImage } = require("../services/OpenAIService");
const { sendMessage } = require("../services/WhatsAppCloudService");

async function handleAudioMessage(from, message, userObj) {

    const audioID = message?.audio.id;
    const botLanguage = userObj.getLanguage();
    const aiModel = userObj.getModel();

    try {
        if (aiModel === "chatgpt") {
            const transcriptedMessage = await Transcription(audioID, aiModel);
            if (!transcriptedMessage) {
                await sendMessage(from, "text", "Sorry, we were unable to detect any audio in your message. Please make sure your microphone is enabled and try again.");
                return;
            }
            const chatGPTResponse = await createChatcompletion(transcriptedMessage, "normalPrompt", botLanguage);
            await sendMessage(from, "text", chatGPTResponse);
        } else if (aiModel === "dalle") {
            const transcriptedMessage = await Transcription(audioID, aiModel);
            if (!transcriptedMessage) {
                await sendMessage(from, "text", "Sorry, we were unable to detect any audio in your message. Please make sure your microphone is enabled and try again.");
                return;
            }
            const dalleResponse = await createImage(transcriptedMessage);
            await sendMessage(from, "image", dalleResponse);
        }
    } catch (error) {
        await sendMessage(from, "text", " Sorry, we could not complete your request at this time. Please try again later or contact support if the problem persists.");
    }
}

module.exports = handleAudioMessage;