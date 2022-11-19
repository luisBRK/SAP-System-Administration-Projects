import styled from 'styled-components';

export const BaseButton = styled.button`
  width: 100%;

  height: 2.5rem;
  font-size: 14px;
  background-color: #2563eb;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  transition: 0.2s;
  position: relative;

  @media (min-width: 780px) {
    max-width: 10rem;
  }

  &:hover {
    background-color: #1d4ed8;
    box-shadow: 0px 4px 0px 0px #94a3b8;
    transform: translateY(-4px);
  }
  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export const GoogleButton = styled(BaseButton)`
  background-color: #ffffff;
  color: #2563eb;

  &:hover {
    background-color: #f1f5f9;
  }
`;
