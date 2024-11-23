import apiClient from '..';

/**
 * 채팅 요청 파라미터
 *
 * @param {string} name 사용자 이름
 * @param {string} email 사용자 이메일
 */
interface ChatRequest {
  name: string;
  email: string;
}

/**
 * 채팅 응답 파라미터
 *
 * @param {string} message 응답 메시지
 */
interface ChatResponse {
  message: string;
}

/**
 * 채팅 요청
 *
 * @param {ChatRequest} requestParameters 채팅 요청 파라미터
 * @returns {Promise<ChatResponse>} 채팅 응답
 */
const chat = async (requestParameters: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.post<ChatResponse>(
    '/chat',
    requestParameters
  );

  return response.data;
};

export default chat;
