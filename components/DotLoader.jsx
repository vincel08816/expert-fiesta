import styled from "styled-components";

const Loading = styled.div`
  margin-top: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    animation: load 1s infinite alternate;
  }
  @keyframes load {
    0% {
      opacity: 0;
    }
    33% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const Dots = styled.span`
  &:not(:last-child) {
    margin-right: 0.25rem;
  }
`;

const DotLoader = () => {
  return (
    <Loading>
      <Dots>•</Dots>
      <Dots>•</Dots>
      <Dots>•</Dots>
    </Loading>
  );
};

export default DotLoader;
