import apiClient from '..';

/**
 * 회원가입 요청 파라미터
 *
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 비밀번호
 * @param {string} name 사용자 이름
 */
interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

/**
 * 회원가입
 *
 * @param {SignupRequest} requestParameters 회원가입 요청 파라미터
 * @returns {Promise<string>} 회원가입 응답
 */
const signup = async (requestParameters: SignupRequest): Promise<string> => {
  // API 호출
  const response = await apiClient.post<string>(
    '/api/v1/auth/signup',
    requestParameters
  );

  return response.data;
};

export default signup;
