import styled from 'styled-components';

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.7rem;

  h2 {
    color: #27272a;
    font-weight: 600;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 1048px) {
    flex-direction: row;
  }
  gap: 0.6rem;

  a,
  span {
    font-size: 14px;
    width: fit-content;
  }

  a {
    font-weight: 500;
    color: #1d4ed8;
  }
`;
