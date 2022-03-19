/* eslint-disable import/prefer-default-export */
import {UserType} from '../../../../@types/UserType';

type ReturnType = {
  user: UserType;
};

export const useMyProfilePage = (): ReturnType => {
  const user = {
    name: '콘요',
    status: 'asdf',
    id: '123516',
    email: 'asetNaver.ocm',
    avatarUrl:
      'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg',
  };
  return {
    user,
  };
};
