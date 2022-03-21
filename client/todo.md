1. nav는 언제 보여줄지 설정해야할듯 -> 이건 아마 url path 분석해서 home이나 category면 보여주면될듯??
2. 혹은 redux state으로 관리 : showNav를 보여주고 header에 nav 보여주는 토글버튼 삽입 -> state으로 보여줄지 여부 관리. 모바일일 때만 토글버튼 노출되며 해당 상태값 통해서 nav의 className 결정 -> 해당 className 기준으로 모바일일 때 width 0일지 아니면 max-content일지 결정 (일단 모바일에서 position은 absolute로 변경?)
3. 모바일일 때 로딩화면
4. video 역시 state으로 관리 : 현재 동영상 객체(video) + 현재 재생시간까지? (timestamp도 정말 필요할까?) - 일단 페이지 나왔을 때 팝업형식의 동영상 관련해서 생각중
5. thumbnail은 필수로 지정할까?
6. 영상에 해시태그 추가?
