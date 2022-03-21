/* eslint-disable import/prefer-default-export */
import {usePopup} from '../../../../@hooks/usePopup';
import {useMyProfileQuery} from '../../../../@queries/useMyProfileQuery';
import {UserType} from '../../../../@types/UserType';

type ReturnType = {
  user: UserType;
  popupRef: React.RefObject<HTMLDivElement>;
  showButtonsPopup: React.MouseEventHandler<HTMLButtonElement>;
};

export const useMyProfilePage = (): ReturnType => {
  const {data} = useMyProfileQuery();
  const {ref: popupRef, showByButtonClick: showButtonsPopup} =
    usePopup<HTMLDivElement>();
  // const user = {
  //   name: '콘요',
  //   status: 'asdf',
  //   id: '123516',
  //   email: 'asetNaver.ocm',
  //   avatarUrl:
  //     'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg',
  // };
  // if (data?.user) {
  //   console.log(data.user.id);
  // }
  console.log(data?.user);
  // console.log(typeof data?.user?._id);
  return {
    user: data?.user,
    popupRef,
    showButtonsPopup,
    // user,
  };
};
