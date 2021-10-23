import styled from 'styled-components';

export const ProfileContainer = styled.div`
  margin: 100px auto;
  width: 1000px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ProfileContentLeft = styled.div`
  background: linear-gradient(
    90deg,
    rgb(151, 39, 255) 0%,
    rgb(255, 89, 106) 100%
  );
  border-radius: 10px 0 0 10px;
  position: relative;
`;

export const ProfileContentRight = styled.div`
  border-radius: 0 10px 10px 0;
  position: relative;
  background: linear-gradient(
    90deg, 
    rgb(40, 40, 40) 0%, 
    rgb(17, 17, 17) 100%
  );
`;

export const Profile = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ProfileH1 = styled.div`
  font-size: 2rem;
  text-align: center;
  width: 80%;
  margin-bottom: 1rem;
  color: #fff;
`;

export const ProfileH2 = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 80%;
  margin-bottom: 1rem;
  color: #fff;
`;

export const Button = styled.button`
  width: 80%;
  height: 50px;
  margin-top: 10px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgb(151, 39, 255) 0%,
    rgb(255, 89, 106) 100%
  );
  outline: none;
  border: none;
  color: #fff;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(255, 89, 106) 0%,
      rgb(151, 39, 255) 100%
    );
    transition: all 0.4s ease-out;
  }
`;