import './style.scss';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page">
      <button
        onClick={() => navigate('/health')}
        style={{
          outline: 'none',
          border: 'none',
          background: 'transparent',
          width: '150px',
          height: '150px',
          position: 'absolute',
          top: '300px',
          left: '180px'
        }}></button>
    </div>
  );
};

const getCurrentTime = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${month}-${day} ${hour}:${minute}:${second}`;
};

const HealthPage = () => {
  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="health-page">
      <div className="info-bar">
        <Marquee direction="left" speed={50} gradient={false}>
          若您有近7天中高风险地区旅居史(含境外)请及时更新和风险报备。
        </Marquee>
      </div>

      <div className="time-line">{time}</div>
      <button
        style={{
          outline: 'none',
          border: 'none',
          background: 'transparent',
          width: '150px',
          height: '150px',
          position: 'absolute',
          top: '300px',
          left: '180px'
        }}></button>
    </div>
  );
};

export default function HomePage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/health" element={<HealthPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
