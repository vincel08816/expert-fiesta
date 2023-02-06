import styled from 'styled-components';

export const iconSx = { width: "20px", height: "20px" };
export const hoverIconSx = {
  p: 0.8,
  height: "100%",
  aspectRatio: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
  "&:hover": {
    backgroundColor: "#dfe1e3",
  },
};

export const StyledImage = styled.img`
  max-width: 80vw;
  max-height: 80vw;
  margin-top: 15px;
  width: 256px;
  height: 256px;
`;

export const StyledUserLogo = styled.img`
  width: 100%;
`;

export const Badge = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 3px 7px;
  margin: -1.5px 7px 0 7px;
  background-color: #1a76d2;
  font-size: 12px;
  color: white;
  border-radius: 5px;
  @media screen and (max-width: 600px) {
    font-size: 10px;
  } ;
`;
