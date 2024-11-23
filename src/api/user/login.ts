import apiClient from '..';

/**
 * 로그인 요청 파라미터
 *
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 */
interface LoginRequest {
  email: string;
  password: string;
}

/**
 * 로그인 응답 파라미터
 *
 * @param {string} accessToken 엑세스 토큰
 */
interface LoginResponse {
  accessToken: string;
}

/**
 * 로그인
 *
 * @param {LoginRequest} requestParameters 로그인 요청 파라미터
 * @returns {Promise<LoginResponse>} 로그인 응답
 */
const login = async (
  requestParameters: LoginRequest
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/api/v1/auth/login',
    requestParameters
  );

  return response.data;
};

export default login;
