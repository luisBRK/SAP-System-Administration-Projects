import styled from 'styled-components';

export const AuthLayoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;
export const ImageAuth = styled.img`
  width: 45%;
  object-fit: cover;
  height: 100%;
`;

export const AuthContent = styled.div`
  background-color: #e7e5e4;
  flex-grow: 1;
  padding: 10px;

  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const HeaderContent = styled.div`
  span {
    font-size: 14px;
  }
`;

export const BodyContent = styled.div`
  @media (min-width: 768px) {
    padding: 0 1rem;
  }

  @media (min-width: 1048px) {
    padding: 0 2rem;
  }
`;
