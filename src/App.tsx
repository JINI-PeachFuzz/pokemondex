// React 불러오기
import React from 'react';
// 포켓몬 도감 컴포넌트 불러오기
import Pokemon from './components/Pokemon'; // src 폴더 바로 아래에 있으니까 './'로 불러옴

// App 컴포넌트 정의
function App() {
  return (
    <div className="App">
      {/* 여기서 도감 컴포넌트를 화면에 출력함 */}
      <Pokemon />
    </div>
  );
}

export default App;