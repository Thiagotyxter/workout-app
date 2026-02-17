import { authService } from './authService';

const API_URL = '/api/analyze-video';

export async function analyzeExerciseVideo(videoFile, exercise, exerciseTips) {
    const token = authService.getToken();
    if (!token) throw new Error('Você precisa estar logado para analisar vídeos.');

    // Extract frames from video since OpenAI works with images
    const frames = await extractFramesFromVideo(videoFile, 6);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            frames,
            exerciseName: exercise.name,
            muscleGroup: exercise.muscleGroup,
            exerciseTips,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(err.error || `Erro ${response.status}`);
    }

    return response.json();
}

/**
 * Extract N evenly-spaced frames from a video file as base64 JPEG strings.
 */
function extractFramesFromVideo(videoFile, numFrames = 6) {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;

        const url = URL.createObjectURL(videoFile);
        video.src = url;

        video.onloadedmetadata = () => {
            video.currentTime = 0;
        };

        video.onloadeddata = async () => {
            const duration = video.duration;
            const canvas = document.createElement('canvas');
            // Use a smaller resolution to reduce payload size
            canvas.width = 512;
            canvas.height = Math.round(512 * (video.videoHeight / video.videoWidth));
            const ctx = canvas.getContext('2d');

            const frames = [];
            const interval = duration / (numFrames + 1);

            for (let i = 1; i <= numFrames; i++) {
                const time = interval * i;
                await seekTo(video, time);
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                const base64 = dataUrl.split(',')[1];
                frames.push(base64);
            }

            URL.revokeObjectURL(url);
            resolve(frames);
        };

        video.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Não foi possível processar o vídeo.'));
        };
    });
}

function seekTo(video, time) {
    return new Promise((resolve) => {
        video.currentTime = time;
        video.onseeked = () => resolve();
    });
}
