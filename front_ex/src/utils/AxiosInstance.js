import axios from 'axios';

// axios 에 관한 옵션 공통 처리

// axios  instance  생성
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = 'http://localhost:8080';
//서버와 통신시 인증 쿠키값을 전달하기 위해서는 아래 설정을 추가
// 기본값은  false 이다.
axiosInstance.defaults.withCredentials = true;

// 이런식으로도 사용가능
// const instance = axios.create({
// 	baseURL:'http://localhost:8080',
// 	timeout:1000
// })
//인터셉터는 1.요청하기 직전, 2. 응답을 받고 then, catch로 처리 직전에 가로챌 수 있음

// request  와 response interceptor는 두개의 콜백함수 필요
// request interceptor
axiosInstance.interceptors.request.use(
  // 요청 성공 직전 호출됨
  // axios  설정값을 넣음
  (config) => {
    // 만약 토큰이 있으면 여기서 토큰 리턴
    //
    return config;
  },

  // 요청 에러 직전 호출됨
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // http status  가 200인 경우
    //응답 성공 진전 호출
    // .then()
    return response;
  },
  (error) => {
    console.log(error);
    // http status 가 200 이 아닌 경우 응답 에러 직전 호출
    // .catch() 실행
    return Promise.reject(error);
  }
);

export default axiosInstance;
