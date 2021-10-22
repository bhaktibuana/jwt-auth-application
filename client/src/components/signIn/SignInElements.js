import styled from 'styled-components';

export const FormContainer = styled.div`
  margin: 100px auto;
  width: 1000px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 10px;
  height: 600px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const FormContentLeft = styled.div`
  background: linear-gradient(
    90deg,
    rgb(151, 39, 255) 0%,
    rgb(228, 0, 236) 100%
  );
  border-radius: 10px 0 0 10px;
  position: relative;
`;

export const FormImg = styled.img`
  width: 80%;
  height: 80%80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FormContentRight = styled.div`
  border-radius: 0 10px 10px 0;
  position: relative;
  background: linear-gradient(
    90deg, 
    rgb(40, 40, 40) 0%, 
    rgb(17, 17, 17) 100%
  );
`;

export const Form = styled.form`
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

export const FormH1 = styled.h1`
  font-size: 1rem;
  text-align: start;
  width: 80%;
  margin-bottom: 1rem;
  color: #fff;
`;

export const FormInputs = styled.div`
  margin-bottom: 0.5rem;
  width: 80%;

  p {
    font-size: 0.8rem;
    margin-top: 0.5rem;
    color: #f00e0e;
  }
`;

export const FormLabel = styled.label`
  display: inline-block;
  font-size: 0.8rem;
  margin-bottom: 6px;
  color: #fff;
`;

export const Input = styled.input`
  display: block;
  padding-left: 10px;
  outline: none;
  border-radius: 2px;
  height: 40px;
  width: 100%;
  border: none;

  &::placeholder {
    color: #595959;
    font-size: 12px;
  }
`;

export const Button = styled.button`
  width: 80%;
  height: 50px;
  margin-top: 10px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    rgb(151, 39, 255) 0%,
    rgb(228, 0, 236) 100%
  );
  outline: none;
  border: none;
  color: #fff;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
    background: linear-gradient(
      90deg,
      rgb(228, 0, 236) 0%,
      rgb(151, 39, 255) 100%
    );
    transition: all 0.4s ease-out;
  }
`;

export const SpanSignUp = styled.span`
  font-size: 0.8rem;
  margin-top: 10px;
  color: #fff;
  width: 80%;
  text-align: center;

  a {
    text-decoration: none;
    color: #a927ff;
    font-weight: 600;
    cursor: pointer;
  }
`;

export const Alert = styled.div`
  background-color: #FF5252;
  padding: 12px;
  border-radius: 5px;
  color: #fff;
  display: block;
  width: 100%;
  font-size: 13px;

  span {
    margin-left: 15px;
    color: #fff;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #000;
    }
  }
`;

export const SuccessH1 = styled.h1`
  margin: 10px;
  text-align: center;
  font-size: 20px;
  margin-top: 100px;
  color: #fff;
`;

export const SpinnerContainer = styled.div`
  padding: 15px 45%;
`;