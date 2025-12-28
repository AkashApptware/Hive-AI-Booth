export interface OpenAIImageAnalysisResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Mock API function - returns simple JSON until real API is ready
export async function mockAnalyzeImage(
  imageBase64: string
): Promise<OpenAIImageAnalysisResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock success response
  return {
    success: true,
    data: {
      emotion: 'happy',
      confidence: 0.95,
      archetype: 'The Creator',
      timestamp: new Date().toISOString(),
    },
  };
}

export async function analyzeImageWithOpenAI(
  imageBase64: string,
  apiKey: string
): Promise<OpenAIImageAnalysisResponse> {
  try {
    
    const openAIKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || '';
    
    if (!openAIKey) {
      return {
        success: false,
        error: 'OpenAI API key not found. Please set VITE_OPENAI_API_KEY in your .env file.',
      };
    }
    
    const payload = {
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analyze this image and describe what you see. Provide a brief description.',
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    };
    console.log("payload:",payload);
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error details:', errorData);
      
      let errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
      if (response.status === 401) {
        errorMessage = 'Invalid API key. Please check your VITE_OPENAI_API_KEY in .env file.';
      } else if (response.status === 403) {
        errorMessage = 'API key does not have permission to access this resource.';
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.';
      }
      
      return {
        success: false,
        error: errorMessage,
      };
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0]) {
      console.log('Analysis result:', data.choices[0].message?.content);
    }
    
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Network error: Unable to connect to OpenAI API. CORS policy may be blocking the request.',
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function captureImageFromVideo(videoElement: HTMLVideoElement): string | null {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return null;
    }

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    return base64.split(',')[1] || null;
  } catch (error) {
    console.error('Error capturing image from video:', error);
    return null;
  }
}

